// Webpack entrypoint.
// Use this to do any browser specific initialization and export the module as global object.

import { EventBus } from "../src/index"

export default new EventBus();