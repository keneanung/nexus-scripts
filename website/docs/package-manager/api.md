# API

The package manager includes a public API which can be used to interact with it.

## `packageManager.updateAsync`

Signature: `packageManager.updateAsync(): Promise<void>`

Updates the package listing of available packages.

## `packageManager.getRepositoryData`

Signature: `packageManager.getRepositoryData(): PackageEntry[]`

Returns the cached data of available packages.

## `packageManager.install`

Signature: `packageManager.installAsync(name: string): Promise<void>`

Installs a package with the given package name. Throws an exception if the package name is not know.

## `packagemanager.uninstall`

Signature: `packageManager.uninstall(name: string): void`

Uninstalls a package with the given package name.

## `packageManager.isInstalled`

Signature: `packageManager.isInstalled(name: string): boolean`

Returns whether a package is installed or not. This also returns packages with the same name that were not installed by the package manager.

## `packageManager.onUpdateFinished`

Signature: `packageManager.onUpdateFinished(callback: (data: PackageEntry[]) => void)): void`

Registers a callback function that will be called whenever the update of the package listing data finishes. The callback receives the new data as first argument.

## `packageManager.onPackageOperationDone`

Signature: `packageManager.onPackageOperationDone(callback: (operationName: boolean, packageName: string) => void): void`

Registers a callback function that will be called whenever a package operation finishes. These operations can be `install`, `uninstall`, or `update` and are given as the first argument. The second argument is the package name, that was modified.
