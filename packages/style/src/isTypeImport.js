// @flow

import type {IImport} from 'import-sort-parser';

export default function isTypeImport(imported: IImport): boolean {
    return imported.type === 'import-type';
}
