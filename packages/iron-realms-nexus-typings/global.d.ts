// Type definitions for the Nexus MUD client
// Project: @keneanung/iron-realms-nexus-typings
// Definitions by: keneanung <keneanung@gmail.com>

/**
 * Send a command to the game.
 * @param input Text to send to the game
 * @param no_expansion Set to `true` to send the exact string to the game without expansion
 */
declare function send_command(input: string, no_expansion?: boolean): void;

/**
 * Display text on the output screen
 * @param text Text to display on the output screen
 * @param fgcolor Foreground color of the text
 * @param bgcolor Background color of the text
 */
declare function display_notice(text: string, fgcolor?: string, bgcolor?: string): void;