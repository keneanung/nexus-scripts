---
sidebar_position: 4
id: api
---
# API #

The queue manager has an API that is split in 2 parts: one for client side usage and one for tracking of game-queue events.

## Client Side Usage ##

### `getQueue()` ###

#### Return Value ####

`(QueuedItem | UnsyncedItem)[]` - The current queue

#### Description ####

Returns the current queue. Each item contains the keys `command`, `properties` with the individual balance settings, whether the command will be repeated and if it consumes balance (**Note**: all actions queued externally are assumed to consume balance).

If an action is only in the local queue, but not in the in-game queue yet, it will also have the key `queueing` (sent to the game, but not confirmed yet), while items in the in-game queue have the key `locallyControlled` to mark whether the queue manager added the command or not.

#### Examples ####

```js
queueManager.getQueue()
```

### `do(command, itemProperties, consumesBalance, [repeat])` ###

#### Arguments ####

**command**: `string` - The command to run

**itemProperties**: `object` - The balance requirements of the command. Each key denotes whether the balance must be available (`true`) or must be off-balance (`false`). Non-existing keys don't play a role:
  - `haveBalance`: physical balance
  - `haveEq`: equilibrium
  - `haveClassBalance`: class specific balance
  - `haveShipBalance`: ship command balance
  - `haveParalysis`: whether the paralysis affliction must be on the character
  - `beBound`: whether the character must be bound (writhe type afflicitions)
  - `beStanding`: whether the character must be upright (standing)
  - `beStunned`:  whether the character must be stunned

**consumesBalance**: `boolean` - Whether the command consumes the given balances. This helps the script to decide, whether it can queue multiple things at once.

**repeat**: `boolean`, optional - Whether the command should be requeued after it ran. **NOTE** This can potentially spam the game if commands that don't consume balances are requeued. Default is `false`.

#### Description ####

Queues a given command. The command will take care of allowed queue lengths, queueing only 1 command that consumes balance at a time and requeueing if needed.

It will also translate the readable queue properties into in-game balance requirements.

Commands are queued as-is and not translated or put into aliases.

#### Examples ####

```js
queueManager.do('sit', {
  haveBalance: true,
  haveEq: true,
  beStanding: true
}, false)
```

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

```js
queueManager.do('kill', {
  haveBalance: true,
  haveEq: true,
  beStanding: true,
  beBound: false,
  beStunned: false,
  haveParalysis: false
}, true, true);
```
### `undo(command)` ###

#### Arguments ####

**command**: `string` - The command to remove from the queue.

#### Return Value ####

`boolean` - Whether a command to remove was found.

#### Description ####

Removes a *locally controlled* command from the queue. These can be still in the local queue or already in the in-game queue. Repeating queued commands are also removed and not requeued.

Externally controlled commands are not touched.

#### Examples ####

```js
queueManager.do('sit', {
  haveBalance: true,
  haveEq: true,
  beStanding: true
}, false)

queueManager.undo('sit')
```

## Server Side Tracking ##

Due to not being intended for common use, these are documented in a short form.

- `track: (command: string, queue: string) => void` - Track addition of commands to the in-game queue.
- `clear: (queue: string) => void` - Track clearing of the queue. The special queue `all` clears it completely.
- `trackFirst: (command: string, queue: string) => void` - Track queueing actions as first element.
- `trackAt: (position: number, command: string, queue: string) => void` - Track queueing actions at a given position.
- `trackReplace: (position: number, command: string, queue: string) => void` - Track queueing actions replacing a given position.
- `trackRemove: (position: number) => void` - Track removing actions from the queue.
- `run: (command: string, queue: string) => void` - Track running a given command.
- `blocked: () => void` - Track an action getting blocked due to queue being full.
  
