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
import outputHelpers from './templates/outputHelpers.jsr';
import rewriteAction from './templates/rewrite.jsr';
import linkifyAction from './templates/linkify.jsr';
import jsrender from 'jsrender';
import { Action, Package, Reflex, Trigger, WaitForAction } from '@keneanung/iron-realms-nexus-typings';
import beautify_js from 'js-beautify';
import { isBrowser } from 'browser-or-node';
import { v4 as uuid4 } from 'uuid';
import {
  ActionConversionResult,
  compileReadableActions,
  ConversionDiagnostic,
  needsReadableCompiler,
  ParentReflexType,
} from './compiler';

const renderer = isBrowser ? jsrender() : jsrender;
renderer.views.helpers({
  json: (value: unknown) => JSON.stringify(value),
});

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
  rewrite: rewriteAction,
  linkify: linkifyAction,
});

const outputActions = new Set(['highlight', 'rewrite', 'linkify']);

const renderAction = (action: Action) => templates.templates[action.action](action);

/**
 * Converts a Nexus action list into a single script action.
 * @param {Action[]} actions The actions to convert.
 * @param {string} parentReflexName The name of the owning reflex.
 * @param {'alias' | 'trigger' | 'keybind' | 'event'} parentReflexType The type of the owning reflex.
 * @returns {string} The generated Nexus script.
 */
const convertLinearActions = (
  actions: Action[],
  parentReflexName: string,
  parentReflexType: ParentReflexType,
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

  if (actions.some((action) => outputActions.has(action.action))) {
    result.push(outputHelpers);
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
    result.push(renderAction(action));
    if (action.action === 'wait') {
      stack.push(`}, ${parseInt(action.seconds) * 1000 + parseInt(action.milliseconds)});`);
    }
  }

  result.push(...stack.reverse());

  const resultingAction = result.join('\n');

  return beautify_js(resultingAction, {
    indent_size: 2,
  });
};

/**
 * Converts a Nexus action list and returns both JavaScript and teaching-oriented diagnostics.
 * @param {Action[]} actions The actions to convert.
 * @param {string} parentReflexName The name of the owning reflex.
 * @param {'alias' | 'trigger' | 'keybind' | 'event'} parentReflexType The type of the owning reflex.
 * @returns {ActionConversionResult} The generated script and conversion diagnostics.
 */
const convertActionsWithDiagnostics = (
  actions: Action[],
  parentReflexName: string,
  parentReflexType: ParentReflexType,
): ActionConversionResult => {
  if (actions.some((action) => action.action === 'waitfor')) {
    throw new Error('WaitFor actions are not supported as action');
  }

  if (!needsReadableCompiler(actions)) {
    return { script: convertLinearActions(actions, parentReflexName, parentReflexType), diagnostics: [] };
  }

  const preamble: string[] = [];
  if (
    actions.some(
      (action) =>
        action.action === 'command' ||
        action.action === 'notification' ||
        action.action === 'notify' ||
        (action.action === 'variable' && action.valtype === 'variable'),
    )
  ) {
    preamble.push(templates.templates['doReplace']());
  }
  if (actions.some((action) => outputActions.has(action.action))) {
    preamble.push(outputHelpers);
  }

  const compiled = compileReadableActions({
    actions,
    parentReflexName,
    renderAction: (action) =>
      action.action === 'disableme'
        ? renderAction({ action: 'disable', name: parentReflexName, type: parentReflexType })
        : renderAction(action),
  });
  return {
    script: beautify_js([...preamble, compiled.script].filter(Boolean).join('\n'), { indent_size: 2 }),
    diagnostics: compiled.diagnostics,
  };
};

/**
 * Converts a Nexus action list into a single script action.
 * @param {Action[]} actions The actions to convert.
 * @param {string} parentReflexName The name of the owning reflex.
 * @param {'alias' | 'trigger' | 'keybind' | 'event'} parentReflexType The type of the owning reflex.
 * @returns {string} The generated Nexus script.
 */
const convertActions = (actions: Action[], parentReflexName: string, parentReflexType: ParentReflexType) =>
  convertActionsWithDiagnostics(actions, parentReflexName, parentReflexType).script;

