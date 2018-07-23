import {readFileSync} from 'fs';
import {sortImports} from 'import-sort';
import * as parser from 'import-sort-parser-babylon';
import {join} from 'path';

import style from '../index';

describe('sortImports (babylon, grouping)', () => {
    it('should have no errors', () => {
        const file = join(__dirname, 'babylon.js.test');
        const code = readFileSync(file, 'utf-8');

        const result = sortImports(code, parser, style, file);
        console.log(result.code);
    });
});
