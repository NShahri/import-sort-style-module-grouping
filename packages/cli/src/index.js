#!/usr/bin/env node
// @flow

import {readFileSync, writeFileSync} from 'fs';
import globby from 'globby';
import sortImports from 'import-sort';
import {dirname, extname, relative} from 'path';
import yargs from 'yargs';

import getAndCheckConfig from './getAndCheckConfig';
import {handleFilePathError} from './handleFilePathError';

yargs
    .usage(`Usage: import-sort [FILE] [OPTION]`)

    .describe('write', 'Edit files in-place.')
    .boolean('write')

    .version(require('../package.json').version)
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
const listDifferent = true;

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
    const unsortedCode = readFileSync(filePath).toString('utf8');

    try {
        const config = getAndCheckConfig(extname(filePath), dirname(filePath));
        const {parser, style} = config;

        const sortResult = sortImports(unsortedCode, parser, style, filePath);

        const {code: sortedCode, changes} = sortResult;

        const isDifferent = changes.length > 0;

        if (writeFiles && isDifferent) {
            writeFileSync(filePath, sortedCode, {encoding: 'utf-8'});
        }

        if (listDifferent && isDifferent) {
            process.exitCode = 1;
            console.log(filePath);
        }

        if (!writeFiles && !listDifferent) {
            process.stdout.write(sortedCode);
        }
    } catch (e) {
        handleFilePathError(filePath, e);
    }
});

console.log(`${filePaths.length} files processed.\r\n`);
