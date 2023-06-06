import { NotificationAction } from '../notificationAction';

test('Should initialize all members', () => {
  const notification = new NotificationAction({});

  expect(notification).toMatchObject({
    action: 'notification',
    heading: '',
    text: '',
  });
});

test('Should overwrite the heading property if given', () => {
  const partialNotification = { heading: 'heading' };

  const notification = new NotificationAction(partialNotification);

  expect(notification).toMatchObject({
    heading: 'heading',
  });
});

test('Should overwrite the text property if given', () => {
  const partialNotification = { text: 'text' };

  const notification = new NotificationAction(partialNotification);

  expect(notification).toMatchObject({
    text: 'text',
  });
});