const splitOnWaitFor = (
  actions: Action[],
  parentReflexName: string,
): { actions: Action[]; newTrigger: Trigger; diagnostics: ConversionDiagnostic[] } | undefined => {
  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    if (action.action === 'waitfor') {
      const diagnostics = replaceWaitForCrossingControlFlow(actions, i, parentReflexName);
      i = actions.indexOf(action);
      const newTriggerName = `Wait For '${action.text}' ${uuid4()}`;
      const newActions: Action[] = setUpNewTriggerActions(i, actions);
      endReflexAndEnableFollowUpWithTimeout(actions, i, newTriggerName, action);
      return {
        actions,
        diagnostics,
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

function replaceWaitForCrossingControlFlow(
  actions: Action[],
  waitIndex: number,
  parentReflexName: string,
): ConversionDiagnostic[] {
  const diagnostics: ConversionDiagnostic[] = [];
  const labels = new Map<string, number>();
  actions.forEach((action, index) => {
    if (action.action === 'label' && !labels.has(action.label)) labels.set(action.label, index);
  });

  const crossesBoundary = (source: number, label: string) => {
    const target = labels.get(label);
    return target !== undefined && ((source < waitIndex && target > waitIndex) || (source > waitIndex && target < waitIndex));
  };
  const warning = (code: string, message: string, actionIndex: number): ConversionDiagnostic => ({
    severity: 'warning',
    code,
    message,
    reflexName: parentReflexName,
    actionIndex,
  });

  const rewritten: Action[] = [];
  actions.forEach((action, index) => {
    if (action.action === 'goto' && crossesBoundary(index, action.label)) {
      const diagnostic = warning(
        'NSSC_WAITFOR_CROSSING',
        `Jump to ${JSON.stringify(action.label)} crosses a Wait For boundary and requires manual asynchronous restructuring.`,
        index,
      );
      diagnostics.push(diagnostic);
      rewritten.push({
        action: 'script',
        script: `// TODO [${diagnostic.code}]: ${diagnostic.message}\nreturn;`,
      });
      return;
    }
    if (action.action === 'repeat' && crossesBoundary(index, action.label)) {
      const diagnostic = warning(
        'NSSC_WAITFOR_REPEAT',
        `Repeat ending at ${JSON.stringify(action.label)} crosses a Wait For boundary; its body is emitted once without looping.`,
        index,
      );
      diagnostics.push(diagnostic);
      rewritten.push({ action: 'script', script: `// TODO [${diagnostic.code}]: ${diagnostic.message}` });
      return;
    }
    if (action.action === 'if') {
      let changed = false;
      const replacement = { ...action };
      if (action.dothen === 'jump' && crossesBoundary(index, action.dothenlabel)) {
        replacement.dothen = 'stop';
        changed = true;
      }
      if (action.doelse === 'jump' && crossesBoundary(index, action.doelselabel)) {
        replacement.doelse = 'stop';
        changed = true;
      }
      if (changed) {
        const diagnostic = warning(
          'NSSC_WAITFOR_CONDITIONAL_JUMP',
          'A conditional jump crosses a Wait For boundary; that branch now stops and requires manual asynchronous restructuring.',
          index,
        );
        diagnostics.push(diagnostic);
        rewritten.push({ action: 'script', script: `// TODO [${diagnostic.code}]: ${diagnostic.message}` }, replacement);
        return;
      }
    }
    rewritten.push(action);
  });
  actions.splice(0, actions.length, ...rewritten);
  return diagnostics;
}

function setUpNewTriggerActions(i: number, actions: Action[]) {
  const newActions: Action[] = [{ action: 'disableme' }];
  if (i < actions.length - 1) {
    newActions.push(...actions.slice(i + 1));
  }
  return newActions;
}

function endReflexAndEnableFollowUpWithTimeout(
  actions: Action[],
  i: number,
  newTriggerName: string,
  action: WaitForAction,
) {
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
      script: '//The following two actions emulate the expire option of WaitFor',
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
    },
  );
}

const convertReflex = (reflex: Reflex, diagnostics: ConversionDiagnostic[]): Trigger[] => {
  const extraTriggers = [];
  if (reflex.type === 'group') {
    for (const item of reflex.items) {
      const moreExtraTriggers = convertReflex(item, diagnostics);
      extraTriggers.push(...moreExtraTriggers);
    }
  } else if (
    reflex.type === 'alias' ||
    reflex.type === 'keybind' ||
    reflex.type === 'trigger' ||
    reflex.type === 'event'
  ) {
    const splitResult = splitOnWaitFor(reflex.actions, reflex.name);
    if (splitResult) {
      reflex.actions = splitResult.actions;
      extraTriggers.push(splitResult.newTrigger);
      diagnostics.push(...splitResult.diagnostics);
    }
    const converted = convertActionsWithDiagnostics(reflex.actions, reflex.name, reflex.type);
    const newScript = converted.script;
    diagnostics.push(...converted.diagnostics);
    reflex.actions = [
      {
        action: 'script',
        script: newScript,
      },
    ];
  }
  return extraTriggers;
};

/**
 * Converts a complete Nexus package in place.
 * @param {Package} pkg The package to convert.
 * @returns {ConversionDiagnostic[]} Warnings and errors encountered while generating teaching-oriented code.
 */
const convertPackage = (pkg: Package) => {
  const extraTriggers = [];
  const diagnostics: ConversionDiagnostic[] = [];
  for (const item of pkg.items) {
    extraTriggers.push(...convertReflex(item, diagnostics));
  }
  const convertedTriggers: Trigger[] = [];
  while (extraTriggers.length > 0) {
    const triggerToConvert = extraTriggers.shift();
    if (triggerToConvert) {
      extraTriggers.push(...convertReflex(triggerToConvert, diagnostics));
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
  return diagnostics;
};

export {
  ActionConversionResult,
  ConversionDiagnostic,
  convertActions,
  convertActionsWithDiagnostics,
  convertPackage,
};
