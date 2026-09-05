# commonform-serialize

serialize Common Forms

This package defines a uniform, deterministic way to serialize Common Form objects, so they can be [hashed](https://www.npmjs.com/package/commonform-hash) consistently.

```javascript
import * as serialize from 'commonform-serialize'
```

Sorts object keys:

```javascript
import assert from 'node:assert'

assert.deepEqual(
  serialize.stringify({ a: '1', b: '2' }),
  serialize.stringify({ b: '2', a: '1' })
)
```

Outputs valid JSON `String`, `Object`, and `Array`:

```javascript
const a1 = { a: '1' }
assert.deepEqual(
  JSON.parse(serialize.stringify(a1)),
  a1
)

const a12 = { a: [ '1', '2' ] }
assert.deepEqual(
  JSON.parse(serialize.stringify(a12)),
  a12
)

const aEmpty = { a: [ ] }
assert.deepEqual(
  JSON.parse(serialize.stringify(aEmpty)),
  aEmpty
)
```

Escapes quotation marks:

```javascript
assert.deepEqual(
  serialize.stringify({ a: '"this is a test"' }),
  '{"a":"\\"this is a test\\""}'
)
```

Throw errors for non-`String`, non-`Object`, non-`Array` content:

```javascript
const invalidValues = {
  boolean: true,
  number: 1,
  null: null,
  undefined: void 0
}

Object.getOwnPropertyNames(invalidValues).map(function (type) {
  assert.throws(
    function () {
      serialize.stringify({ a: invalidValues[type] })
    },
    /argument to stringify contains other than object, array, or string/
  )
})
```
