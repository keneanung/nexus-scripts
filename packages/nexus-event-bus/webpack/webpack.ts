// Webpack entrypoint.
// Use this to do any browser specific initialization and export the module as global object.

import { Greeter } from "../src/index"

console.log(Greeter("world"));

export {
    Greeter
};