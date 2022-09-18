import { installNexusPackage } from "./installNexusPackage";
import { RepositoryData } from "./RepositoryData";

export class PackageManager{

  private repositoryData: RepositoryData = [];

  public updateAsync = async () => {
    const response = await fetch('https://keneanung.github.io/nexus-package-repository/repository.json');
    this.repositoryData = await response.json();
  }

  public getRepositoryData = () => this.repositoryData;
  public installAsync = async (packageName: string) => {
    const pkgEntry = this.repositoryData.find(entry => entry.packageName === packageName);
    if(!pkgEntry){
      throw new Error("");

    }
    const response = await fetch(pkgEntry.url);
    const pkgJson = await response.json();

    installNexusPackage(pkgJson);
  }
}
