import {
  getPackageList,
  installNexusPackage,
  isNexusPackageInstalled,
  setPackageOrder,
  uninstallNexusPackage,
} from './nexusPackageInterface';
import { RepositoryData } from './RepositoryData';
import fetch from 'cross-fetch';

export class PackageManager implements IPackageManager {
  private repositoryData: RepositoryData = [];
  private updateCallbacks: ((data: RepositoryData) => void)[] = [];
  private packageOperationCallbacks: ((operation: string, packageName: string) => void)[] = [];

  constructor() {
    this.onPackageOperationDone(this.orderPackages);
  }

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
    const notInstalledDependencies = pkgEntry.dependencies.filter((entry) => !this.isInstalled(entry));
    for (const dependencyPackage of notInstalledDependencies) {
      await this.installAsync(dependencyPackage);
    }
    const response = await fetch(pkgEntry.url);
    const pkgJson = await response.json();

    installNexusPackage(pkgJson);
  };

  private internalUninstall = (packageName: string) => {
    uninstallNexusPackage(packageName);
  };

  private orderPackages = () => {
    const newOrder: nexusclient.ReflexPackage[] = [];
    const unresolved = new Set<string>();
    const packages = getPackageList();

    const createOrder = (currentPackage: nexusclient.ReflexPackage) => {
      const packageName = currentPackage.name;

      if (newOrder.find((entry) => entry.name == packageName)) {
        return;
      }

      const packageMetaData = this.repositoryData.find((entry) => entry.packageName == packageName);
      const dependencies = packageMetaData?.dependencies || [];
      unresolved.add(packageName);

      for (const dependencyName of dependencies) {
        const dependency = packages.find((entry) => entry.name == dependencyName);
        if (dependency == undefined) {
          throw new Error(`Unable to satisfy dependency ${dependencyName} of package ${packageName}`);
        }
        if (newOrder.find((entry) => entry.name == dependencyName) == undefined) {
          if (unresolved.has(dependencyName)) {
            throw new Error(`Circular dependency found: ${packageName} -> ${dependencyName}`);
          }
          createOrder(dependency);
        }
      }
      newOrder.push(currentPackage);
      unresolved.delete(packageName);
    };

    for (const pkg of packages) {
      createOrder(pkg);
    }
    setPackageOrder(newOrder);
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
