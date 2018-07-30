// @flow

const defaultConfig = {
    '.js, .jsx, .es6, .es': {
        parser: 'babylon',
        style: 'module-grouping',
    },
    '.ts, .tsx': {
        parser: 'typescript',
        style: 'module-grouping',
    },
};

export default defaultConfig;
