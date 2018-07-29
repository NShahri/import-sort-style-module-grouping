// @flow

import {extname} from 'path';

import type {IImport} from 'import-sort-parser';
import type {IComparatorFunction, ISorterFunction} from 'import-sort-style';

export default function sortModuleFileExtension(comparator: IComparatorFunction): ISorterFunction {
    return (firstImport: IImport, secondImport: IImport): number => {
        const first = firstImport.moduleName;
        const second = secondImport.moduleName;
        return comparator(extname(first), extname(second));
    };
}
