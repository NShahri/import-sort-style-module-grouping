// @flow

import chalk from 'chalk';

export default function handleFilePathError(filePath: string, e: Error) {
    console.error(chalk.red(filePath));
    console.error(e.toString());
    process.exitCode = 2;
}
