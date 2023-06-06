#!/usr/bin/env node
import { Command } from 'commander';
import { createPackage } from './createPackage';
import { exit } from 'process';
import * as getPackageVersion from '@jsbits/get-package-version';

const program = new Command();
program
  .version(getPackageVersion())
  .option('-v, --packageVersion <version>', 'override the package version from the package definition file')
  .argument('<package-definition>', 'YAML file with the package definition.')
  .argument('<output-dir>', 'Output directory');

program.parse();

const result = createPackage(program.args[0], program.args[1], program.opts().packageVersion);
exit(result ? 0 : 1);
