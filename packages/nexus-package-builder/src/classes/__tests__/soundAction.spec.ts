import { SoundAction } from '../soundAction';

test('Should initialize all members', () => {
  const sound = new SoundAction({});

  expect(sound).toMatchObject({
    action: 'sound',
    sound: '',
  });
});

test('Should overwrite the label property if given', () => {
  const partialSound = { sound: 'sound' };

  const sound = new SoundAction(partialSound);

  expect(sound).toMatchObject({
    sound: 'sound',
  });
});
