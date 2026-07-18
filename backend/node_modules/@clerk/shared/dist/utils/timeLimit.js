
//#region src/utils/timeLimit.ts
function timeLimit(value, ms, abortController) {
	let timeoutId;
	const timeoutPromise = new Promise((_, reject) => {
		timeoutId = setTimeout(() => {
			const error = /* @__PURE__ */ new Error(`Timed out after ${ms}ms`);
			abortController?.abort();
			reject(error);
		}, ms);
		timeoutId.unref?.();
	});
	return Promise.race([Promise.resolve(value), timeoutPromise]).finally(() => {
		clearTimeout(timeoutId);
	});
}

//#endregion
exports.timeLimit = timeLimit;