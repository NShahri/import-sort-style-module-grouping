// @flow

export function handleFilePathError(filePath: string, e: Error) {
    console.error(`${filePath}:`);
    console.error(e.toString());
    process.exitCode = 2;
}
