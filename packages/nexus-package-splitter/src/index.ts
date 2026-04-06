#!/usr/bin/env node
import { Command } from 'commander';
import { splitPackage } from './splitPackage';
import { exit } from 'process';
import getPackageVersion from '@jsbits/get-package-version';

const program = new Command();
program
  .version(getPackageVersion())
  .argument('<package-file>', 'NXS package file.')
  .argument('<output-dir>', 'Output directory');

program.parse();

const result = splitPackage(program.args[0], program.args[1]);
exit(result ? 0 : 1);
