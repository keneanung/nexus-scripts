import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { splitPackage } from '../splitPackage';

const createTempDirectory = () => fs.mkdtempSync(path.join(os.tmpdir(), 'nexus-package-splitter-'));

const readYaml = (filePath: string) => yaml.load(fs.readFileSync(filePath, 'utf-8'));

const containsIdProperty = (value: unknown): boolean => {
  if (Array.isArray(value)) {
    return value.some(containsIdProperty);
  }
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).some(([key, childValue]) => key === 'id' || containsIdProperty(childValue));
  }
  return false;
};

describe('splitPackage', () => {
  test('Should split a package into builder-compatible YAML and extracted code files', () => {
    const workingDirectory = createTempDirectory();
    const inputFile = path.resolve(workingDirectory, 'sample.nxs');
    const outputDirectory = path.resolve(workingDirectory, 'output');
    const packageFile = {
      name: 'Sample Package',
      enabled: true,
      description: 'A test package',
      type: 'group',
      id: 1,
      version: '1.2.3',
      dependencies: ['dependency-one'],
      website: 'https://example.com/package',
      items: [
        {
          type: 'function',
          name: 'On Load',
          enabled: true,
          id: 2,
          code: 'console.log("loaded");',
        },
        {
          type: 'group',
          name: 'Nested Group',
          enabled: false,
          id: 3,
          items: [
            {
              type: 'alias',
              name: 'Say Hi',
              enabled: true,
              id: 4,
              matching: 'begins',
              whole_words: false,
              case_sensitive: false,
              prefix_suffix: false,
              text: 'hi',
              actions: [
                {
                  action: 'script',
                  script: 'console.log("hi");',
                },
                {
                  action: 'command',
                  command: 'say hi',
                  prefix_suffix: false,
                },
              ],
            },
          ],
        },
        {
          type: 'event',
          name: 'Vitals',
          enabled: true,
          id: 5,
          evtype: 'GMCP',
          evsubtype: 'Char.Vitals',
          actions: [
            {
              action: 'notification',
              heading: 'Vitals',
              text: 'Updated',
            },
          ],
        },
      ],
    };
    fs.writeFileSync(inputFile, JSON.stringify(packageFile));

    const result = splitPackage(inputFile, outputDirectory);

    expect(result).toBeTruthy();

    const yamlFilePath = path.resolve(outputDirectory, 'sample.yaml');
    const definition = readYaml(yamlFilePath);
    expect(definition).toEqual({
      name: 'Sample Package',
      enabled: true,
      description: 'A test package',
      type: 'group',
      version: '1.2.3',
      dependencies: ['dependency-one'],
      website: 'https://example.com/package',
      items: [
        {
          type: 'function',
          name: 'On Load',
          enabled: true,
          codeFile: './sample/items/0-function-on-load/code.js',
        },
        {
          type: 'group',
          name: 'Nested Group',
          enabled: false,
          items: [
            {
              type: 'alias',
              name: 'Say Hi',
              enabled: true,
              matching: 'begins',
              whole_words: false,
              case_sensitive: false,
              prefix_suffix: false,
              text: 'hi',
              actions: [
                {
                  action: 'script',
                  scriptFile: './sample/items/1-group-nested-group/0-alias-say-hi/action-0-script.js',
                },
                {
                  action: 'command',
                  command: 'say hi',
                  prefix_suffix: false,
                },
              ],
            },
          ],
        },
        {
          type: 'event',
          name: 'Vitals',
          enabled: true,
          evtype: 'GMCP',
          evsubtype: 'Char.Vitals',
          actions: [
            {
              action: 'notification',
              heading: 'Vitals',
              text: 'Updated',
            },
          ],
        },
      ],
    });
    expect(containsIdProperty(definition)).toBeFalsy();
    expect(fs.readFileSync(path.resolve(outputDirectory, 'sample/items/0-function-on-load/code.js'), 'utf-8')).toBe(
      'console.log("loaded");',
    );
    expect(
      fs.readFileSync(
        path.resolve(outputDirectory, 'sample/items/1-group-nested-group/0-alias-say-hi/action-0-script.js'),
        'utf-8',
      ),
    ).toBe('console.log("hi");');
  });

  test('Should return false and print an error for invalid JSON package files', () => {
    const workingDirectory = createTempDirectory();
    const inputFile = path.resolve(workingDirectory, 'broken.nxs');
    const outputDirectory = path.resolve(workingDirectory, 'output');
    const mockedConsole = jest.spyOn(global.console, 'log');
    mockedConsole.mockImplementation(() => undefined);
    fs.writeFileSync(inputFile, '{not valid json');

    const result = splitPackage(inputFile, outputDirectory);

    expect(result).toBeFalsy();
    expect(mockedConsole).toHaveBeenCalledWith(expect.stringContaining("could not be parsed"));

    mockedConsole.mockRestore();
  });
});
