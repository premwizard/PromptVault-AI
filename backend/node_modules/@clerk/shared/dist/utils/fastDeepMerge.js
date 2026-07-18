
//#region src/utils/fastDeepMerge.ts
const DANGEROUS_KEYS = new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
/**
* Merges 2 objects without creating new object references
* The merged props will appear on the `target` object
* If `target` already has a value for a given key it will not be overwritten
*/
const fastDeepMergeAndReplace = (source, target) => {
	if (!source || !target) return;
	for (const key in source) {
		if (DANGEROUS_KEYS.has(key)) continue;
		if (Object.prototype.hasOwnProperty.call(source, key) && source[key] !== null && typeof source[key] === `object`) {
			if (target[key] === void 0) target[key] = new (Object.getPrototypeOf(source[key])).constructor();
			fastDeepMergeAndReplace(source[key], target[key]);
		} else if (Object.prototype.hasOwnProperty.call(source, key) && source[key] !== void 0) target[key] = source[key];
	}
};
const fastDeepMergeAndKeep = (source, target) => {
	if (!source || !target) return;
	for (const key in source) {
		if (DANGEROUS_KEYS.has(key)) continue;
		if (Object.prototype.hasOwnProperty.call(source, key) && source[key] !== null && typeof source[key] === `object`) {
			if (target[key] === void 0) target[key] = new (Object.getPrototypeOf(source[key])).constructor();
			fastDeepMergeAndKeep(source[key], target[key]);
		} else if (Object.prototype.hasOwnProperty.call(source, key) && target[key] === void 0) target[key] = source[key];
	}
};

//#endregion
exports.fastDeepMergeAndKeep = fastDeepMergeAndKeep;
exports.fastDeepMergeAndReplace = fastDeepMergeAndReplace;