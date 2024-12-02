/* Javascript Notes */

// TODO make notes about:
// `this` nuances
// arrow functions vs regular
// functional programming
// closures
// types
// destructuring
// spread operator
// es6
// modules
// == vs ===

// for...in iterates over INDEXES in arrays, KEYS in object (mnemonic: INdex)
for (const index in ['a', 'b', 'c']) { /* index = 0, 1, 2   */ }
for (const key   in {a:1, b:2, c:3}) { /* key = 'a','b','c' */ }
// for...of iterates over VALUES in arrays, CHARS in strings
for (const value of ['a','b','c']) { /* value = 'a','b','c' */ }
for (const char  of 'abc')         { /* char  = 'a','b','c' */ }


// Destructure renaming:
const obj = { old_name: 'tyler' };
const { old_name: newName } = obj;
console.log(newName); // 'tyler'


// immutable sorting (because array.sort() will modify array)
var array = [3,2,1];
[...array].sort();    // [1,2,3]
array.slice().sort(); // [1,2,3]
console.log(array);   // [3,2,1] (unmodified)


(function() {
    // Immediately Invoked Function Expression (IIFE)
    // can be async if top level await isn't available
})();


function waterfall (promises, initialValue) {
    return promises.reduce((acc, p) => acc.then(p), Promise.resolve(initialValue));
}


// Memoize a function.
// Cache keys are determined by json stringifying the args to the function,
// so be careful and consider what kinds of inputs will result in which keys;
// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description
// Compare with lodash's implementation : https://lodash.com/docs/#memoize
function memoize(fn) {
    var memoized = function() {
        var key = JSON.stringify(arguments);
        if (key in memoized.cache) return memoized.cache[key];
        else return memoized.cache[key] = fn.apply(this, arguments);
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
async function wait(ms, ...args) {
    return new Promise(resolve => setTimeout(resolve, ms, ...args))
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
function groupBy(array, field) {
    return array.reduce((acc, cur) => {
        (cur[field] in acc) ? acc[cur[field]].push(cur) : acc[cur[field]] = [cur];
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
const path = require('path')
const Module = require('module')
const originalRequire = Module.prototype.require
module.exports = function mock(moduleMap) {
  Module.prototype.require = function proxyRequire(mod) {
    // need to use path.basename() to convert e.g. '.../something.js' --> 'something.js'
    return moduleMap[path.basename(mod)] || originalRequire.call(this, mod)
  }
}


/* Linting in Vim
 * Either make a recording using q or copy the following line into a letter register:
 *   :cexpr system('npx -q eslint -f unix .')
 * Then run it using @
 * :help complex-repeat
 */
