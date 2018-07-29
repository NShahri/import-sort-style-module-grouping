// @flow

import {extname} from 'path';

import type {IImport} from 'import-sort-parser';

export function moduleFileType(...exts: string[]) {
    return (imported: IImport) => exts.some(ext => extname(imported.moduleName) === ext);
}

export const isJsFile = moduleFileType('', '.js', '.jsx', '.es6', '.es');

export const isTsFile = moduleFileType('.ts', '.tsx');

export const isStyleFile = moduleFileType('.css', '.scss', '.less');
