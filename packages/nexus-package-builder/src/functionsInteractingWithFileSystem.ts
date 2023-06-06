import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';
import { PartialPackage } from './types';

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
 * Checks, whether the given package definition file is a usable file.
 *
 * @param {string} absolutePackageDefinitionPath The (absolute) path to the package definition file.
 * @returns {ReturnValue} The result key contains the success of the operation. If false, errorMessage contains an error message.
 */
export const checkPackageDefinitionFile = (absolutePackageDefinitionPath: string): ReturnValue => {
  if (!fs.existsSync(absolutePackageDefinitionPath)) {
    return {
      result: false,
      errorMessage: `Package definition file '${absolutePackageDefinitionPath}' does not exist.`,
    };
  }
  if (!fs.statSync(absolutePackageDefinitionPath).isFile()) {
    return { result: false, errorMessage: `Input path '${absolutePackageDefinitionPath}' is not a file.` };
  }
  return { result: true };
};

/**
 * Checks, whether the given output path is a usable director. It creates the directory if it does not exist.
 *
 * @param {string} absoluteOutputDirPath The (absolute) path of the output directory.
 * @returns {ReturnValue} The result key contains the success of the operation. If false, errorMessage contains an error message.
 */
export const prepareOutputDirectory = (absoluteOutputDirPath: string): ReturnValue => {
  if (!fs.existsSync(absoluteOutputDirPath)) {
    fs.mkdirSync(absoluteOutputDirPath);
  }
  if (fs.statSync(absoluteOutputDirPath).isFile()) {
    return { result: false, errorMessage: `Output directory '${absoluteOutputDirPath}' is a file.` };
  }
  return { result: true };
};

/**
 * Reads the package definition file and returns its content as an object.
 *
 * @param {string} absolutePackageDefinitionPath The (absolute) path to the package definition file.
 * @returns {PartialPackage} A partial package definition.
 */
export const readPackageDefinitionFile = (absolutePackageDefinitionPath: string): PartialPackage => {
  const fileContent = fs.readFileSync(absolutePackageDefinitionPath, 'utf-8');
  return yaml.load(fileContent) as PartialPackage;
};

/**
 * Reads a file relative to a package definition and returns its content.
 *
 * @param {string} relativeFilePath The path of the file to read, relative to the package definition file.
 * @param {string} absolutePackageDefinitionPath The absolute path to the package definition file.
 * @returns {string} The contents of the given file.
 */
export const readScriptFileRelativeToDefintion = (
  relativeFilePath: string,
  absolutePackageDefinitionPath: string,
): string => {
  const basePath = path.dirname(absolutePackageDefinitionPath);
  const absoluteFilePath = path.resolve(basePath, relativeFilePath);

  return fs.readFileSync(absoluteFilePath, 'utf-8');
};

/**
 * Writes the given content to the given file path to disk.
 *
 * @param {string} jsonContent The JSON document (string) to write to disk.
 * @param {string} outputPath The file name to write the content to.
 */
export const writePackageDefinition = (jsonContent: string, outputPath: string) => {
  fs.writeFileSync(outputPath, jsonContent);
};
