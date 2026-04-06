import * as fs from 'fs';
import * as path from 'path';
import { PackageFile } from './types';

/**
 * Interface for return values of functions in this module.
 */
export interface ReturnValue {
  /**
   * The operation result.
   */
  result: boolean;

  /**
   * If the operation was unsuccessful, this property contains an error message.
   */
  errorMessage?: string;
}

/**
 * Checks, whether the given package file is a usable file.
 * @param {string} absolutePackageFilePath The (absolute) path to the package file.
 * @returns {ReturnValue} The result key contains the success of the operation. If false, errorMessage contains an error message.
 */
export const checkPackageFile = (absolutePackageFilePath: string): ReturnValue => {
  if (!fs.existsSync(absolutePackageFilePath)) {
    return {
      result: false,
      errorMessage: `Package file '${absolutePackageFilePath}' does not exist.`,
    };
  }
  if (!fs.statSync(absolutePackageFilePath).isFile()) {
    return { result: false, errorMessage: `Input path '${absolutePackageFilePath}' is not a file.` };
  }
  return { result: true };
};

/**
 * Checks, whether the given output path is a usable directory. It creates the directory if it does not exist.
 * @param {string} absoluteOutputDirPath The (absolute) path of the output directory.
 * @returns {ReturnValue} The result key contains the success of the operation. If false, errorMessage contains an error message.
 */
export const prepareOutputDirectory = (absoluteOutputDirPath: string): ReturnValue => {
  if (!fs.existsSync(absoluteOutputDirPath)) {
    fs.mkdirSync(absoluteOutputDirPath, { recursive: true });
  }
  if (fs.statSync(absoluteOutputDirPath).isFile()) {
    return { result: false, errorMessage: `Output directory '${absoluteOutputDirPath}' is a file.` };
  }
  return { result: true };
};

/**
 * Reads the package file and returns its content as an object.
 * @param {string} absolutePackageFilePath The (absolute) path to the package file.
 * @returns {PackageFile} The parsed package file.
 */
export const readPackageFile = (absolutePackageFilePath: string): PackageFile => {
  const fileContent = fs.readFileSync(absolutePackageFilePath, 'utf-8');
  return JSON.parse(fileContent) as PackageFile;
};

/**
 * Writes the given YAML content to the given file path.
 * @param {string} yamlContent The YAML document to write to disk.
 * @param {string} outputPath The file name to write the content to.
 */
export const writePackageDefinition = (yamlContent: string, outputPath: string) => {
  fs.writeFileSync(outputPath, yamlContent);
};

/**
 * Writes an extracted code file to disk.
 * @param {string} content The file content.
 * @param {string} outputPath The absolute output path.
 */
export const writeSplitFile = (content: string, outputPath: string) => {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content);
};
