# Using the event bus as an internal dependency for events #

Using the event bus as an internal dependency is relatively straight forward. First install the package (ie using the command line):

```bash
npm install @keneanung/nexus-event-bus
```

Then you can instantiate and use the event bus:

```js
import { EventBus } from '@keneanung/nexus-event-bus';

const eventBus = new EventBus();
eventBus.subscribe('*', () => console.log('foo'));
```
