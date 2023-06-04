# Using the event bus in external TypeScript projects #

Using the event bus in external TypeScript projects is slightly difficult as TypeScript does not know of the type for the global variable `eventBus`. Additionally, using the interface functions will make the tests fail as the global is not defined.

Solving the first issue is relatively straight forward as we need to `declare` the variable so TypeScript knows of it. First install the package `@keneanung/nexus-event-bus` (i.e. through a terminal):

```bash
npm install @keneanung/nexus-event-bus
```

Then add the following to the top of the `src/index.ts` file:

```typescript
import { IEventBus } from "@keneanung/nexus-event-bus";

declare global {
  // eslint-disable-next-line no-var
  var eventBus: IEventBus
};
```

The `eslint-disable-next-line` is there to prevent the ESLint rule `no-var` from complaining about the global variable. But we need to declare it as `var` to be able to assign it in tests.

To make the tests work, the easiest way would be to install the npm package `jest-mock-extended` as a development dependency and use it like this:

```typescript
import { mock } from 'jest-mock-extended';
import { IEventBus } from '@keneanung/nexus-event-bus';

globalThis.eventBus = mock<IEventBus>();

test('My Greeter', () => {
  expect(Greeter('Carl')).toBe('');
});
```
