import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packagesRoot = path.join(workspaceRoot, 'packages');
const repositoryUrl = 'git+https://github.com/keneanung/nexus-scripts.git';
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const temporaryDirectory = mkdtempSync(path.join(tmpdir(), 'nexus-package-verification-'));

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, {
    cwd: workspaceRoot,
    encoding: 'utf8',
    ...options,
  });
  if (result.status !== 0) {
    throw new Error(
      [`${command} ${args.join(' ')} failed with exit code ${result.status}.`, result.stdout, result.stderr]
        .filter(Boolean)
        .join('\n'),
    );
  }
  return result;
};

const removeGeneratedIds = (value) => {
  if (Array.isArray(value)) return value.map(removeGeneratedIds);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => key !== 'id')
        .map(([key, childValue]) => [key, removeGeneratedIds(childValue)]),
    );
  }
  return value;
};

const normalizePackage = (value) => ({
  version: '',
  dependencies: [],
  website: '',
  ...removeGeneratedIds(value),
});

try {
  const packageDirectories = readdirSync(packagesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(path.join(packagesRoot, entry.name, 'package.json')))
    .map((entry) => entry.name)
    .sort();
  const packageData = packageDirectories.map((directory) => {
    const packageDirectory = path.join(packagesRoot, directory);
    const manifest = JSON.parse(readFileSync(path.join(packageDirectory, 'package.json'), 'utf8'));
    return { directory, packageDirectory, manifest };
  });

  const packageManager = packageData.find(({ manifest }) => manifest.name === '@keneanung/nexus-package-manager');
  assert(packageManager, 'Package Manager workspace is missing.');

  for (const { directory, manifest } of packageData) {
    assert.notEqual(manifest.private, true, `${manifest.name} must remain publishable.`);
    assert.equal(manifest.publishConfig?.access, 'public', `${manifest.name} must publish with public access.`);
    assert.deepEqual(
      manifest.repository,
      { type: 'git', url: repositoryUrl, directory: `packages/${directory}` },
      `${manifest.name} must use canonical monorepo repository metadata.`,
    );

    const reactSections = ['dependencies', 'devDependencies', 'peerDependencies'];
    for (const section of reactSections) {
      for (const dependency of ['react', 'react-dom']) {
        const actualVersion = manifest[section]?.[dependency];
        if (manifest.name === '@keneanung/nexus-package-manager' && section === 'peerDependencies') {
          assert.equal(actualVersion, '19.2.4', `${manifest.name} must use Nexus's ${dependency} runtime.`);
        } else {
          assert.equal(actualVersion, undefined, `${manifest.name} must not declare ${dependency} in ${section}.`);
        }
      }
    }

    if (manifest.bin !== undefined) {
      assert.equal(typeof manifest.bin, 'object', `${manifest.name} must use an explicit bin command map.`);
    }
  }

  const packDirectory = path.join(temporaryDirectory, 'tarballs');
  mkdirSync(packDirectory, { recursive: true });
  const tarballs = [];
  for (const { manifest, packageDirectory } of packageData) {
    const result = run(npmCommand, ['pack', '--json', '--ignore-scripts', '--pack-destination', packDirectory], {
      cwd: packageDirectory,
    });
    assert.doesNotMatch(result.stderr, /npm warn publish/, `${manifest.name} emitted package normalization warnings.`);
    const packResult = JSON.parse(result.stdout);
    const packedPackage = Array.isArray(packResult)
      ? packResult[0]
      : (packResult.name ?? packResult.version)
        ? packResult
        : Object.values(packResult)[0];
    assert(packedPackage, `${manifest.name} did not produce npm pack metadata.`);
    assert.equal(packedPackage.name, manifest.name);
    assert.equal(packedPackage.version, manifest.version);
    tarballs.push(path.join(packDirectory, packedPackage.filename));
  }

  const installDirectory = path.join(temporaryDirectory, 'install');
  mkdirSync(installDirectory, { recursive: true });
  run(npmCommand, [
    'install',
    '--ignore-scripts',
    '--no-audit',
    '--no-fund',
    '--prefix',
    installDirectory,
    ...tarballs,
  ]);

  for (const { manifest } of packageData) {
    const installedPackage = path.join(installDirectory, 'node_modules', ...manifest.name.split('/'));
    const entrypoints = [manifest.main, manifest.types, manifest.typings].filter(Boolean);
    for (const entrypoint of entrypoints) {
      assert(existsSync(path.join(installedPackage, entrypoint)), `${manifest.name} is missing ${entrypoint}.`);
    }

    for (const commandName of Object.keys(manifest.bin ?? {})) {
      const executable = path.join(
        installDirectory,
        'node_modules',
        '.bin',
        process.platform === 'win32' ? `${commandName}.cmd` : commandName,
      );
      run(executable, ['--help'], { cwd: temporaryDirectory });
      const versionResult = run(executable, ['--version'], { cwd: temporaryDirectory });
      assert.equal(versionResult.stdout.trim(), manifest.version, `${commandName} reported the wrong version.`);
    }
  }

  const packageFileCandidates = [
    path.join(packagesRoot, 'nexus-package-manager', 'nxs', 'nexusPackageManager.nxs'),
    path.join(packagesRoot, 'nexus-event-bus', 'dist', 'EventBus.nxs'),
  ];
  const inputPackage = packageFileCandidates.find(existsSync);
  assert(inputPackage, 'No built Nexus package is available for roundtrip verification.');

  const binDirectory = path.join(installDirectory, 'node_modules', '.bin');
  const executableSuffix = process.platform === 'win32' ? '.cmd' : '';
  const splitter = path.join(binDirectory, `nexus-package-splitter${executableSuffix}`);
  const builder = path.join(binDirectory, `nexus-package-builder${executableSuffix}`);
  const splitDirectory = path.join(temporaryDirectory, 'roundtrip', 'split');
  const rebuiltDirectory = path.join(temporaryDirectory, 'roundtrip', 'rebuilt');
  const packageName = path.basename(inputPackage, '.nxs');

  run(splitter, [inputPackage, splitDirectory]);
  run(builder, [path.join(splitDirectory, `${packageName}.yaml`), rebuiltDirectory]);

  const original = JSON.parse(readFileSync(inputPackage, 'utf8'));
  const rebuilt = JSON.parse(readFileSync(path.join(rebuiltDirectory, `${packageName}.nxs`), 'utf8'));
  assert.deepEqual(
    normalizePackage(rebuilt),
    normalizePackage(original),
    `${packageName}.nxs changed during roundtrip.`,
  );

  console.log(`Verified ${packageData.length} packed workspaces and ${packageName}.nxs roundtrip.`);
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
