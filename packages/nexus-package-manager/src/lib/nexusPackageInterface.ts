export const installNexusPackage = (pkgJson: any) => {
  const newPkg = globalThis.nexusclient.packages().create(pkgJson.name, pkgJson.description);
  const reflexes = globalThis.nexusclient.reflexes();
  newPkg.apply(pkgJson, reflexes);
  reflexes.run_function('onInstall', undefined, pkgJson.name);
};

export const isNexusPackageInstalled = (packageName: string) => {
  return globalThis.nexusclient.packages().exists(packageName, true) !== 0;
};

export const uninstallNexusPackage = (packageName: string) => {
  globalThis.nexusclient.reflexes().run_function('onUninstall', undefined, packageName);
  globalThis.nexusclient.packages().remove(packageName);
};
