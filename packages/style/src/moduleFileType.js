import {extname} from 'path';

export function moduleFileType(...exts: string[]) {
    return imported => exts.some(ext => extname(imported.moduleName) === ext);
}

export const isJsFile = moduleFileType('', '.js', '.jsx', '.es6', '.es');

export const isTsFile = moduleFileType('.ts', '.tsx');

export const isStyleFile = moduleFileType('.css', '.scss', '.less');
