---
authors: keneanung
tags: 
  - typings
  - release-notes
---
# What's Your Type?

![You have a type](https://media1.giphy.com/media/f16wgrNYaKkBcvOu5r/giphy.gif)

Part of what makes TypeScript so enjoyable for me is the ability for IDEs and tooling to check, whether functions, objects and properties you use actually exist.
However, since TypeScript is interoperable with the vast JavaScript ecosystem which doesn't support the type system out of the box, away to add the information is required.
Enter typings. This is a way to declare the typings of a JavaScript object through a number of helper files without adding functionality.

Since Nexus is written in plain JavaScript and doesn't publish any type information, the subproject `@keneanung/iron-realms-nexus-typings` was created. It is a ever expanding collection
of typings for the different Nexus APIs and classes it uses.

## The Problem

Writing the types itself is pretty straightforward since they mostly use standard TypeScript constructs. However, structuring them in a way that is logical and that makes the global
`nexusclient` object available, is hard 8for me). TypeScript by default supports Module syntaxes only. After some trial and error, I found a way to support both the monorepo usecase of this repository
as well as consuming the types in an external project like [nssc](https://keneanung.github.io/nssc/).

## What's Breaking?

Due to the restructuring, types for the different Nexus objects like Reflexes, Actions and so on now need to be imported like normal classes (eg. `import {Reflex} from '@keneanung/irong-realms-nexus-typings'`)
instead of using the `nexusclient` namespace. Functions like `ui()` or `send_commands()` on the namespace still work by siply using the namespace without any imports: `nexusclient.send_commands()`.

If you like the project, please consider leaving a star on the [GitHub project](https://github.com/keneanung/nexus-scripts) and [sponsoring me](https://github.com/sponsors/keneanung).
