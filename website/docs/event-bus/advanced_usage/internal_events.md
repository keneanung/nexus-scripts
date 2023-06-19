# Using the event bus as an internal dependency for events #

Using the event bus as an internal dependency is relatively straight forward. First install the package (ie using the command line):

```bash
npm install @keneanung/nexus-event-bus
```

To avoid webpack copying over the whole event bus package into the script, add the following to your webpack config:

```js
module.exports = {
  // ... most of your webpack config
  externals: {
    '@keneanung/nexus-event-bus': 'EventBus'
  },
  // ... rest of your config
}
```

Then you can instantiate and use the event bus:

```js
import { EventBus } from '@keneanung/nexus-event-bus';

const eventBus = new EventBus();
eventBus.subscribe('*', () => console.log('foo'));
```

