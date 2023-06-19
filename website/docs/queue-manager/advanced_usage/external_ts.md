# Using the queue manager in external TypeScript projects #

Using the queue manager in external TypeScript projects is slightly difficult as TypeScript does not know of the type for the global variable `queueManager`. Additionally, using the interface functions will make the tests fail as the global is not defined.

Solving the first issue is relatively straight forward as we need to `declare` the variable so TypeScript knows of it. First install the package `@keneanung/nexus-queue-manager` (i.e. through a terminal):

```bash
npm install @keneanung/nexus-queue-manager
```

Then add the following to the top of the `src/index.ts` file:

```typescript
import { IQueueManager } from "@keneanung/nexus-queue-manager";

declare global {
  // eslint-disable-next-line no-var
  var queueManager: IQueueManager
};
```

The `eslint-disable-next-line` is there to prevent the ESLint rule `no-var` from complaining about the global variable. But we need to declare it as `var` to be able to assign it in tests.

To make the tests work, the easiest way would be to install the npm package `jest-mock-extended` as a development dependency and use it like this:

```typescript
import { mock } from 'jest-mock-extended';
import { IQueueManager } from '@keneanung/nexus-queue-manager';

globalThis.queueManager = mock<IQueueManager>();
```

Now, the object exists with all functions implemented as `jest.fn()`s. Please refer to [the Jest documentation](https://jestjs.io/docs/mock-functions) on how to test interactions.
