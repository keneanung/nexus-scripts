import scriptTemplate from './templates/script.jsr';
import functionTemplate from './templates/function.jsr';
import disableTemplate from './templates/disable.jsr';
import enableTemplate from './templates/enable.jsr';
import commandTemplate from './templates/command.jsr';
import notifyTemplate from './templates/notify.jsr';
import doReplaceTemplate from './templates/doReplace.jsr';
import notificationTemplate from './templates/notification.jsr';
import soundTemplate from './templates/sound.jsr';
import jsrender from 'jsrender';
import { Action, Package, Reflex } from '@keneanung/iron-realms-nexus-typings';

const templates = jsrender.templates({
  script: scriptTemplate,
  function: functionTemplate,
  disable: disableTemplate,
  enable: enableTemplate,
  command: commandTemplate,
  notify: notifyTemplate,
  doReplace: doReplaceTemplate,
  notification: notificationTemplate,
  sound: soundTemplate,
});

const convertActions = (actions: Action[]) => {
  const result = [];
  let index = 0;

  if(actions.some((action) => action.action === 'command' || action.action === 'notification' || action.action === 'notify')){
    result.push(templates.templates['doReplace']())
  }

  for (const action of actions) {
    result.push(`// ${action.action} action (index ${index++})`);
    result.push(templates.templates[action.action](action));
  }

  return result.join('\n');
};

const convertReflex = (reflex: Reflex) => {
  if (reflex.type === 'group') {
    for (const item of reflex.items) {
      convertReflex(item);
    }
  } else if (reflex.type === 'alias' || reflex.type === 'keybind' || reflex.type === 'trigger') {
    const newScript = convertActions(reflex.actions);
    reflex.actions = [
      {
        action: 'script',
        script: newScript,
      },
    ];
  }
};

const convertPackage = (pkg: Package) => {
  for (const item of pkg.items) {
    convertReflex(item);
  }
};

export { convertPackage, convertActions };
