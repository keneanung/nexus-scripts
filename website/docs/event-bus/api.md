---
sidebar_position: 4
id: api
---
# API #

## `eventBus.subscribe(event, callback, [callbackName], [overwrite])` ##

### Arguments ###

**event**: `string` - The name of the event to subscribe to.

**callback**: `async function(object): void` - The callback to call when the event is fired. The callback will retrieve the event data. It is called as a async function.

**callbackName**: `string`, optional - The name of the callback. If not provided, a random name will be generated.

**overwrite**: `boolean`, optional - If true, the callback will overwrite any existing callback with the same name. If false, the callback will only be added if there is no existing callback with the same name. An Error will be thrown if there is an existing callback with the same name and overwrite is false.

### Description ###

Adds the given function as a subscriber to the given event so it will be called  when the event is raised. The callback will be called as a async function, which means it may contain the `await` keyword.

You may use the special event name `*` to subscribe to all events.

### Examples ###

```js
eventBus.subscribe("test", function(data) {
    console.log("test event fired");
    console.log(data);
});
```

```js
eventBus.subscribe("test", (data) => {
    console.log("test event fired");
    console.log(data);
});
```

```js
eventBus.subscribe("test", (data) => {
    console.log("test event fired");
    console.log(data);
}, "myCallback");
```

```js
const myVerySpecialFunction = (data) => {
    console.log("test event fired");
    console.log(data);
}

eventBus.subscribe("test", myVerySpecialFunction, myVerySpecialFunction.name);
```

```js
eventBus.subscribe("test", (data) => {
    console.log("test event fired");
    console.log(data);
}, "myCallback");

eventBus.subscribe("test", (data) => {
    console.log("test event fired");
    console.log(data);
}, "myCallback"); // Error
```

```js
eventBus.subscribe("test", (data) => {
    console.log("test event fired");
    console.log(data);
}, "myCallback");

eventBus.subscribe("test", (data) => {
    console.log("test event fired");
    console.log(data);
}, "myCallback", true); // works
```

```js
eventBus.subscribe("sawPlayer", async (name) => {
    const response = await fetch(`https://api.achaea.com/characters/${name}.json`);
    const json = await response.json();
    console.log(json.fullname);
});
```

```js
eventBus.subscribe("*", (data) => {
    console.log('Got an event with data:');
    console.log(data);
});
```

## `eventBus.raise(event, [data])` ##

### Arguments ###

**event**: `string` - The name of the event to raise.

**data**: `object`, optional - The data to pass to the subscribers.

### Description ###

Raises the event with the given name and calls all subscribed callbacks. The callbacks receive the given data as their argument.

*Note*: This is an async function. If you want to wait for all events to have been raised before continuing the execution of your code, use `await eventBus.raise(event)` in external JavaScript. If you call this in a Nexus script directly, `await` can't be used and you must use Promises explicitly, see examples.

### Examples ###

```js
eventBus.raise("test", "This is a test string");
```

```js
eventBus.raise("test", {
  content: "I have some nested data"
});
```

```js
const name = 'Keneanung';
eventBus.raise("sawPlayer", name);
```

```js
// Use this pattern inside Nexus scripts
eventBus.raise("test", "TestArgument").then(() => {
    console.log("after all callbacks have run");
});
console.log("some time (non-deterministic, might be during the callback runs)");
```

## `eventBus.unsubscribe(event, callback)` ##

### Arguments ###

**event**: `string` - The name of the event to subscribe to.

**callback**: `async function(object): void` or `string` - The callback to remove from the list of functions that are called when the event is called. If a string is provided, it is assumed to be the name of the callback to remove instead.

### Description ###

Removes the given function as a subscriber to the given event so it will not be called anymore when the event is raised. This has to be the same reference as the one given to `eventBus.subscribe`. If you do not want to keep the reference around, use the name of the callback instead.

To unsubscribe from the "all events" list, use the special event name `*`.

### Examples ###

```js
function testFunction(data) {
    console.log("test event fired");
    console.log(data);
}

eventBus.subscribe("test", testFunction);
eventBus.unsubscribe("test", testFunction);
```

```js
function testFunction(data) {
    console.log("test event fired");
    console.log(data);
}

eventBus.subscribe("test", testFunction, 'testFunction');
eventBus.unsubscribe("test", 'testFunction');
```

```js
const defence = {
  dragon: () => {
    console.log("I'm a bulky dragon and I block everything.");
  },
  rajamalan: () => {
    console.log("I'm a quick rajamalan and I evade everything.");
  },
  none: () => {
    console.log("I'm a normal person and I can't defend.");
  }
}

eventBus.subscribe("raceChange", (raceChangeData) => {
  eventBus.subscribe("defend", defence[raceChangeData.newRace]);
  eventBus.unsubscribe("defend", defence[raceChangeData.oldRace]);
});
```

## `eventBus.getSubscribers(eventName)` ##

### Arguments ###

**eventName**: `string` - The name of the event to get the subscribers for.

### Return value ###

An array of objects in the form of `{callback: async function(object): void, callbackName: string}`. The callback value is the actual callback function that is registered. The callbackName is the name of the callback that was given to `eventBus.subscribe`.

### Description ###

Use this function to retrieve all subscribed callbacks for the given event. The returned array is a copy of the internal data, so modifying it will not affect the internal array.

The array will contain the callbacks subscribed directly to the event as well as callbacks subscribed to the "all events" list.

### Examples ###

```js
function testFunction(data) {
    console.log("test event fired");
    console.log(data);
}

eventBus.subscribe("test", testFunction);
eventBus.getSubscribers("test");
// returns [{callback: testFunction, callbackName: <some random string>}]
```
