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

The generated output directory also includes a `package.json` that references `@keneanung/nexus-package-builder`, a `package` script, and the YAML schema comment for editor support.

## Working with the generated project ##

After splitting a package you can move into the output directory, install the builder dependency, edit the YAML and extracted source files, and rebuild the package:

```bash
cd ./output
npm install
npm run package
```

This will rebuild `eventbus.yaml` into `./dist/eventbus.nxs`.

If you prefer to run the builder manually instead of using the generated script, you can still do so with:

```bash
npx nexus-package-builder ./output/eventbus.yaml ./rebuilt
```
