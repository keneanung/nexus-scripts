# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.2.1](https://github.com/keneanung/nexus-scripts/compare/@keneanung/nexus-simplified-scripting-converter@0.2.0...@keneanung/nexus-simplified-scripting-converter@0.2.1) (2023-08-11)

### Bug Fixes

- **nexus-simplified-scripting-converter:** :bug: allow running jsrender in browser ([6e663db](https://github.com/keneanung/nexus-scripts/commit/6e663dbfab81674516cced1be50ab6ed460c79d0))

# [0.2.0](https://github.com/keneanung/nexus-scripts/compare/@keneanung/nexus-simplified-scripting-converter@0.1.0...@keneanung/nexus-simplified-scripting-converter@0.2.0) (2023-08-10)

### Bug Fixes

- :bug: fix typo which caused command actions to not actually send ([b58487b](https://github.com/keneanung/nexus-scripts/commit/b58487bb2eb299cf793f64a927ea0da15a84b91f))
- **nexus-simplified-scripting-converter:** :bug: fix generated code for variable action with valtype variable ([f887894](https://github.com/keneanung/nexus-scripts/commit/f887894e27b840df84079ac9bce8dfe3aefd5378))

### Features

- :sparkles: add conversion of command actions ([79d0ab9](https://github.com/keneanung/nexus-scripts/commit/79d0ab9be9c613696d89086a09b148619db23630))
- :sparkles: add handling of disable actions ([3c94be0](https://github.com/keneanung/nexus-scripts/commit/3c94be0ba060f9e52e304d1e496ffab4f6e2603b))
- :sparkles: add handling of enable action ([56cb035](https://github.com/keneanung/nexus-scripts/commit/56cb0359c58761db8c8dd47451f1b4d31d14e79c))
- :sparkles: scope script actions to avoid name conflicts in multiple scripts ([383396a](https://github.com/keneanung/nexus-scripts/commit/383396a670ade53034537d40f50e60a8d10050f4))
- **nexus-simplified-scripting-converter:** :sparkles: add ability to convert gag actions ([b4d86d1](https://github.com/keneanung/nexus-scripts/commit/b4d86d1cd5673718375856d8e3740268e74e64fb))
- **nexus-simplified-scripting-converter:** :sparkles: add ability to convert variable actions ([cfcae12](https://github.com/keneanung/nexus-scripts/commit/cfcae1227135437afd60394dcd584e70a2a2eeb2))
- **nexus-simplified-scripting-converter:** :sparkles: add comment containing action type and index before each converted action ([36ac36c](https://github.com/keneanung/nexus-scripts/commit/36ac36cf5b8e539864a796eef42a324c52e4eb14))
- **nexus-simplified-scripting-converter:** :sparkles: add disableme action conversion ([4e0fc05](https://github.com/keneanung/nexus-scripts/commit/4e0fc05361b4bc28fd9a783d98f58d35e962bcf9))
- **nexus-simplified-scripting-converter:** :sparkles: add handling of notify actions ([9979605](https://github.com/keneanung/nexus-scripts/commit/9979605f96bec1869dca9cff749306390865e7a7))
- **nexus-simplified-scripting-converter:** :sparkles: add processing of button actions ([ce41d69](https://github.com/keneanung/nexus-scripts/commit/ce41d692f017a5511dac88a1d7b151b66198a6cf))
- **nexus-simplified-scripting-converter:** :sparkles: add sound action conversion ([6dc4f39](https://github.com/keneanung/nexus-scripts/commit/6dc4f39e4f3a7ab26ee5803cbb185187f8ab4863))
- **nexus-simplified-scripting-converter:** :sparkles: add stop action ([56df800](https://github.com/keneanung/nexus-scripts/commit/56df80082956976beb75c501cab421015016add3))
- **nexus-simplified-scripting-converter:** :sparkles: addd processing of highlight actions ([cb4c8b5](https://github.com/keneanung/nexus-scripts/commit/cb4c8b5b9862f81c131cb3e49d43534355c92c1b))
- **nexus-simplified-scripting-converter:** :sparkles: run beautifyer on generated code ([ee9fff8](https://github.com/keneanung/nexus-scripts/commit/ee9fff872198e1220f56418e8d632d6a7880db47))
- **nexus-simplified-scripting-converter:** :white_check_mark: add infrastructure to test real world examples ([c32bc8d](https://github.com/keneanung/nexus-scripts/commit/c32bc8d55a3d99f58fac5ce43f5ecff18b4e7157))
- **nexus-simplified-scripting-converter:** add desktop notification translation ([74b3e9a](https://github.com/keneanung/nexus-scripts/commit/74b3e9af7c4712a1aafa0ddf1e2e1c8a56e9a96d))
- **nexus-simplified-scripting-converter:** Create numpad_movement.json ([888a00d](https://github.com/keneanung/nexus-scripts/commit/888a00d58ed3a0e12df616fb953267e97857a9d2))
- **nexus-simplified-scripting-converter:** overwrite existing action with converted script ([4529303](https://github.com/keneanung/nexus-scripts/commit/45293034d7546ba5896050c54a632a3066e51499))

# 0.1.0 (2023-07-17)

### Bug Fixes

- **nexus-simplified-scripting-converter:** change import required due to typing fixes ([7c20e8f](https://github.com/keneanung/nexus-scripts/commit/7c20e8fe4bf2b61393dc5f2adf68077272fc31da))

### Features

- :tada: start new project to convert simplified scripting to javascript ([99a01b6](https://github.com/keneanung/nexus-scripts/commit/99a01b69851e21ec0517a7378de98de1f41eaab9))
