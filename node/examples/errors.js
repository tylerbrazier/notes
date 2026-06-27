async function willThrow() {
	throw Error();
}

try {
	willThrow(); // WILL NOT BE CAUGHT because not awaited
} catch (err) {
	console.log("this will NOT be logged");
}

try {
	// THIS WILL NOT BE CAUGHT because fn() is not awaited or returned
	const wrapperWithoutAwaitOrReturn = async (fn) => {
		fn();
	};
	await wrapperWithoutAwaitOrReturn(async () => await willThrow());
} catch (err) {
	console.log("this will NOT be logged");
}

try {
	// will be caught because all promises are awaited
	const wrapperWithAwait = async (fn) => {
		await fn();
	};
	await wrapperWithAwait(async () => await willThrow());
} catch (err) {
	console.log("this will be logged");
}

try {
	// will be caught because fn() is returned
	const wrapperWithReturn = async (fn) => fn();
	await wrapperWithReturn(async () => await willThrow());
} catch (err) {
	console.log("this will be logged");
}
