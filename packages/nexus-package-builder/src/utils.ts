import { Alias } from './classes/alias';
import { ButtonAction } from './classes/buttonAction';
import { CommandAction } from './classes/commandAction';
import { DisableAction } from './classes/disableAction';
import { DisablemeAction } from './classes/disablemeAction';
import { EnableAction } from './classes/enableAction';
import { NexusFunction } from './classes/function';
import { FunctionAction } from './classes/functionAction';
import { GotoAction } from './classes/gotoAction';
import { Group } from './classes/group';
import { IfAction } from './classes/ifAction';
import { LabelAction } from './classes/labelAction';
import { NotificationAction } from './classes/notificationAction';
import { NotifyAction } from './classes/notifyAction';
import { RepeatAction } from './classes/repeatAction';
import { ScriptAction } from './classes/scriptAction';
import { SoundAction } from './classes/soundAction';
import { StopAction } from './classes/stopAction';
import { Trigger } from './classes/trigger';
import { Event } from './classes/event';
import { VariableAction } from './classes/variableAction';
import { WaitAction } from './classes/waitAction';
import { WaitForAction } from './classes/waitForAction';
import {
  PartialAction,
  PartialAlias,
  PartialEvent,
  PartialFunction,
  PartialGroup,
  PartialKeybind,
  PartialReflex,
  PartialScriptAction,
  PartialTrigger,
} from './types';
import { Keybind } from './classes/keybind';

/**
 * Generator for IDs.
 */
export class IdGenerator {
  private lastId = 0;

  /**
   * Returns a unique identifier.
   *
   * @returns {number} A new id
   */
  getId = (): number => ++this.lastId;
}

const isPartialFunction = (partial: PartialReflex): partial is PartialFunction =>
  partial.type !== undefined && partial.type === 'function';

const isPartialGroup = (partial: PartialReflex): partial is PartialGroup =>
  partial.type !== undefined && partial.type === 'group';

const isPartialAlias = (partial: PartialReflex): partial is PartialAlias =>
  partial.type !== undefined && partial.type === 'alias';

const isPartialTrigger = (partial: PartialReflex): partial is PartialTrigger =>
  partial.type !== undefined && partial.type === 'trigger';

const isPartialEvent = (partial: PartialReflex): partial is PartialEvent =>
  partial.type !== undefined && partial.type === 'event';

const isPartialKeybind = (partial: PartialReflex): partial is PartialKeybind =>
  partial.type !== undefined && partial.type === 'keybind';

/**
 * Converts an array of potentially partial reflexes to an array of complete reflexes.
 *
 * @param {PartialReflex[]} reflexes The array of partial reflexes to convert.
 * @param {IdGenerator} idGenerator The IdGenerator to use to generate IDs of new items.
 * @param {string} packageDefinitionFile The path to the package definition file.
 * @returns {client.Reflex[]} The converted array of (now complete) reflexes.
 */
export const convertNexusReflexArray = (
  reflexes: PartialReflex[],
  idGenerator: IdGenerator,
  packageDefinitionFile: string,
) => {
  const result: client.Reflex[] = [];
  for (const element of reflexes) {
    let convertedElement: client.Reflex;
    if (isPartialFunction(element)) {
      convertedElement = new NexusFunction(element, idGenerator, packageDefinitionFile);
    } else if (isPartialGroup(element)) {
      convertedElement = new Group(element, idGenerator, packageDefinitionFile);
    } else if (isPartialAlias(element)) {
      convertedElement = new Alias(element, idGenerator, packageDefinitionFile);
    } else if (isPartialTrigger(element)) {
      convertedElement = new Trigger(element, idGenerator, packageDefinitionFile);
    } else if (isPartialEvent(element)) {
      convertedElement = new Event(element, idGenerator, packageDefinitionFile);
    } else if (isPartialKeybind(element)) {
      convertedElement = new Keybind(element, idGenerator, packageDefinitionFile);
    } else {
      throw new Error('Unrecognized reflex type. Are you missing the "type" property?');
    }
    result.push(convertedElement);
  }
  return result;
};

const isPartialScriptAction = (partialAction: PartialAction): partialAction is PartialScriptAction =>
  partialAction.action !== undefined && partialAction.action === 'script';

const isPartialFunctionAction = (partialAction: PartialAction): partialAction is Partial<client.FunctionAction> =>
  partialAction.action !== undefined && partialAction.action === 'function';

const isPartialButtonAction = (partialAction: PartialAction): partialAction is Partial<client.ButtonAction> =>
  partialAction.action !== undefined && partialAction.action === 'button';

const isPartialCommandAction = (partialAction: PartialAction): partialAction is Partial<client.CommandAction> =>
  partialAction.action !== undefined && partialAction.action === 'command';

