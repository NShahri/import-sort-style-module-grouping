import * as parser from 'import-sort-parser-babylon';
import {readFileSync} from 'fs';
import {join} from 'path';
import {sortImports} from 'import-sort';

import style from '../index';

describe('sortImports (babylon, grouping)', () => {
    it('should have no errors', () => {
        const file = join(__dirname, 'babylon.js.test');
        const code = readFileSync(file, 'utf-8');

        const result = sortImports(code, parser, style, file);
        console.log(result.code);
    });
});
