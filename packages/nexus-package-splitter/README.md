# Package splitter for Iron Realms Nexus #

This package performs the inverse operation of `@keneanung/nexus-package-builder`: it takes a Nexus `.nxs` package file, splits embedded code into individual files, and creates a YAML definition that can be rebuilt with the package builder.

## Usage ##

### Installation ###

```bash
npm install @keneanung/nexus-package-splitter
```

### Running the tool ###

```bash
npx nexus-package-splitter <package.nxs> <output-dir>
```

Examples:

```bash
npx nexus-package-splitter ./eventbus.nxs ./output
```

This command will create `./output/eventbus.yaml` and write any extracted `codeFile`/`scriptFile` sources below `./output/eventbus/`.

The generated YAML is compatible with `@keneanung/nexus-package-builder`, so you can rebuild the package with:

```bash
npx nexus-package-builder ./output/eventbus.yaml ./rebuilt
```
