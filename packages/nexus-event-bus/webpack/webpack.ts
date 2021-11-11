// Webpack entrypoint.
// Use this to do any browser specific initialization and export the module as global object.

import { EventBus } from "../src/index"

console.log('loading event bus...')

const eventBus = new EventBus();

eventBus.subscribe('onGMCP', async (argument: {gmcp_method: string, gmcp_args: unknown}) => {
    await eventBus.raise(argument.gmcp_method, argument.gmcp_args);
})

export default eventBus;

console.log('event bus loaded.')