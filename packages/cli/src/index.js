#!/usr/bin/env node
// @flow

import {readFileSync, writeFileSync} from 'fs';
import globby from 'globby';
import sortImports from 'import-sort';
import {dirname, extname, relative} from 'path';
import yargs from 'yargs';
import chalk from 'chalk';

import getAndCheckConfig from './getAndCheckConfig';
import handleFilePathError from './handleFilePathError';

yargs
    .usage(`Usage: import-sort [FILE] [OPTION]`)

    .describe('write', 'Edit files in-place.')
    .boolean('write')

    .version(require('../../package.json').version) // eslint-disable-line import/no-unresolved
    .alias('version', 'v')

    .help()
    .alias('help', 'h');

let filePatterns = yargs.argv._;

if (filePatterns.length === 0) {
    yargs.showHelp();
    process.exit(1);
}

filePatterns = filePatterns.concat(['!**/node_modules/**', '!./node_modules/**']);

const writeFiles = yargs.argv.write;

let filePaths = [];

try {
    filePaths = globby
        .sync(filePatterns, {dot: true, expandDirectories: false})
        .map(filePath => relative(process.cwd(), filePath));
} catch (e) {
    console.error('Invalid file patterns');
    process.exit(2);
}

filePaths.forEach(filePath => {
    const start = Date.now();

    const unsortedCode = readFileSync(filePath).toString('utf8');

    try {
        const {parser, style} = getAndCheckConfig(extname(filePath), dirname(filePath));

        const sortResult = sortImports(unsortedCode, parser, style, filePath);

        const {code: sortedCode, changes} = sortResult;

        const isDifferent = changes.length > 0;

        if (writeFiles && isDifferent) {
            writeFileSync(filePath, sortedCode, {encoding: 'utf-8'});
        }

        if (isDifferent) {
            console.log(`${filePath} ${Date.now() - start}ms`);
        } else {
            console.log(`${chalk.grey(filePath)} ${Date.now() - start}ms`);
        }
    } catch (e) {
        handleFilePathError(filePath, e);
    }
});

console.log(`${filePaths.length} files processed.\r\n`);
