---
authors: keneanung
---

# Khasseems Wishlist: v0.1.1

This release is something, the Achaean Player Khaseem wished for. He's been using the original EventStream module of NexSys very extenively. However, he'd like to move to an external package to help the adoption of a standard set of Nexus packages.

The original EventStream had a set of features that were part of his development flow: The ability to unsubscribe from events using a function name and access to the list of subscribers to an event.

While the former is about a preferred coding style, the latter is useful for debugging code: That way you can easily have a look at the list of subscribers to an event and determine if all subscribers actually belong there at this point.

## New Features

You may now subscribe or unsubscribe to events using a callback function name instead of a function reference. To avoid accidental overwriting of existing callbacks, especially between different users of the EventBus, duplicate subscription names generate an error. So you may want to namespace your event names.

You can now access the list of subscribers to an event using the `getSubscribers` method. This allows easy inspection of the subscription state of callbacks. The subscribers may not be changed this way.
