# Package builder for Iron Realms Nexus #

This project is a package builder inspired by and similar in function to [`muddler`](https://github.com/demonnic/muddler) for Mudlet. It takes a package definition file that's better suited for humans than the original format and files that can be edited separately as input and creates a package file for the Nexus MUD client of Iron Realms.

## Usage ##

### Installation ###

```bash
npm install @keneanung/nexus-package-builder
```

### Running the tool ###

```bash
npx nexus-package-builder [-v <version>] <package-definition.yaml> <output-dir>
```

Examples:

```bash
npx nexus-package-builder input.yaml ./output
```

```bash
npx nexus-package-builder -v 1.2.0 input.yaml ./output
```

This command will convert the `yaml` file `input.yaml` to the package file `./output/input.nxs`.

## The yaml file schema ##

This is a sample yaml file with all fields:

<details>
<summary>Click here for sample yaml</summary>

```yaml
# yaml-language-server: $schema=./resources/nexus-schema.json
name: Package Name
description: This is the package description
enabled: true
type: group
version: 1.0.0
dependencies:
  - foo
  - bar
website: https://foo.com/bar
items:
  # function with inline code
  - name: functionName
    type: function
    code: console.log('hello world')
    enabled: true
  # function with external code file
  - name: anotherFunctionName
    type: function
    codeFile: ./codeFile.js
    enabled: true
  - name: alias
    type: alias
    case_sensitive: true
    enabled: true
    text: Alias text to match
    matching: begins # or exact or regexp
    prefix_suffix: true
    whole_words: true
    actions:
      # script with inline code
      - action: script
        script: console.log('hello from script')
      - action: script
        scriptFile: ./scriptFile.js
      - action: button
        buttonaction: command  # or default or highlight or unhighlight or label
        buttonid: '0'
        command: someCommandToRun
        label: labelToSet
      - action: command
        command: commandText
        prefix_suffix: true
      - action: disable
        name: thingToDisable
        type: alias # or event or trigger or group or keybind
      - action: disableme
      - action: enable
        name: thingToEnable
        type: alias # or event or trigger or group or keybind
      - action: function
        fn: functionToCall
      - action: goto
        label: labelToGoTo
      - action: if
        cond-type1: target # or value or variable
        cond-val1: value1
        cond-type2: target # or value or variable
        cond-val2: value2
        cond-op: starts # or ends or greater or smaller or eq
        cond-mod: not # or empty
        cond-cs: true
        dothen: continue # or jump or stop
        dothenlabel: labelToJumpTo
        doelse: continue # or jump or stop
        doelselabel: labelToJumpToElse
      - action: label
        label: labelName
      - action: notification
        heading: header for browser notification
        text: text of notification
      - action: notify
        notice: NoticeText
        notice_fg: red # any colour in HTML (so name or hex)
        notice_bg: red # any colour in HTML (so name or hex)
      - action: repeat
        cond-type1: target # or value or variable
        cond-val1: value1
        cond-type2: target # or value or variable
        cond-val2: value2
        cond-op: starts # or ends or greater or smaller or eq
        cond-mod: not # or empty
        cond-cs: true
        label: labelToJumpTo
        mode: count # or while
      - action: sound
        sound: urlToSoundToPlay
      - action: stop
      - action: variable
        op: add # or del or div or mul or set or sub
        valtype: target # or value or variable
        value: valueof the variable
        varname: name of the new variable
      - action: wait
        milliseconds: "0"
        seconds: "1"
      - action: waitfor
        text: text from the game to wait for
        matching: begins # or exact or regexp or substring
        case_sensitive: true
        expire: "10"
        whole_words: true
  - type: group
    name: group name
    enabled: true
    items:
      # list of reflexes (triggers, aliases, groups, keybinds, events)
  - type: event
    name: name of the event
    enabled: true
    evtype: GMCP
    evsubtype: Char.Afflictions.Add # or Char.Afflictions.Remove or Char.Vitals or Room.AddPlayer or Room.RemovePlayer or Char.Defences.Add or Char.Defences.Remove or IRE.Target.Set or Room.Info
    actions:
      # list of actions to run, see the alias
  - type: keybind
    enabled: true
    name: keybindName
    key: 0 # numerical ID for the key
    key_alt: true
    key_ctrl: true
    key_shift: true
    actions:
      # list of actions to run, see the alias
  - type: trigger
    name: triggername
    text: text to trigger
    enabled: true
    matching: begins # or exact or regexp or substring
    case_sensitive: true
    whole_words: true
    actions:
      # list of actions to run, see the alias
```

</details>

To ease the editing of `yaml` files, this package also includes a yaml schema file. Some editors can include it with the following comment at the top of the file:

```yaml
# yaml-language-server: $schema=.node_modules/@keneanung/nexus-package-builder/resources/nexus-schema.json
```

The only mandatory values for each item are `type` for reflexes and `action` for actions as those distinguish which fields are allowed. Default values will be used for missing fields.

**NOTE** You should not use most actions as they are part of the `simplified scripting`. If you are already writing code complex enough to warrant the use of external code files, stick to the actions `script` and possibly `function`.
