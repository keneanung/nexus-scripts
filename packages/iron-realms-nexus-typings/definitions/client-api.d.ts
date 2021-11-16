/**
 * Alias for the global window object. While optional, prepending functions with
 * client makes it explicit that you interact with Nexus.
 */
declare namespace client {

  /**
   * Send a command to the game.
   * @param input Text to send to the game
   * @param no_expansion Set to `true` to send the exact string to the game without expansion
   */
  export function send_command(input: string, no_expansion?: boolean): void;

  /**
   * Display text on the output screen
   * @param text Text to display on the output screen
   * @param fgcolor Foreground color of the text
   * @param bgcolor Background color of the text
   */
  export function display_notice(text: string, fgcolor?: string, bgcolor?: string): void;
}