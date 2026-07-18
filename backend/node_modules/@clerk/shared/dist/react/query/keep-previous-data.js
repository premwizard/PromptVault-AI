
//#region src/react/query/keep-previous-data.ts
/**
* @internal
*/
function defineKeepPreviousDataFn(enabled) {
	if (enabled) return function KeepPreviousDataFn(previousData) {
		return previousData;
	};
}

//#endregion
exports.defineKeepPreviousDataFn = defineKeepPreviousDataFn;