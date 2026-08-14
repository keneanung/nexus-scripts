/**
 * Creates the minimal Nexus API mock used by generated-script tests.
 * @returns {object} The mock client and its variable store.
 */
export const makeNexus = () => {
  const values = new Map<string, unknown>();
  return {
    values,
    client: {
      send_commands: jest.fn(),
      display_notice: jest.fn(),
      variables: () => ({
        get: (name: string) => values.get(name),
        set: (name: string, value: unknown) => values.set(name, value),
        inc: (name: string, value: unknown) =>
          values.set(name, Number(values.get(name) ?? 0) + Number(value)),
        dec: jest.fn(),
        mul: jest.fn(),
        div: jest.fn(),
        del: (name: string) => values.delete(name),
        expand: (value: string) => value,
      }),
      datahandler: () => ({ current_target: () => 'rat' }),
    },
  };
};

/**
 * Executes generated Nexus JavaScript in a small function wrapper.
 * @param {string} script The generated JavaScript.
 * @param {object} nexusclient The Nexus API mock.
 * @param {RegExpExecArray} [args] Optional reflex match arguments.
 * @returns {unknown} The generated script's return value.
 */
export const runScript = (script: string, nexusclient: object, args?: RegExpExecArray) =>
  new Function('args', 'nexusclient', 'current_package', script)(args, nexusclient, 'TestPackage');
