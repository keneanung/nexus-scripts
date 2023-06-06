import { NotifyAction } from '../notifyAction';

test('Should initialize all members', () => {
  const notify = new NotifyAction({});

  expect(notify).toMatchObject({
    action: 'notify',
    notice: '',
    notice_fg: '',
    notice_bg: '',
  });
});

test('Should overwrite the notice property if given', () => {
  const partialNotify = { notice: 'notice' };

  const notify = new NotifyAction(partialNotify);

  expect(notify).toMatchObject({
    notice: 'notice',
  });
});

test('Should overwrite the notice_fg property if given', () => {
  const partialNotify = { notice_fg: 'notice_fg' };

  const notify = new NotifyAction(partialNotify);

  expect(notify).toMatchObject({
    notice_fg: 'notice_fg',
  });
});

test('Should overwrite the notice_bg property if given', () => {
  const partialNotify = { notice_bg: 'notice_bg' };

  const notify = new NotifyAction(partialNotify);

  expect(notify).toMatchObject({
    notice_bg: 'notice_bg',
  });
});
