
//#region src/utils/runIfFunctionOrReturn.ts
/**
*
*/
function runIfFunctionOrReturn(o) {
	if (typeof o === "function") return o();
	return o;
}

//#endregion
exports.runIfFunctionOrReturn = runIfFunctionOrReturn;