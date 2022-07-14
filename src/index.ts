#! /usr/bin/env node

import { program } from 'commander';
import { getVersion } from './utils/package';
import commandLoader from './commands/command-loader';

program.version(getVersion(), '-v, --version')
commandLoader(program);
program.parse(process.argv)