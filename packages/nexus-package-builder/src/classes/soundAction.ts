/**
 * Class for a NExus sound action
 */
export class SoundAction implements client.SoundAction {
  action = 'sound' as const;
  sound = '';

  /**
   * Constructs a new complete sound action from a partial one.
   *
   * @param {Partial<client.SoundAction>} partialSoundAction The partial sound action to construct a new complete sound action from.
   */
  constructor(partialSoundAction: Partial<client.SoundAction>) {
    if (partialSoundAction.sound !== undefined) {
      this.sound = partialSoundAction.sound;
    }
  }
}
