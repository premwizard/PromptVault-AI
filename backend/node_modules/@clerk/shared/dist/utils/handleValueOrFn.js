
//#region src/utils/handleValueOrFn.ts
/**
*
*/
function handleValueOrFn(value, url, defaultValue) {
	if (typeof value === "function") return value(url);
	if (typeof value !== "undefined") return value;
	if (typeof defaultValue !== "undefined") return defaultValue;
}

//#endregion
exports.handleValueOrFn = handleValueOrFn;