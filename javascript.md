# javascript notes

`for...in` interates **indexes** in arrays, **keys** in object

`for...of` iterates **values** in arrays, **chars** in strings

Destructure renaming: `const { old_name: newName } = obj`

```javascript
function waterfall (promises, initialValue) {
  return promises.reduce((acc, p) => acc.then(p), Promise.resolve(initialValue))
}

async function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Attempt calling fn, retrying on failure and backing off between retries.
 * @param {number} attempts - How many attempts to make.
 * @param {number} backoff - Time to wait between retries; doubles each attempt.
 * @param {function} fn - The function to call.
 * @param {...*} args - The arguments to pass to fn when it's called.
 * @returns {Promise} The result of fn.
 * @throws If fn fails every attempt.
 */
async function retry(attempts, backoff, fn, ...args) {
	try {
		return await fn(...args)
	} catch (err) {
		console.error(`RETRY (${attempts}) failed:`, err)

		if (attempts > 1) {
			console.error(`RETRY waiting ${backoff}ms...`)
			await wait(backoff)

			attempts--
			backoff *= 2

			console.error(`RETRYing again (${attempts})...`)
			return await retry(attempts, backoff, fn, ...args)
		} else {
			console.error(`RETRY failed last attempt; giving up.`)
			throw err
		}
	}
}
```

For mocking modules in tests for node.js:
```javascript
const path = require('path')
const Module = require('module')
const originalRequire = Module.prototype.require

// This module redefines how require() works so that we can mock modules for tests.
// At the top of your test file you can put something like:
//
//     require('.../proxyRequire.js')({
//       'node-fetch': function mockFetch(...) { ... },
//       'someOtherModuleToMock.js': { mockExportedProp1: ..., mockExportedProp2: ... }
//       ...
//     })
//     const moduleToBeTested = require('.../moduleToBeTested.js')
//
// Then when moduleToBeTested.js requires 'node-fetch' or '.../someOtherModuleToMock.js'
// they will be replaced by your mocks instead.
module.exports = function makeProxyRequire(moduleMap) {
  Module.prototype.require = function proxyRequire(mod) {
    // need to use path.basename() to convert e.g. '.../something.js' --> 'something.js'
    return moduleMap[path.basename(mod)] || originalRequire.call(this, mod)
  }
}
```
