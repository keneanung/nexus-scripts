import { WaitForAction } from '../waitForAction';

test('Should initialize all members', () => {
  const waitFor = new WaitForAction({});

  expect(waitFor).toMatchObject({
    action: 'waitfor',
    text: '',
    matching: 'substring',
    whole_words: true,
    case_sensitive: true,
    expire: '',
  });
});

test('Should overwrite the text property if given', () => {
  const partialWaitFor = { text: 'text' };

  const waitFor = new WaitForAction(partialWaitFor);

  expect(waitFor).toMatchObject({
    text: 'text',
  });
});

test('Should overwrite the matching property if given', () => {
  const partialWaitFor: Partial<client.WaitForAction> = { matching: 'regexp' };

  const waitFor = new WaitForAction(partialWaitFor);

  expect(waitFor).toMatchObject({
    matching: 'regexp',
  });
});

test('Should overwrite the whole_words property if given', () => {
  const partialWaitFor = { whole_words: false };

  const waitFor = new WaitForAction(partialWaitFor);

  expect(waitFor).toMatchObject({
    whole_words: false,
  });
});

test('Should overwrite the case_sensitive property if given', () => {
  const partialWaitFor = { case_sensitive: false };

  const waitFor = new WaitForAction(partialWaitFor);

  expect(waitFor).toMatchObject({
    case_sensitive: false,
  });
});

test('Should overwrite the expire property if given', () => {
  const partialWaitFor = { expire: 'expire' };

  const waitFor = new WaitForAction(partialWaitFor);

  expect(waitFor).toMatchObject({
    expire: 'expire',
  });
});
