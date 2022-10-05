// Webpack entrypoint.
// Use this to do any browser specific initialization and export the module as global object.

import { PackageManager, PackageManagerUi } from "../src/index"
console.log("loading package manager")
const packageManager = new PackageManager()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
globalThis.packageManager = packageManager;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nexusclient.ui().layout().register_custom_tab('npk_ui', <PackageManagerUi packageManager={packageManager} />);

console.log("Package Manager loaded");

export default PackageManager;