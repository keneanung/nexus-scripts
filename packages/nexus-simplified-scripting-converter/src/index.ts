import { Package, Reflex, Action } from '@keneanung/iron-realms-nexus-typings';

const convertActions = (actions: Action[]) => {
  let result = '';

  for (const action of actions) {
    if (action.action === 'script') {
      result += action.script + '\n';
    } else if (action.action == 'function') {
      if (action.fn && action.fn.length > 0) {
        result += `nexusclient.reflexes().run_function("${action.fn}")\n`;
      }
    }
  }

  return result;
};

const convertReflex = (reflex: Reflex) => {
  if (reflex.type === 'group') {
    for (const item of reflex.items) {
      convertReflex(item);
    }
  }
};

const convertPackage = (pkg: Package) => {
  for (const item of pkg.items) {
    convertReflex(item);
  }
};

export { convertPackage, convertActions };
