import * as client from '@keneanung/iron-realms-nexus-typings'
/**
 * Class for the stop action
 */
export class StopAction implements client.StopAction {
  action = 'stop' as const;
}
