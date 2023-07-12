import scriptTemplate from './templates/script.jsr';
import functionTemplate from './templates/function.jsr';
import disableTemplate from './templates/disable.jsr';
import enableTemplate from './templates/enable.jsr';
import commandTemplate from './templates/command.jsr';
import notifyTemplate from './templates/notify.jsr'
import jsrender from 'jsrender';

const templates = jsrender.templates({
  script: scriptTemplate,
  function: functionTemplate,
  disable: disableTemplate,
  enable: enableTemplate,
  command: commandTemplate,
  notify: notifyTemplate,
});

const convertActions = (actions: client.Action[]) => {
  const result = [];
  let index = 0;

  for (const action of actions) {
    result.push(`// ${action.action} action (index ${index++})`);
    result.push(templates.templates[action.action](action));
  }

  return result.join('\n');
};

const convertReflex = (reflex: client.Reflex) => {
  if (reflex.type === 'group') {
    for (const item of reflex.items) {
      convertReflex(item);
    }
  }
};

const convertPackage = (pkg: client.Package) => {
  for (const item of pkg.items) {
    convertReflex(item);
  }
};

export { convertPackage, convertActions };
