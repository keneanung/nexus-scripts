import { installNexusPackage, isNexusPackageInstalled, uninstallNexusPackage } from './nexusPackageInterface';
import { RepositoryData } from './RepositoryData';
import fetch from 'cross-fetch';

export class PackageManager implements IPackageManager {
  private repositoryData: RepositoryData = [];
  private updateCallbacks: ((data: RepositoryData) => void)[] = [];
  private packageOperationCallbacks: ((operation: string, packageName: string) => void)[] = [];

  public updateAsync = async () => {
    const response = await fetch('https://keneanung.github.io/nexus-package-repository/repository.json');
    this.repositoryData = await response.json();
    for (const callback of this.updateCallbacks) {
      try {
        callback(this.repositoryData);
      } catch (error) {
        console.error('Error running update callback function', error);
      }
    }
  };

  public getRepositoryData = () => this.repositoryData;

  public installAsync = async (packageName: string) => {
    await this.internalInstallAsync(packageName);
    this.runPackageOperationCallbacks('install', packageName);
  };

  public onUpdateFinished = (callback: (data: RepositoryData) => void) => {
    this.updateCallbacks.push(callback);
  };

  public isInstalled = (packageName: string) => {
    return isNexusPackageInstalled(packageName);
  };

  public uninstall = (packageName: string) => {
    this.internalUninstall(packageName);
    this.runPackageOperationCallbacks('uninstall', packageName);
  };

  public updatePackageAsync = async (packageName: string) => {
    this.internalUninstall(packageName);
    await this.internalInstallAsync(packageName);
    this.runPackageOperationCallbacks('update', packageName);
  };

  public onPackageOperationDone = (callback: (operationName: string, packageName: string) => void) => {
    this.packageOperationCallbacks.push(callback);
  };

  private runPackageOperationCallbacks = (operation: string, packageName: string) => {
    for (const callback of this.packageOperationCallbacks) {
      try {
        callback(operation, packageName);
      } catch (error) {
        console.error('Error running package operation callback function', error);
      }
    }
  };

  private internalInstallAsync = async (packageName: string) => {
    const pkgEntry = this.repositoryData.find((entry) => entry.packageName === packageName);
    if (!pkgEntry) {
      throw new Error(`Package ${packageName} not found`);
    }
    const response = await fetch(pkgEntry.url);
    const pkgJson = await response.json();

    installNexusPackage(pkgJson);
  };

  private internalUninstall = (packageName: string) => {
    uninstallNexusPackage(packageName);
  };
}

export interface IPackageManager {
  updateAsync: () => Promise<void>;
  getRepositoryData: () => RepositoryData;
  installAsync: (packageName: string) => Promise<void>;
  onUpdateFinished: (callback: (data: RepositoryData) => void) => void;
  isInstalled: (packageName: string) => boolean;
  uninstall: (packageName: string) => void;
  updatePackageAsync: (packageName: string) => Promise<void>;
  onPackageOperationDone: (callback: (operationName: string, packageName: string) => void) => void;
}
