import {IComparatorFunction, ISorterFunction} from 'import-sort-style';
import type {IImport} from 'import-sort-parser';
import {extname} from 'path';

export function sortModuleFileExtension(comparator: IComparatorFunction): ISorterFunction {
    return (firstImport: IImport, secondImport: IImport): number => {
        const first = firstImport.moduleName;
        const second = secondImport.moduleName;
        return comparator(extname(first), extname(second));
    };
}
