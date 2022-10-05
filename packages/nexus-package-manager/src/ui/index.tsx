import React, { useState } from 'react';
import { PackageManager } from '../lib/PackageManager';

export function PackageManagerUi({ packageManager }: { packageManager: PackageManager }) {
  const [repositoryData, setRepositoryData] = useState(packageManager.getRepositoryData());
  const [updating, setUpdating] = useState(false);
  packageManager.onUpdateFinished((data) => {
    setRepositoryData(data);
    setUpdating(false);
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
      >
        Update package listing
      </button>
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
            <tr>
              <td>{entry.name}</td>
              <td>{entry.packageName}</td>
              <td>{entry.description}</td>
              <td>
                <button
                  onClick={() => {
                    packageManager.installAsync(entry.packageName);
                  }}
                  className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedSizeSmall MuiButton-sizeSmall"
                >
                  Install
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
