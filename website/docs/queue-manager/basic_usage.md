---
id: basic_usage
sidebar_position: 2
---
# Basic Usage #

## Installation ##

The basic installation of the queue manager is straight forward. [Download](https://keneanung.github.io/nexus-scripts/queueManager.nxs) the script and import it as a package into Nexus. Then log out and reload the tab before logging in again. That makes sure everything is loaded fresh.

If you want make sure that package is properly loaded, check the browser console for the following messages:

```
loading Queue Manager version X.Y.Z...
Queue Manager loaded.
```

## Using the queue manager ##

To use the queue manager in your code, access the global `queueManager` object:

```js
queueManager.do('kill dummy', {
  haveBalance: true,
  haveEq: true,
  beStanding: true,
  beBound: false,
  beStunned: false,
  haveParalysis: false
}, true);
```
