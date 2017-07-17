# curry-named

Curry for named arguments

## usage

```js
var curry = require('curry-named')

const foo = curry(
  ['a', 'b', 'c'],
  ({a, b, c}) =>
    a + b + c)

foo({ a: 1 })({ b: 2, c: 3}) // 6
```

## Inspiration

- [Gist and discussion](https://gist.github.com/gunar/1268c997ca66343f060dbca07aee67bd)
- [named-curry](https://github.com/rjmk/named-curry)