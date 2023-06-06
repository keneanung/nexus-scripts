// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export const sendCommand = (command: string) => {
  nexusclient.send_commands(command, false);
};
