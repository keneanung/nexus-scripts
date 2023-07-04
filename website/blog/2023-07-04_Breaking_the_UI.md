---
authors: keneanung
tags: 
  - typings
  - package-manager
  - release-notes
---
# Breaking the UI

Howdy! This release was brought to you by an unforseen change on the Nexus side, which caused external UI tabs to be saved with the settings. That in itself wouldn't be too bad if it didn't mean that critical information that made the tab an UI element was lost. So on restoring these UI elements, the whole UI would crash and all you were left with is a blank screen.

This release contains a workaround for the issue. Since the UI is already broken for most of you, the workaround I used to keep my packages was to log in via a mobile app (Android in my case, iOS should work as well, but not the browser!), gointo the settings, then `Custom Tabs` and remove the `npkg_ui` tab. If you then log into the webbrowser, the package manager should work on the browser and allow you to update the package manager with the workaround.

## Additional Changes

Since I was working with the webpack entrypoint anyways, I extended the Nexus typings by a few interfaces and functions to remove eslint and TypeScript magical comments.

If you like the project, please consider leaving a star on the [GitHub project](https://github.com/keneanung/nexus-scripts) and [sponsoring me](https://github.com/sponsors/keneanung).