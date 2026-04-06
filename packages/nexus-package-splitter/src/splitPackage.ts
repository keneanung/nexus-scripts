import * as path from 'path';
import * as yaml from 'js-yaml';
import * as client from '@keneanung/iron-realms-nexus-typings';
import {
  checkPackageFile,
  prepareOutputDirectory,
  readPackageFile,
  writePackageDefinition,
  writeSplitFile,
} from './functionsInteractingWithFileSystem';
import {
  BuilderCompatibleAction,
  BuilderCompatiblePackage,
  BuilderCompatibleReflex,
  BuilderCompatibleScriptAction,
  PackageFile,
} from './types';

interface OutputContext {
  absoluteAssetRootPath: string;
  assetRootName: string;
}

const sanitizeFileNamePart = (value: string) => {
  const sanitizedValue = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return sanitizedValue || 'item';
};

const buildReflexDirectoryName = (index: number, reflex: client.Reflex) =>
  `${index}-${reflex.type}-${sanitizeFileNamePart(reflex.name)}`;

const writeExtractedFile = (content: string, filePathParts: string[], outputContext: OutputContext) => {
  const absoluteOutputPath = path.resolve(outputContext.absoluteAssetRootPath, ...filePathParts);
  writeSplitFile(content, absoluteOutputPath);

  return `./${path.posix.join(outputContext.assetRootName, ...filePathParts)}`;
};

const convertAction = (
  action: client.Action,
  parentFilePathParts: string[],
  actionIndex: number,
  outputContext: OutputContext,
): BuilderCompatibleAction => {
  if (action.action !== 'script') {
    return action;
  }

  const { script, ...rest } = action;
  const convertedAction: BuilderCompatibleScriptAction = { ...rest };
  if (script !== undefined) {
    convertedAction.scriptFile = writeExtractedFile(
      script,
      [...parentFilePathParts, `action-${actionIndex}-script.js`],
      outputContext,
    );
  }

  return convertedAction;
};

const convertReflex = (
  reflex: client.Reflex,
  parentFilePathParts: string[],
  itemIndex: number,
  outputContext: OutputContext,
): BuilderCompatibleReflex => {
  const reflexFilePathParts = [...parentFilePathParts, buildReflexDirectoryName(itemIndex, reflex)];

  if (reflex.type === 'group') {
    const { id, items, ...rest } = reflex;
    void id;
    return {
      ...rest,
      items: items.map((item, index) => convertReflex(item, reflexFilePathParts, index, outputContext)),
    };
  }

  if (reflex.type === 'function') {
    const { id, code, ...rest } = reflex;
    void id;
    return {
      ...rest,
      ...(code !== undefined
        ? {
            codeFile: writeExtractedFile(code, [...reflexFilePathParts, 'code.js'], outputContext),
          }
        : {}),
    };
  }

  const { id, actions, ...rest } = reflex;
  void id;
  return {
    ...rest,
    actions: actions.map((action, index) => convertAction(action, reflexFilePathParts, index, outputContext)),
  };
};

/**
 * Converts a Nexus package object into the YAML structure understood by nexus-package-builder.
 * @param {PackageFile} packageFile The parsed package file
 * @param {string} absoluteAssetRootPath Absolute path below which extracted files should be written
 * @returns {BuilderCompatiblePackage} The builder-compatible package definition
 */
export const splitPackageDefinition = (
  packageFile: PackageFile,
  absoluteAssetRootPath: string,
): BuilderCompatiblePackage => {
  const { id, items, ...rest } = packageFile;
  void id;
  const outputContext: OutputContext = {
    absoluteAssetRootPath,
    assetRootName: path.basename(absoluteAssetRootPath),
  };

  return {
    ...rest,
    items: items.map((item, index) => convertReflex(item, ['items'], index, outputContext)),
  };
};

/**
 * Splits a Nexus package file into a builder-compatible YAML definition and separate code files.
 * @param {string} packageFile Path to the .nxs package file
 * @param {string} outputDir Output directory for the generated files
 * @returns {boolean} The success status of the operation: on success true, otherwise false.
 */
export const splitPackage = (packageFile: string, outputDir: string) => {
  const absolutePackageFilePath = path.resolve(packageFile);
  const absoluteOutputDirPath = path.resolve(outputDir);

  const packageFileResult = checkPackageFile(absolutePackageFilePath);
  if (!packageFileResult.result) {
    console.log(packageFileResult.errorMessage);
    return false;
  }

  const outputDirResult = prepareOutputDirectory(absoluteOutputDirPath);
  if (!outputDirResult.result) {
    console.log(outputDirResult.errorMessage);
    return false;
  }

  let packageDefinitionContent: PackageFile;
  try {
    packageDefinitionContent = readPackageFile(absolutePackageFilePath);
  } catch (error) {
    console.log(`Package file '${absolutePackageFilePath}' could not be parsed: ${String(error)}`);
    return false;
  }

  const outputFileNameWithoutExtension = path.basename(absolutePackageFilePath, '.nxs');
  const absoluteOutputFile = path.resolve(absoluteOutputDirPath, `${outputFileNameWithoutExtension}.yaml`);
  const absoluteAssetRootPath = path.resolve(absoluteOutputDirPath, outputFileNameWithoutExtension);

  const builderCompatiblePackage = splitPackageDefinition(packageDefinitionContent, absoluteAssetRootPath);
  const yamlPackageDefinition = yaml.dump(builderCompatiblePackage, {
    lineWidth: -1,
    noRefs: true,
  });
  writePackageDefinition(yamlPackageDefinition, absoluteOutputFile);

  return true;
};
