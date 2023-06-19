---
id: index
sidebar_position: 5
---

# Nexus Queue Manager #

Welcome to the documentation of the Queue Manager package for the IRE Nexus client.

The package tracks the content of the in-game balance queue and allows the user to integrate client-side queueing with it.

There are multiple problems with the in-game queue this project aims to tackle:

- All queued actions that share balances are run at the same time, whether they consume a balance (and block following actions) or not
- Requeueing repeating actions is not automatic
- Custom queue names are not very readable
- Integration with externally queued commands needs coordination through parsing game text. This package centralizes that.

:::caution

**CAUTION**: The manager tries to stay out-of-the way and integrate painlessly with other external queue item sources. However, there might be conflicts these different sources and their expectations about how they can manage the individual items in the queue.

:::

This documentation describes the usage of the package and offers some best practices to look out for.
