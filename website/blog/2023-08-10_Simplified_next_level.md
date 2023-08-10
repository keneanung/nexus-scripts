---
authors: keneanung
tags: 
  - typings
  - package-builder
  - simplified-scripting-converter
  - release-notes
---
# Taking Simplified Scripting to the Next Level

There has been a lot of discussion on Simplified Scripting in Nexus 3, especially on the Nexus Discord channel.

On the one hand, simplified scripting is useful for people who are not used to coding. They are not overwhelmed by an empty box and infinite amount of possibilities to do something wrong. Instead, they are presented with a slimmed down list of options that they can use and can fully concentrate on the "what" they want to do and most of the "how" is abstracted away. It gets them in the mindset of algorithmical thinking while not making them think about syntax and formal language.

But once they want to break outside the box of Simplified Scripting and the limited actions that are supported, some users have already created complex systems. They now need to convert that to traditional JavaScript, which can be a tedious and daunting process. Additionally, they need to learn coding syntax and formal language and look up the Nexus API for the same things they had already made.

## Introducing a Converter

Since Simplified Scripting can be understood as an interpreted scripting language of sorts, it can also be converter (or transpiled) into actual JavaScript code.

While the resulting code is often overly complex (not all information, whether steps like variable expansion are needed, is available at transpilation time), it can serve as a good starting point to learn syntax and explore the Nexus API.

This release features the first version of a library that can do such conversions. It is not yet feature complete and misses transpilation support for more complex actions that require context (eg Goto, If, Repeat, Label) or rewrite the MUD output. But it is complete enough to convert simpler packages. Additionally, the release unblocks the development of its [dependent project](https://keneanung.github.io/nssc/) (see the [GitHub project](https://github.com/keneanung/nssc/) as well), a website that allows converting existing packages to a pure script version, compare these versions, and download the results.

## Steps forward

I try to bring both the converter library and the NSSC forward in an even pace. However, if you have ideas that can improve either projects, please contact me in the Nexus Discord. I also welcome contributions to all my projects, but especially help in these two of my current focus areas would be greatly appreciated.

## What else?

During the development, I noticed that some of the newer actions were missing from both the typings and the package builder. These projects were extended to include the new possibilities.

If you like the project, please consider leaving a star on the [GitHub project](https://github.com/keneanung/nexus-scripts) and [sponsoring me](https://github.com/sponsors/keneanung).