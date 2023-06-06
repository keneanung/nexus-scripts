import { ButtonAction } from '../buttonAction';

test('Should initialize all members', () => {
  const buttonAction = new ButtonAction({});

  expect(buttonAction).toMatchObject({
    action: 'button',
    label: '',
    buttonid: '',
    buttonaction: 'label',
    command: '',
  });
});

test('Should overwrite the label property if given', () => {
  const partialButtonAction = { label: 'label' };

  const buttonAction = new ButtonAction(partialButtonAction);

  expect(buttonAction).toMatchObject({
    label: 'label',
  });
});

test('Should overwrite the buttonid property if given', () => {
  const partialButtonAction = { buttonid: 'myId' };

  const buttonAction = new ButtonAction(partialButtonAction);

  expect(buttonAction).toMatchObject({
    buttonid: 'myId',
  });
});

test('Should overwrite the buttonaction property if given', () => {
  const partialButtonAction: Partial<client.ButtonAction> = { buttonaction: 'command' };

  const buttonAction = new ButtonAction(partialButtonAction);

  expect(buttonAction).toMatchObject({
    buttonaction: 'command',
  });
});

test('Should overwrite the command property if given', () => {
  const partialButtonAction = { command: 'this is the new command' };

  const buttonAction = new ButtonAction(partialButtonAction);

  expect(buttonAction).toMatchObject({
    command: 'this is the new command',
  });
});
