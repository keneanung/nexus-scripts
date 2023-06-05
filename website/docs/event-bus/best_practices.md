---
id: best_practices
sidebar_position: 6
---
# Best Practices #

## The use of anonymous or local functions ##

Use anonymous or local functions only, if you don't intend to unsibscribe them again as the function reference is lost after leaving the function. The following examples illustrate the problem:

```js
eventBus.subscribe('testEvent', () => {
  console.log('testEvent');
});

eventBus.unsubscribe('testEvent', () => {
  console.log('testEvent');
});

eventBus.raise('testEvent'); // prints 'testEvent'
```

```js
const sub = () => {
  const func = () => {
    console.log('testEvent');
  };
  eventBus.subscribe('testEvent', func);
}

const unsub = () => {
  const func = () => {
    console.log('testEvent');
  };
  eventBus.unsubscribe('testEvent', func);
}

sub();
unsub();
eventBus.raise('testEvent'); // prints 'testEvent'
```

To fix this, keep the function reference outside the local scope:

```js
const func = () => {
  console.log('testEvent');
};

const sub = () => {
  eventBus.subscribe('testEvent', func);
}

const unsub = () => {
  eventBus.unsubscribe('testEvent', func);
}

sub();
unsub();
eventBus.raise('testEvent'); // prints nothing
```

## One Shot Handlers ##

You can use local functions as one shot handlers like this:

```js
const func = () => {
  console.log('testEvent');
  eventBus.unsubscribe('testEvent', func);
};
eventBus.subscribe('testEvent', func);
eventBus.raise('testEvent'); // prints 'testEvent'
eventBus.raise('testEvent'); // prints nothing
```
