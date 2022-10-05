import { installNexusPackage } from './installNexusPackage';
import { RepositoryData } from './RepositoryData';

export class PackageManager {
  private repositoryData: RepositoryData = [];
  private updateCallbacks: ((data: RepositoryData) => void)[] = [];

  public updateAsync = async () => {
    const response = await fetch('https://keneanung.github.io/nexus-package-repository/repository.json');
    this.repositoryData = await response.json();
    for (const callback of this.updateCallbacks) {
      try {
        callback(this.repositoryData);
      } catch (error) {
        console.error("Error running update callback function", error);
      }
    }
  };

  public getRepositoryData = () => this.repositoryData;

  public installAsync = async (packageName: string) => {
    const pkgEntry = this.repositoryData.find((entry) => entry.packageName === packageName);
    if (!pkgEntry) {
      throw new Error('');
    }
    const response = await fetch(pkgEntry.url);
    const pkgJson = await response.json();

    installNexusPackage(pkgJson);
  };

  public onUpdateFinished(callback: (data: RepositoryData) => void) {
    this.updateCallbacks.push(callback);
  }
}
