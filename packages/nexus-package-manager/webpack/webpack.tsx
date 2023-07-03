// Webpack entrypoint.
// Use this to do any browser specific initialization and export the module as global object.

import { PackageManager, PackageManagerUi } from '../src/index';
console.log('loading Package Manager version [AIV]{version}[/AIV]...');
const packageManager = new PackageManager();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
globalThis.packageManager = packageManager;

if (globalThis.React && !nexusclient.platform().real_mobile() && !nexusclient.platform().is_desktop() ) {

  const layout = nexusclient.ui().layout();
  const tabName = 'npkg_ui';
  if(layout.custom_tabs()[tabName]){
    layout.unregister_custom_tab(tabName)
  }
  layout.register_custom_tab(tabName, <PackageManagerUi packageManager={packageManager} />);
}else{
  nexusclient.display_notice('This platform is not supported by the package manager.')
}

console.log('Package Manager loaded');

export default { PackageManager };
