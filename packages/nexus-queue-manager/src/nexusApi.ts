/**
 * Wrapper function for the send_commands function of the nexus client. This makes testing possible.
 * @param {string} command The command to send.
 */
export const sendCommand = (command: string) => {
  nexusclient.send_commands(command, false);
};
