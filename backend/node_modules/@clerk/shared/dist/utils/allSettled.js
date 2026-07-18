
//#region src/utils/allSettled.ts
/**
* A ES6 compatible utility that implements `Promise.allSettled`
*
* @internal
*/
function allSettled(iterable) {
	const promises = Array.from(iterable).map((p) => p.then((value) => ({
		status: "fulfilled",
		value
	}), (reason) => ({
		status: "rejected",
		reason
	})));
	return Promise.all(promises);
}

//#endregion
exports.allSettled = allSettled;