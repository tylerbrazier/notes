# javascript notes

`for...in` interates **indexes** in arrays, **keys** in object

`for...of` iterates **values** in arrays, **chars** in strings

Destructure renaming: `const { old_name: newName } = obj`

```javascript
function waterfall (promises, initialValue) {
  return promises.reduce((acc, p) => acc.then(p), Promise.resolve(initialValue))
}
```
