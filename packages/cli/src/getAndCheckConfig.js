// @flow

import {getConfig} from 'import-sort-config';

import type {IResolvedConfig} from 'import-sort-config';

import defaultConfig from './defaultConfig';

export default function getAndCheckConfig(extension: string, fileDirectory: string): IResolvedConfig {
    const resolvedConfig = getConfig(extension, fileDirectory, defaultConfig);

    /*
    throwIf(!resolvedConfig, `No configuration found for file type ${extension}`);

    const rawParser = resolvedConfig?.config.parser;
    const rawStyle = resolvedConfig?.config.style;

    throwIf(!rawParser, `No parser defined for file type ${extension}`);
    throwIf(!rawStyle, `No style defined for file type ${extension}`);

    const parser = resolvedConfig?.parser;
    const style = resolvedConfig?.style;

    throwIf(!parser, `Parser "${rawParser}" could not be resolved`);
    throwIf(!style, `Style "${rawStyle}" could not be resolved`);
*/

    return resolvedConfig;
}
