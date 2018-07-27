// @flow
import {extname} from 'path';

import type {IImport} from 'import-sort-parser';
import type {IComparatorFunction, ISorterFunction, IStyleAPI, IStyleItem} from 'import-sort-style';

function moduleFileType(...exts: string[]) {
    return imported => exts.some(ext => extname(imported.moduleName) === ext);
}

function sortModuleFileExtension(comparator: IComparatorFunction): ISorterFunction {
    return (firstImport: IImport, secondImport: IImport): number => {
        const first = firstImport.moduleName;
        const second = secondImport.moduleName;
        return comparator(extname(first), extname(second));
    };
}

function isTypeImport(imported: IImport): boolean {
    return imported.type === 'import-type';
}

const jsFiles = moduleFileType('', '.js', '.jsx', '.es6', '.es');

const tsFiles = moduleFileType('.ts', '.tsx');

const styleFiles = moduleFileType('.css', '.scss', '.less');

export default function(styleApi: IStyleAPI): Array<IStyleItem> {
    const {and, isAbsoluteModule, isRelativeModule, moduleName, member, name, not, unicode} = styleApi;

    return [
        //
        // Importing absolute modules, js files.
        // ex:
        // import "foo"
        // import * as Foo from "foo"
        // import _ from "foo"
        {
            match: and(not(isTypeImport), isAbsoluteModule, jsFiles),
            sort: moduleName(unicode),
            sortNamedMembers: name(unicode),
        },
        {separator: true},

        //
        // Importing absolute modules, ts files.
        // ex:
        // import "foo"
        // import Foo from "foo.ts"
        // import Foo from "foo.tsx"
        {
            match: and(not(isTypeImport), isAbsoluteModule, tsFiles),
            sort: moduleName(unicode),
            sortNamedMembers: name(unicode),
        },
        {separator: true},

        //
        // Importing absolute modules, style files.
        // ex:
        // import "foo.css"
        // import css from "foo.css"
        // import scss from "foo.scss"
        // import less from "foo.less"
        {
            match: and(not(isTypeImport), isAbsoluteModule, styleFiles),
            sort: [sortModuleFileExtension(unicode), moduleName(unicode)],
            sortNamedMembers: name(unicode),
        },
        {separator: true},

        //
        // Importing absolute modules, any other file types.
        // ex:
        // import "foo.svg"
        // import img from "foo.png"
        // import txt from "foo.text"
        {
            match: and(not(isTypeImport), isAbsoluteModule),
            sort: [sortModuleFileExtension(unicode), moduleName(unicode)],
            sortNamedMembers: name(unicode),
        },
        {separator: true},

        //
        // importing types from absolute modules files
        // ex:
        // import type foo from "foo"
        {
            match: and(isTypeImport, isAbsoluteModule),
            sort: moduleName(unicode),
            sortNamedMembers: name(unicode),
        },
        {separator: true},

        //
        // Importing relative modules, js files.
        // ex:
        // import "../foo"
        // import * as Foo from "../foo"
        // import _ from "../foo"
        {
            match: and(not(isTypeImport), isRelativeModule, jsFiles),
            sort: moduleName(unicode),
            sortNamedMembers: name(unicode),
        },
        {separator: true},

        //
        // Importing relative modules, ts files.
        // ex:
        // import "../foo.ts"
        // import Foo from "../foo.tsx"
        // import Foo from "../foo.ts"
        {
            match: and(not(isTypeImport), isRelativeModule, tsFiles),
            sort: moduleName(unicode),
            sortNamedMembers: name(unicode),
        },
        {separator: true},

        //
        // Importing relative modules, style files.
        // ex:
        // import "../foo.css"
        // import css from "../foo.css"
        // import scss from "../foo.scss"
        // import less from "../foo.less"
        {
            match: and(not(isTypeImport), isRelativeModule, styleFiles),
            sort: [sortModuleFileExtension(unicode), moduleName(unicode)],
            sortNamedMembers: name(unicode),
        },
        {separator: true},

        //
        // Importing absolute modules, any other file types.
        // ex:
        // import "../foo.svg"
        // import img from "../foo.png"
        // import txt from "../foo.text"
        {
            match: and(not(isTypeImport), isRelativeModule),
            sort: [sortModuleFileExtension(unicode), moduleName(unicode)],
            sortNamedMembers: name(unicode),
        },
        {separator: true},

        //
        // importing types from relative modules files
        // ex:
        // import type foo from "../foo"
        {
            match: and(isTypeImport, isRelativeModule),
            sort: member(unicode),
            sortNamedMembers: name(unicode),
        },
        {separator: true},
    ];
}
