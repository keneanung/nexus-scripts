import React, { useEffect, useState } from 'react';
import { IPackageManager } from '../lib/PackageManager';
import { PackageEntry, RepositoryData } from '../lib/RepositoryData';
import { SmallButton, LargeButton } from './Buttons';

const getInstalledPackages = (packageManager: IPackageManager) => {
  return packageManager.getRepositoryData().reduce<InstalledPackagesMap>((packages, entry) => {
    packages[entry.packageName] = packageManager.isInstalled(entry.packageName);
    return packages;
  }, {});
};

type InstalledPackagesMap = {
  [name: string]: boolean;
};

function PackageListRow({
  entry,
  installedPackages,
  packageManager,
}: {
  entry: PackageEntry;
  installedPackages: InstalledPackagesMap;
  packageManager: IPackageManager;
}) {
  return (
    <tr>
      <td>{entry.name}</td>
      <td>{entry.packageName}</td>
      <td>{entry.description}</td>
      <td>
        {installedPackages[entry.packageName] ? (
          <InstalledPackageButtons packageManager={packageManager} packageName={entry.packageName} />
        ) : (
          <NotInstalledPackageButtons packageManager={packageManager} packageName={entry.packageName} />
        )}
      </td>
    </tr>
  );
}

function NotInstalledPackageButtons({
  packageManager,
  packageName,
}: {
  packageManager: IPackageManager;
  packageName: string;
}) {
  return (
    <SmallButton
      onClick={() => {
        packageManager.installAsync(packageName);
      }}
      text="Install"
    />
  );
}

function InstalledPackageButtons({
  packageManager,
  packageName,
}: {
  packageManager: IPackageManager;
  packageName: string;
}) {
  return (
    <>
      <SmallButton
        onClick={() => {
          packageManager.updatePackageAsync(packageName);
        }}
        text="Update"
      />
      <SmallButton
        onClick={() => {
          packageManager.uninstall(packageName);
        }}
        text="Uninstall"
      />
    </>
  );
}

function PackageListing({
  installedPackages,
  packageManager,
  repositoryData,
}: {
  installedPackages: InstalledPackagesMap;
  packageManager: IPackageManager;
  repositoryData: RepositoryData;
}) {
  return (
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Package Name</td>
          <td>Description</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {repositoryData.map((entry) => (
          <PackageListRow
            entry={entry}
            installedPackages={installedPackages}
            packageManager={packageManager}
            key={entry.packageName}
          />
        ))}
      </tbody>
    </table>
  );
}

/**
 * Functional component that is the root element of the package manager UI.
 *
 * @param {{packageManager: IPackageManager}} props The component's properties.
 * @param {IPackageManager} props.packageManager The package manager to use.
 * @returns {React.Fragment} The component.
 */
export function PackageManagerUi({ packageManager }: { packageManager: IPackageManager }) {

  const [repositoryData, setRepositoryData] = useState(packageManager.getRepositoryData());
  const [installedPackages, setInstalledPackages] = useState(getInstalledPackages(packageManager));

  useEffect(() => {

    packageManager.onUpdateFinished((data) => {
      setRepositoryData(data);
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
  }, [packageManager]);

  return (
    <>
      <LargeButton
        onClick={() => {
          packageManager.updateAsync();
        }}
        text="Update package listing"
      />
      <PackageListing
        installedPackages={installedPackages}
        packageManager={packageManager}
        repositoryData={repositoryData}
      />
    </>
  );
}
