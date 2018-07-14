# all-dependencies
Recursively retrieve all dependencies for a Node.js project

Running ```npm i``` before using the module will ensure that all your dependencies will be retrieved. Missing modules will appear on a different list.

## Installation
```bash
npm i all-dependencies -s
```

## Usage
```js
const dependencies = require('all-dependencies');

dependencies();
// => {dependencies: ['a', 'b', 'd'], missing: ['c', 'e']}

dependencies.list();
// => ['a', 'b', 'd']

dependencies.missing();
// => ['c', 'e']
```
