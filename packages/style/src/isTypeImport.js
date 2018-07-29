import type {IImport} from 'import-sort-parser';

export function isTypeImport(imported: IImport): boolean {
    return imported.type === 'import-type';
}
