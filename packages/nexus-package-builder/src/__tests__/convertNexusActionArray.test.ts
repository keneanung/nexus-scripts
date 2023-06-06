import { FunctionAction } from '../classes/functionAction';
import { ScriptAction } from '../classes/scriptAction';
import { ButtonAction } from '../classes/buttonAction';
import { PartialScriptAction } from '../types';
import { convertNexusActionArray } from '../utils';
import { CommandAction } from '../classes/commandAction';
import { DisableAction } from '../classes/disableAction';
import { DisablemeAction } from '../classes/disablemeAction';
import { EnableAction } from '../classes/enableAction';
import { GotoAction } from '../classes/gotoAction';
import { IfAction } from '../classes/ifAction';
import { LabelAction } from '../classes/labelAction';
import { NotificationAction } from '../classes/notificationAction';
import { NotifyAction } from '../classes/notifyAction';
import { RepeatAction } from '../classes/repeatAction';
import { SoundAction } from '../classes/soundAction';
import { StopAction } from '../classes/stopAction';
import { VariableAction } from '../classes/variableAction';
import { WaitAction } from '../classes/waitAction';
import { WaitForAction } from '../classes/waitForAction';

test('Should return an empty array on an empty array', () => {
  const result = convertNexusActionArray([], 'definitionFile');

  expect(result.length).toBe(0);
});

test('Should return array with a script action if a script action was given', () => {
  const input: PartialScriptAction[] = [{ action: 'script' }];

  const result = convertNexusActionArray(input, '');

  expect(result).toContainEqual(new ScriptAction({}, ''));
});

test('Should return array with a function action if a function action was given', () => {
  const input: Partial<client.FunctionAction>[] = [{ action: 'function' }];

  const result = convertNexusActionArray(input, '');

  expect(result).toContainEqual(new FunctionAction({}));
});

test('Should return array with a button action if a button action was given', () => {
  const input: Partial<client.ButtonAction>[] = [{ action: 'button' }];

  const result = convertNexusActionArray(input, '');

  expect(result).toContainEqual(new ButtonAction({}));
});

test('Should return array with a command action if a command action was given', () => {
  const input: Partial<client.CommandAction>[] = [{ action: 'command' }];

  const result = convertNexusActionArray(input, '');

  expect(result).toContainEqual(new CommandAction({}));
});

test('Should return array with a disable action if a disable action was given', () => {
  const input: Partial<client.DisableAction>[] = [{ action: 'disable' }];

  const result = convertNexusActionArray(input, '');

  expect(result).toContainEqual(new DisableAction({}));
});

test('Should return array with a disableme action if a disableme action was given', () => {
  const input: Partial<client.DisablemeAction>[] = [{ action: 'disableme' }];

  const result = convertNexusActionArray(input, '');

  expect(result).toContainEqual(new DisablemeAction());
});

test('Should return array with a enable action if a enable action was given', () => {
  const input: Partial<client.EnableAction>[] = [{ action: 'enable' }];

  const result = convertNexusActionArray(input, '');

  expect(result).toContainEqual(new EnableAction({}));
});

test('Should return array with a goto action if a goto action was given', () => {
  const input: Partial<client.GotoAction>[] = [{ action: 'goto' }];

  const result = convertNexusActionArray(input, '');

  expect(result).toContainEqual(new GotoAction({}));
});

test('Should return array with a if action if a if action was given', () => {
  const input: Partial<client.IfAction>[] = [{ action: 'if' }];

  const result = convertNexusActionArray(input, '');

  expect(result).toContainEqual(new IfAction({}));
});

test('Should return array with a label action if a label action was given', () => {
  const input: Partial<client.LabelAction>[] = [{ action: 'label' }];

  const result = convertNexusActionArray(input, '');

  expect(result).toContainEqual(new LabelAction({}));
});

test('Should return array with a notification action if a notification action was given', () => {
  const input: Partial<client.NotificationAction>[] = [{ action: 'notification' }];

  const result = convertNexusActionArray(input, '');

  expect(result).toContainEqual(new NotificationAction({}));
});

test('Should return array with a notify action if a notify action was given', () => {
  const input: Partial<client.NotifyAction>[] = [{ action: 'notify' }];

  const result = convertNexusActionArray(input, '');

  expect(result).toContainEqual(new NotifyAction({}));
});

test('Should return array with a repeat action if a repeat action was given', () => {
  const input: Partial<client.RepeatAction>[] = [{ action: 'repeat' }];

  const result = convertNexusActionArray(input, '');

  expect(result).toContainEqual(new RepeatAction({}));
});

test('Should return array with a sound action if a sound action was given', () => {
  const input: Partial<client.SoundAction>[] = [{ action: 'sound' }];

  const result = convertNexusActionArray(input, '');

  expect(result).toContainEqual(new SoundAction({}));
});

test('Should return array with a stop action if a stop action was given', () => {
  const input: Partial<client.StopAction>[] = [{ action: 'stop' }];

  const result = convertNexusActionArray(input, '');

  expect(result).toContainEqual(new StopAction());
});

test('Should return array with a variable action if a variable action was given', () => {
  const input: Partial<client.VariableAction>[] = [{ action: 'variable' }];

  const result = convertNexusActionArray(input, '');

  expect(result).toContainEqual(new VariableAction({}));
});

test('Should return array with a wait action if a wait action was given', () => {
  const input: Partial<client.WaitAction>[] = [{ action: 'wait' }];

  const result = convertNexusActionArray(input, '');

  expect(result).toContainEqual(new WaitAction({}));
});

test('Should return array with a waitFor action if a waitFor action was given', () => {
  const input: Partial<client.WaitForAction>[] = [{ action: 'waitfor' }];

  const result = convertNexusActionArray(input, '');

  expect(result).toContainEqual(new WaitForAction({}));
});

test('Should throw an error if no action key is present in an object', () => {
  const input: PartialScriptAction[] = [{}];

  expect(() => convertNexusActionArray(input, '')).toThrow(
    'Unrecognized action type. Are you missing the "action" property?',
  );
});
