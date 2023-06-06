import { CommandAction } from '../commandAction';

test('Should initialize all members', () => {
  const commandAction = new CommandAction({});

  expect(commandAction).toMatchObject({
    action: 'command',
    command: '',
    prefix_suffix: true,
  });
});

test('Should overwrite the command property if given', () => {
  const partialCommand = { command: 'command property' };

  const command = new CommandAction(partialCommand);

  expect(command).toMatchObject({
    command: 'command property',
  });
});

test('Should overwrite the prefix_suffix property if given', () => {
  const partialCommand = { prefix_suffix: false };

  const command = new CommandAction(partialCommand);

  expect(command).toMatchObject({
    prefix_suffix: false,
  });
});
