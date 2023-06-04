# Iron Realms Nexus Event Bus #

An implementation of the [publish-subscriber pattern](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) at its core.

## Installation ##

To install the package, first download it to your machine via [this link](https://keneanung.github.io/nexus-event-bus/EventBus.nxs).

You can then proceed to install it as a normal package into your Nexus profile. You may have to log in and out after installing the package.

## Basic Usage ##

When the package is installed, you can use it in any `script` reflex. First you will need to subscribe to an event.

```js
eventBus.subscribe('myEvent', (data) => {
  console.log(data);
});
```

To raise an event, you can use the `raise` method.

```js
eventBus.raise('myEvent', 'Hello World!');
```

This will print `Hello World!` to the console.

For documentation on the inidividual methods, advanced usage and some best practices, see the [Nexus Event Bus documentation](https://keneanung.github.io/nexus-event-bus/docs/).
