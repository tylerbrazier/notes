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
