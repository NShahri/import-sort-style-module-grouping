#!/usr/bin/env node

import {readFileSync, writeFileSync} from 'fs';
import * as globby from 'globby';
import sortImports from 'import-sort';
import * as parser from 'import-sort-parser-babylon';
import {relative} from 'path';

import style from './index';

function handleFilePathError(filePath, e) {
    console.error(`${filePath}:`);
    console.error(e.toString());
    process.exitCode = 2;
}

const writeFiles = true;
const listDifferent = true;

const filePatterns = 'src/**/*.js';

let filePaths;

try {
    filePaths = globby
        .sync(filePatterns, {dot: true, expandDirectories: false})
        .map(filePath => relative(process.cwd(), filePath));
} catch (e) {
    console.error('Invalid file patterns');
    process.exit(2);
}

if (filePaths.length === 0) {
    console.error(`No files found for the given patterns: ${filePatterns}`);
    process.exit(2);
}

filePaths.forEach(filePath => {
    const unsortedCode = readFileSync(filePath).toString('utf8');

    try {
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
