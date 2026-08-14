import getPackageVersion from '@jsbits/get-package-version';

/**
 * Returns the version from this package's manifest.
 * @returns {string} The current package version
 */
export const getCurrentPackageVersion = () => getPackageVersion(__dirname);
