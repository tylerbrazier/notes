/* Javascript Notes */

// TODO make notes about:
// `this` nuances
// what does `new` do
// arrow functions vs regular
// functional programming
// closures
// destructuring
// spread operator
// es6
// modules
// == vs ===

// for...in iterates over INDEXES in arrays, KEYS in object (mnemonic: INdex)
for (const _index in ["a", "b", "c"]) {
	/* index = 0, 1, 2   */
}
for (const _key in { a: 1, b: 2, c: 3 }) {
	/* key = 'a','b','c' */
}
// for...of iterates over VALUES in arrays, CHARS in strings
for (const _value of ["a", "b", "c"]) {
	/* value = 'a','b','c' */
}
for (const _char of "abc") {
	/* char  = 'a','b','c' */
}

// Destructure renaming:
const obj = { old_name: "tyler" };
const { old_name: newName } = obj;
console.log(newName); // 'tyler'

// Types:
// JS is dynamically typed (variables aren't typed)
// and weakly typed (allows implicit type coercions)
// https://dorey.github.io/JavaScript-Equality-Table/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
// 	typeof ...
// 	'undefined'
// 	'object' (including null)
// 	'string'
// 	'boolean'
// 	'number'
// 	'bigint'
// 	'symbol'

// immutable sorting (because array.sort() will modify array)
var array = [3, 2, 1];
[...array].sort(); // [1,2,3]
array.slice().sort(); // [1,2,3]
console.log(array); // [3,2,1] (unmodified)

(() => {
	// Immediately Invoked Function Expression (IIFE)
	// can be async if top level await isn't available
})();

export function waterfall(promises, initialValue) {
	return promises.reduce(
		(acc, p) => acc.then(p),
		Promise.resolve(initialValue),
	);
}

// Memoize a function.
// Cache keys are determined by json stringifying the args to the function,
// so be careful and consider what kinds of inputs will result in which keys;
// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description
// Compare with lodash's implementation : https://lodash.com/docs/#memoize
export function memoize(fn) {
	var memoized = function (...args) {
		var key = JSON.stringify(args);
		if (!(key in memoized.cache)) memoized.cache[key] = fn.apply(this, args);
		return memoized.cache[key];
	};
	memoized.cache = {};
	return memoized;
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
export async function retry(attempts, backoff, fn, ...args) {
	try {
		return await fn(...args);
	} catch (err) {
		console.error(`RETRY (${attempts}) failed:`, err);

		if (attempts > 1) {
			console.error(`RETRY waiting ${backoff}ms...`);
			await wait(backoff);

			attempts--;
			backoff *= 2;

			console.error(`RETRYing again (${attempts})...`);
			return await retry(attempts, backoff, fn, ...args);
		} else {
			console.error(`RETRY failed last attempt; giving up.`);
			throw err;
		}
	}
}
async function wait(ms, ...args) {
	return new Promise((resolve) => setTimeout(resolve, ms, ...args));
}

/*
groupBy([
    { name: 'tyler', age: 31 },
    { name: 'tyler', age: 21 },
    { name: 'jc', age: 7 },
    { name: 'jc', age: 33 },
], 'name')
{
    tyler: [ { name: 'tyler', age: 31 }, { name: 'tyler', age: 21 } ],
    jc:    [ { name: 'jc',    age: 7  }, { name: 'jc',    age: 33 } ],
}
*/
export function groupBy(array, field) {
	return array.reduce((acc, cur) => {
		if (cur[field] in acc) acc[cur[field]].push(cur);
		else acc[cur[field]] = [cur];
		return acc;
	}, {});
}

// This module redefines how require() works so that we can mock modules for tests.
// At the top of your test file you can put something like:
//
//     require('.../mock.js')({
//       'node-fetch': function mockedFetch(...) { ... },
//       'someOtherModuleToMock.js': { prop: 'mocked value', fn: (args) => mockedFn(args) }
//       ...
//     })
//     var mockedFn = ... // redefine later in the test to change the behaviour of fn
//     var moduleToBeTested = require('.../moduleToBeTested.js')
//
// Then when moduleToBeTested.js requires 'node-fetch' or '.../someOtherModuleToMock.js'
// they will be replaced by your mocks instead.
const path = require("node:path");
const Module = require("node:module");
const originalRequire = Module.prototype.require;
module.exports = function mock(moduleMap) {
	Module.prototype.require = function proxyRequire(mod) {
		// need to use path.basename() to convert e.g. '.../something.js' --> 'something.js'
		return moduleMap[path.basename(mod)] || originalRequire.call(this, mod);
	};
};

/* Linting in Vim
 * Either make a recording using q or copy the following line into a letter register:
 *   :cexpr system('npx -q eslint -f unix .')
 * Then run it using @
 * :help complex-repeat
 */
