---
id: basic_usage
sidebar_position: 2
---
# Basic Usage #

## Installation ##

The basic installation of the event bus is straight forward. [Download](https://keneanung.github.io/nexus-scripts/EventBus.nxs) the script and import it as a package into Nexus. Then log out and reload the tab before logging in again. That makes sure everything is loaded fresh.

If you want make sure that package is properly loaded, check the browser console for the following messages:

```
loading event bus version X.Y.Z...
event bus loaded.
```

## Using the event bus ##

To use the event bus in your code, access the global `eventBus` object:

```js
eventBus.subscribe("myEvent", (data) => {
    console.log(data);
});
```
