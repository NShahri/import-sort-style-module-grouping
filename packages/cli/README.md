# module-grouping-cli
A simple cli tool for sorting imported modules without configuration based on
[import-sort](https://www.npmjs.com/package/import-sort) and
[import-sort-style-module-grouping](https://www.npmjs.com/package/import-sort-style-module-grouping)

## Grouping Rules:
Running this package will groups the es6 imports based on the following order:

* Absolute path dependencies in the following order
    * javascript (.js, .jsx, .es6, .es) modules
    * typescript (.ts, .tsx) modules
    * styles (.css, .scss, .less) modules
    * any other type of modules
    * type imports (import type ... from '...';)
* Relative path dependencies in the following order
    * javascript (.js, .jsx, .es6, .es) modules
    * Relative typescript (.ts, .tsx) modules
    * Relative styles (.css, .scss, .less) modules
    * Relative any other type of modules
    * Relative type imports (import type ... from './..';)


## Sample
When a file imports packages in the following order:
```js
import React from 'react';
import Redux from 'redux';
import type {Node} from 'react';
import theme from 'mdc/index.scss';
import css from './button.module.css';
import css from './dropdown.module.css';
import {ReactComponent} from './logo.svg';
import Button from './button';
import DropDown from './dropdown';
```

The result will be:
```js
import React from 'react';
import Redux from 'redux';

import theme from 'mdc/index.scss';

import type {Node} from 'react';

import Button from './button';
import DropDown from './dropdown';

import css from './button.module.css';
import css from './dropdown.module.css';

import {ReactComponent} from './logo.svg';
```

## Run on git pre-commit

```
yarn add lint-staged husky --dev
# OR
npm install lint-staged husky --save-dev
```

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.js": [
      "module-grouping --write",
      "git add"
    ]
  }
}
```

## Install
```
yarn add module-grouping-cli --dev
# Or
npm install module-grouping-cli --save-dev
```

## Usage
Running the following command will display the result of changes after sorting ES2015 imports:

```
npx module-grouping **/*.js
```

Use `--write` to update files in-place
```
npx module-grouping **/*.js --write
```

Installing and running this command it is exactly the same as
installing [these](https://www.npmjs.com/package/import-sort-style-module-grouping#install) dependencies and
running [this](https://www.npmjs.com/package/import-sort-style-module-grouping#config)
configuration for import-sort.
