import { ReflexPackage } from '@keneanung/iron-realms-nexus-typings';

export const installNexusPackage = (pkgJson: any) => {
  const newPkg = nexusclient.packages().create(pkgJson.name, pkgJson.description);
  const reflexes = nexusclient.reflexes();
  newPkg.apply(pkgJson, reflexes);
  reflexes.run_function('onInstall', undefined, pkgJson.name);
};

export const isNexusPackageInstalled = (packageName: string) => {
  return nexusclient.packages().exists(packageName, true) !== 0;
};

export const uninstallNexusPackage = (packageName: string) => {
  nexusclient.reflexes().run_function('onUninstall', undefined, packageName);
  nexusclient.packages().remove(packageName);
};

export const getPackageList = (): ReflexPackage[] => {
  return nexusclient.reflexes().get_package_list();
};

export const setPackageOrder = (packageList: ReflexPackage[]) => {
  for (let i = 0; i < packageList.length; i++) {
    const packageList = getPackageList();
    const oldIndex = packageList.findIndex((p: ReflexPackage) => p.name === packageList[i].name);
    nexusclient.packages().move(oldIndex, i);
  }
};
