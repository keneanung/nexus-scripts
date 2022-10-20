import React, { useState } from 'react';
import { IPackageManager } from '../lib/PackageManager';

const getInstalledPackages = (packageManager: IPackageManager) => {
  return packageManager.getRepositoryData().reduce<{ [name: string]: boolean }>((packages, entry) => {
    packages[entry.packageName] = packageManager.isInstalled(entry.packageName);
    return packages;
  }, {});
};

/**
 * Functional component that is the root element of the package manager UI.
 *
 * @param {{packageManager: IPackageManager}} props The component's properties.
 * @param {IPackageManager} props.packageManager The package manager to use.
 * @returns {React.Fragment} The component.
 */
export function PackageManagerUi({ packageManager }: { packageManager: IPackageManager }) {
  const [repositoryData, setRepositoryData] = useState(packageManager.getRepositoryData());
  const [updating, setUpdating] = useState(false);
  const [installedPackages, setInstalledPackages] = useState(getInstalledPackages(packageManager));
  packageManager.onUpdateFinished((data) => {
    setRepositoryData(data);
    setUpdating(false);
    setInstalledPackages(getInstalledPackages(packageManager));
  });
  packageManager.onPackageOperationDone((operation, packageName) => {
    let installedState = installedPackages[packageName];
    if (operation === 'install') {
      installedState = true;
    } else if (operation === 'uninstall') {
      installedState = false;
    }
    setInstalledPackages({ ...installedPackages, [packageName]: installedState });
  });
  return (
    <>
      <button
        onClick={() => {
          setUpdating(true);
          packageManager.updateAsync();
        }}
        className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedSizeLarge MuiButton-sizeLarge"
        disabled={updating}
        id="package-listing-update"
      >
        Update package listing
      </button>
      <table id="package-listing">
        <thead>
          <tr id="package-listing-header">
            <td>Name</td>
            <td>Package Name</td>
            <td>Description</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody id="package-listing-body">
          {repositoryData.map((entry) => (
            <tr key={entry.packageName}>
              <td>{entry.name}</td>
              <td>{entry.packageName}</td>
              <td>{entry.description}</td>
              <td>
                {installedPackages[entry.packageName] ? (
                  <>
                    <button
                      onClick={() => {
                        packageManager.updatePackageAsync(entry.packageName);
                      }}
                      className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedSizeSmall MuiButton-sizeSmall"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        packageManager.uninstall(entry.packageName);
                      }}
                      className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedSizeSmall MuiButton-sizeSmall"
                    >
                      Uninstall
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      packageManager.installAsync(entry.packageName);
                    }}
                    className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedSizeSmall MuiButton-sizeSmall"
                  >
                    Install
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
