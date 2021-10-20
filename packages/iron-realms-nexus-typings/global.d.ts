// Type definitions for the Nexus MUD client
// Project: nexus-typings
// Definitions by: keneanung <keneanung@gmail.com>

declare function send_command(input: string, no_expansion: 0 | 1): void;
declare function display_notice(text: string, fgcolor: string, bgcolor: string): void;