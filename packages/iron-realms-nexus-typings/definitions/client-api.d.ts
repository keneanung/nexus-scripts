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

  /**
   * recursively adds the back reference of a parent group to each reflex.
   */
  export function reflexes_fix_parents(): void;

  /**
   * Array of reflex packages installed into the client.
   */
  const packages: Package[];

  /**
   * Removes a named package from the client.
   *
   * @param name Name of the package to remove from the client
   */
  export function package_remove(name: string): void;

  /**
   * Runs a Nexus function type reflex.
   *
   * @param functionName Name of the function to call
   * @param args The argument to hand to the called function
   * @param packageName The package to call the function in. Use the special value 'ALL' to call in all packages.
   */
  export function run_function(functionName: string, args: unknown | undefined, packageName: string): void;
}