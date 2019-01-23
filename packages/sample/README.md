# Sample for module grouping

## Install
```
yarn install
# OR
npm install
```

#Config
Add the following configuration to `package.json`

```
  "importSort": {
    ".js, .jsx, .es6, .es": {
      "parser": "babylon",
      "style": "module-grouping"
    },
    ".ts, .tsx": {
      "parser": "typescript",
      "style": "module-grouping"
    }
  }
```

#Usage
##Command Line (import-sort-cli)

Running the following command will display the result of changes after sorting ES2015 imports.
```
import-sort src/index.js
```
[For more command line options click here.](https://github.com/renke/import-sort#command-line-import-sort-cli)

##Node.js (import-sort)
[Click here](https://github.com/renke/import-sort#nodejs-import-sort) for using import-sort-style-module-grouping and import-sort in node.js
