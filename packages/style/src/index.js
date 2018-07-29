// @flow

import type {IStyleAPI, IStyleItem} from 'import-sort-style';

import sortModuleFileExtension from './sortModuleFileExtension';
import isTypeImport from './isTypeImport';
import {isJsFile, isStyleFile, isTsFile} from './moduleFileType';

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
            match: and(not(isTypeImport), isAbsoluteModule, isJsFile),
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
            match: and(not(isTypeImport), isAbsoluteModule, isTsFile),
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
            match: and(not(isTypeImport), isAbsoluteModule, isStyleFile),
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
            match: and(not(isTypeImport), isRelativeModule, isJsFile),
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
            match: and(not(isTypeImport), isRelativeModule, isTsFile),
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
            match: and(not(isTypeImport), isRelativeModule, isStyleFile),
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
