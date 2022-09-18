export const installNexusPackage = (pkgJson: any) => {
  const newPkg = globalThis.nexusclient.packages().create(pkgJson.name, pkgJson.description);
  const reflexes = globalThis.nexusclient.reflexes();
  newPkg.apply(pkgJson, reflexes);
  reflexes.run_function('onInstall', undefined, pkgJson.name);
};
