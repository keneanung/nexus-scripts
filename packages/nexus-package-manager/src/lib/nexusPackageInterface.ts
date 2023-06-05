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

export const getPackageList = (): nexusclient.ReflexPackage[] => {
  return nexusclient.reflexes().get_package_list();
};

export const setPackageOrder = (packageList: nexusclient.ReflexPackage[]) => {
  for (let i = 0; i < packageList.length; i++) {
    const packageList = getPackageList();
    const oldIndex = packageList.findIndex((p: nexusclient.ReflexPackage) => p.name === packageList[i].name);
    nexusclient.packages().move(oldIndex, i);
  }
};
