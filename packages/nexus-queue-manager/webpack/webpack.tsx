// Webpack entrypoint.
// Use this to do any browser specific initialization and export the module as global object.

import { QueueManager } from '../src';
console.log('loading Queue Manager version [AIV]{version}[/AIV]...');
const queueManager = new QueueManager();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
globalThis.queueManager = queueManager;


console.log('Queue Manager loaded');

export default QueueManager;