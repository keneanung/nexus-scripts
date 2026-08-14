# `@keneanung/nexus-simplified-scripting-converter`

Converts Nexus simplified-scripting actions into readable JavaScript intended to help users learn and migrate their reflexes.

## Usage

```js
const { convertPackage } = require('@keneanung/nexus-simplified-scripting-converter');

const diagnostics = convertPackage(pkg); // pkg is converted in place
for (const diagnostic of diagnostics) {
  console.warn(diagnostic.message);
}
```

`convertActions(actions, reflexName, reflexType)` returns only the generated script. Use
`convertActionsWithDiagnostics(...)` to receive both `script` and structured `diagnostics`.

The converter emits normal `if`, `for`, and `while` statements for structured control flow. Labels that cannot be removed cleanly become named functions. Backward jumps and control flow that crosses a `Wait For` action are called out with both structured warnings and comments in the generated code, because reproducing those cases exactly would make the result unsuitable as a teaching aid.
