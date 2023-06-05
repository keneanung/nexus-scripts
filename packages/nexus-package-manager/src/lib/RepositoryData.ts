export type RepositoryData = PackageEntry[];
export interface PackageEntry {
  name: string;
  packageName: string;
  description: string;
  url: string;
  dependencies: string[];
  website?: string;
  version: string;
}
