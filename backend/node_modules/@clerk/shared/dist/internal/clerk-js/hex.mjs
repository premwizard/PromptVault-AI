//#region src/internal/clerk-js/hex.ts
function toHex(stringToConvert) {
	return stringToConvert.split("").map((c) => c.charCodeAt(0).toString(16).padStart(2, "0")).join("");
}

//#endregion
export { toHex };
//# sourceMappingURL=hex.mjs.map