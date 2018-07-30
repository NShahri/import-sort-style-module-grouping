# module-grouping-cli
A simple cli tool for sorting imported modules without configuration based on 
[import-sort](https://www.npmjs.com/package/import-sort) and 
[import-sort-style-module-grouping](https://www.npmjs.com/package/import-sort-style-module-grouping)

## Install
```
yarn install module-grouping-cli --dev
```

Or

```
npm onstall module-grouping-cli --save-dev
```

## Usage
Running the following command will display the result of changes after sorting ES2015 imports:

```
npx module-grouping-cli **/*.js
```

Use `--write` to update files in-place
```
npx module-grouping-cli **/*.js --write
```

Installing and running this command it is exactly the same as 
installing [these](https://www.npmjs.com/package/import-sort-style-module-grouping#install) dependencies and
running [this](https://www.npmjs.com/package/import-sort-style-module-grouping#config) 
configuration for import-sort. 