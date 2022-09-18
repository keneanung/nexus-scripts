// Library and NPM package entrypoint. Export all publicly visible functions here.

/**
 * Returns a greeting for a given person.
 *
 * @param {string} name The name of the person you want to greet.
 * @returns {string} A greeting for the given person.
 */
export const Greeter = (name: string): string => `Hello ${name}`;
