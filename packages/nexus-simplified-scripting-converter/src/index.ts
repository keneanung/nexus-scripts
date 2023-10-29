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
import waitAction from './templates/wait.jsr';
import jsrender from 'jsrender';
import { Action, Package, Reflex, Trigger, WaitForAction } from '@keneanung/iron-realms-nexus-typings';
import beautify_js from 'js-beautify';
import { isBrowser } from 'browser-or-node';
import { v4 as uuid4 } from 'uuid';

// missing: IfAction, RepeatAction, RewriteAction, LinkifyAction, LabelAction, GotoAction

const renderer = isBrowser ? jsrender() : jsrender;

const templates = renderer.templates({
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
  wait: waitAction,
});

const convertActions = (
  actions: Action[],
  parentReflexName: string,
  parentReflexType: 'alias' | 'trigger' | 'keybind',
) => {
  const result = [];
  let index = 0;
  const stack = [];

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
    if (action.action === 'waitfor') {
      throw new Error('WaitFor actions are not supported as action');
    }
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
    if (action.action === 'wait') {
      stack.push(`}, ${parseInt(action.seconds) * 1000 + parseInt(action.milliseconds)});`);
    }
  }

  result.push(stack.reverse());

  const resultingAction = result.join('\n');

  return beautify_js(resultingAction, {
    indent_size: 2,
  });
};

const splitOnWaitFor = (actions: Action[]): { actions: Action[]; newTrigger: Trigger } | undefined => {
  for (let i = 0; i < actions.length - 1; i++) {
    const action = actions[i];
    if (action.action === 'waitfor') {
      const newTriggerName = `Wait For '${action.text}' ${uuid4()}`;
      const newActions: Action[] = setUpNewTriggerActions(i, actions);
      endReflexAndEnableFollowUpWithTimeout(actions, i, newTriggerName, action);
      return {
        actions,
        newTrigger: {
          type: 'trigger',
          actions: newActions,
          case_sensitive: action.case_sensitive,
          enabled: false,
          matching: action.matching,
          text: action.text,
          whole_words: action.whole_words,
          name: newTriggerName,
        },
      };
    }
  }
};

function setUpNewTriggerActions(i: number, actions: Action[]) {
  const newActions: Action[] = [{ action: 'disableme' }];
  if (i < actions.length - 1) {
    newActions.push(...actions.slice(i + 1));
  }
  return newActions;
}

function endReflexAndEnableFollowUpWithTimeout(actions: Action[], i: number, newTriggerName: string, action: WaitForAction) {
  actions.splice(i, actions.length);
  actions.push(
    // enable the new trigger
    {
      action: 'enable',
      name: newTriggerName,
      type: 'trigger',
    },
    {
      action: 'script',
      script: '//The following two actions emulate the expire option of WaitFor'
    },
    {
      action: 'wait',
      seconds: action.expire || '10',
      milliseconds: '0',
    },
    {
      action: 'disable',
      type: 'trigger',
      name: newTriggerName,
    }
  );
}

const convertReflex = (reflex: Reflex): Trigger[] => {
  const extraTriggers = [];
  if (reflex.type === 'group') {
    for (const item of reflex.items) {
      const moreExtraTriggers = convertReflex(item);
      extraTriggers.push(...moreExtraTriggers);
    }
  } else if (reflex.type === 'alias' || reflex.type === 'keybind' || reflex.type === 'trigger') {
    const splitResult = splitOnWaitFor(reflex.actions);
    if (splitResult) {
      reflex.actions = splitResult.actions;
      extraTriggers.push(splitResult.newTrigger);
    }
    const newScript = convertActions(reflex.actions, reflex.name, reflex.type);
    reflex.actions = [
      {
        action: 'script',
        script: newScript,
      },
    ];
  }
  return extraTriggers;
};

const convertPackage = (pkg: Package) => {
  const extraTriggers = [];
  for (const item of pkg.items) {
    extraTriggers.push(...convertReflex(item));
  }
  const convertedTriggers: Trigger[] = [];
  while (extraTriggers.length > 0) {
    const triggerToConvert = extraTriggers.shift();
    if (triggerToConvert) {
      extraTriggers.push(...convertReflex(triggerToConvert));
      convertedTriggers.push(triggerToConvert);
    }
  }
  if (convertedTriggers.length > 0) {
    pkg.items.push({
      type: 'group',
      enabled: true,
      name: 'Generated WaitFor Triggers',
      items: convertedTriggers,
    });
  }
};

export { convertPackage, convertActions };

