import scriptTemplate from './templates/script.jsr';
import functionTemplate from './templates/function.jsr';
import disableTemplate from './templates/disable.jsr';
import enableTemplate from './templates/enable.jsr';
import commandTemplate from './templates/command.jsr';
import notifyTemplate from './templates/notify.jsr';
import doReplaceTemplate from './templates/doReplace.jsr';
import notificationTemplate from './templates/notification.jsr';
import soundTemplate from './templates/sound.jsr';
import stopTemplate from './templates/stop.jsr';
import variableTemplate from './templates/variables.jsr';
import gagTemplate from './templates/gag.jsr';
import highlightTemplate from './templates/highlight.jsr';
import buttonAction from './templates/button.jsr';
import jsrender from 'jsrender';
import { Action, Package, Reflex } from '@keneanung/iron-realms-nexus-typings';
import beautify_js from 'js-beautify';

// missing: WaitAction, WaitForAction, IfAction, RepeatAction, RewriteAction, LinkifyAction, LabelAction, GotoAction

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
  stop: stopTemplate,
  variable: variableTemplate,
  gag: gagTemplate,
  highlight: highlightTemplate,
  button: buttonAction,
});

const convertActions = (
  actions: Action[],
  parentReflexName: string,
  parentReflexType: 'alias' | 'trigger' | 'keybind',
) => {
  const result = [];
  let index = 0;

  if (
    actions.some(
      (action) =>
        action.action === 'command' ||
        action.action === 'notification' ||
        action.action === 'notify' ||
        (action.action === 'variable' && action.valtype === 'variable'),
    )
  ) {
    result.push(templates.templates['doReplace']());
  }

  for (let action of actions) {
    result.push(`// ${action.action} action (index ${index++})`);
    if (action.action === 'disableme') {
      // reroute disableme actions to more general disable actions
      action = {
        action: 'disable',
        name: parentReflexName,
        type: parentReflexType,
      };
    }
    result.push(templates.templates[action.action](action));
  }

  const resultingAction = result.join('\n');

  return beautify_js(resultingAction, {
    indent_size: 2,
  });
};

const convertReflex = (reflex: Reflex) => {
  if (reflex.type === 'group') {
    for (const item of reflex.items) {
      convertReflex(item);
    }
  } else if (reflex.type === 'alias' || reflex.type === 'keybind' || reflex.type === 'trigger') {
    const newScript = convertActions(reflex.actions, reflex.name, reflex.type);
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