const isPartialDisableAction = (partialAction: PartialAction): partialAction is Partial<client.DisableAction> =>
  partialAction.action !== undefined && partialAction.action === 'disable';

const isDisablemeAction = (partialAction: PartialAction): partialAction is client.DisablemeAction =>
  partialAction.action !== undefined && partialAction.action === 'disableme';

const isPartialEnableAction = (partialAction: PartialAction): partialAction is Partial<client.EnableAction> =>
  partialAction.action !== undefined && partialAction.action === 'enable';

const isPartialGotoAction = (partialAction: PartialAction): partialAction is Partial<client.GotoAction> =>
  partialAction.action !== undefined && partialAction.action === 'goto';

const isPartialIfAction = (partialAction: PartialAction): partialAction is Partial<client.IfAction> =>
  partialAction.action !== undefined && partialAction.action === 'if';

const isPartialLabelAction = (partialAction: PartialAction): partialAction is Partial<client.LabelAction> =>
  partialAction.action !== undefined && partialAction.action === 'label';

const isPartialNotificationAction = (
  partialAction: PartialAction,
): partialAction is Partial<client.NotificationAction> =>
  partialAction.action !== undefined && partialAction.action === 'notification';

const isPartialNotifyAction = (partialAction: PartialAction): partialAction is Partial<client.NotifyAction> =>
  partialAction.action !== undefined && partialAction.action === 'notify';

const isPartialRepeatAction = (partialAction: PartialAction): partialAction is Partial<client.RepeatAction> =>
  partialAction.action !== undefined && partialAction.action === 'repeat';

const isPartialSoundAction = (partialAction: PartialAction): partialAction is Partial<client.SoundAction> =>
  partialAction.action !== undefined && partialAction.action === 'sound';

const isStopAction = (partialAction: PartialAction): partialAction is client.StopAction =>
  partialAction.action !== undefined && partialAction.action === 'stop';

const isPartialVariableAction = (partialAction: PartialAction): partialAction is Partial<client.VariableAction> =>
  partialAction.action !== undefined && partialAction.action === 'variable';

const isPartialWaitAction = (partialAction: PartialAction): partialAction is Partial<client.WaitAction> =>
  partialAction.action !== undefined && partialAction.action === 'wait';

const isPartialWaitForAction = (partialAction: PartialAction): partialAction is Partial<client.WaitForAction> =>
  partialAction.action !== undefined && partialAction.action === 'waitfor';

/**
 * Converts an array of potentially partial actions to an array of complete actions.
 *
 * @param {PartialAction[]} actions The array of partial actions to convert.
 * @param {string} packageDefinitionFile The path to the package definition file.
 * @returns {client.Action[]} The converted array of (now complete) actions.
 */
export const convertNexusActionArray = (actions: PartialAction[], packageDefinitionFile: string) => {
  const result: client.Action[] = [];

  for (const element of actions) {
    let convertedElement: client.Action;

    if (isPartialScriptAction(element)) {
      convertedElement = new ScriptAction(element, packageDefinitionFile);
    } else if (isPartialFunctionAction(element)) {
      convertedElement = new FunctionAction(element);
    } else if (isPartialButtonAction(element)) {
      convertedElement = new ButtonAction(element);
    } else if (isPartialCommandAction(element)) {
      convertedElement = new CommandAction(element);
    } else if (isPartialDisableAction(element)) {
      convertedElement = new DisableAction(element);
    } else if (isDisablemeAction(element)) {
      convertedElement = new DisablemeAction();
    } else if (isPartialEnableAction(element)) {
      convertedElement = new EnableAction(element);
    } else if (isPartialGotoAction(element)) {
      convertedElement = new GotoAction(element);
    } else if (isPartialIfAction(element)) {
      convertedElement = new IfAction(element);
    } else if (isPartialLabelAction(element)) {
      convertedElement = new LabelAction(element);
    } else if (isPartialNotificationAction(element)) {
      convertedElement = new NotificationAction(element);
    } else if (isPartialNotifyAction(element)) {
      convertedElement = new NotifyAction(element);
    } else if (isPartialRepeatAction(element)) {
      convertedElement = new RepeatAction(element);
    } else if (isPartialSoundAction(element)) {
      convertedElement = new SoundAction(element);
    } else if (isStopAction(element)) {
      convertedElement = new StopAction();
    } else if (isPartialVariableAction(element)) {
      convertedElement = new VariableAction(element);
    } else if (isPartialWaitAction(element)) {
      convertedElement = new WaitAction(element);
    } else if (isPartialWaitForAction(element)) {
      convertedElement = new WaitForAction(element);
    } else {
      throw new Error('Unrecognized action type. Are you missing the "action" property?');
    }
    result.push(convertedElement);
  }

  return result;
};
