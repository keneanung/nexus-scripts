import { ReflexPackages, Reflexes, Interface, NexusPlatform } from './Nexus3';
import { Package } from './Reflexes';
declare global {
  /**
   * Alias for the global window object in Nexus 2. While optional, prepending functions with
   * client makes it explicit that you interact with Nexus 2.
   */
  namespace client {
    /**
     * Send a command to the game.
     * @param {string} input Text to send to the game
     * @param {boolean?} no_expansion Set to `true` to send the exact string to the game without expansion
     */
    export function send_command(input: string, no_expansion?: boolean): void;

    /**
     * Display text on the output screen
     * @param {string} text Text to display on the output screen
     * @param {string?} fgcolor Foreground color of the text
     * @param {string?} bgcolor Background color of the text
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
     * @param {string} name Name of the package to remove from the client
     */
    export function package_remove(name: string): void;

    /**
     * Runs a Nexus function type reflex.
     * @param {string} functionName Name of the function to call
     * @param {unknown|undefined} args The argument to hand to the called function
     * @param {string} packageName The package to call the function in. Use the special value 'ALL' to call in all packages.
     */
    export function run_function(functionName: string, args: unknown | undefined, packageName: string): void;
  }

  namespace nexusclient {
    export function packages(): ReflexPackages;
    export function reflexes(): Reflexes;
    export function send_commands(input: string, no_expansion?: boolean): boolean | undefined;
    export function display_notice(...params: string[]): void;
    export function ui(): Interface;
    export function platform(): NexusPlatform;
  }
}
