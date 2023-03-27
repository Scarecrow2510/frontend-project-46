#!/usr/bin/env node

import { Command } from '../node_modules/commander/esm.mjs';
const program = new Command();

program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    // .option('-f, --format <type>', 'output format', 'stylish')

program.parse();