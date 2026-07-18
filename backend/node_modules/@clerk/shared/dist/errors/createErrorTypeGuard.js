
//#region src/errors/createErrorTypeGuard.ts
/**
* Creates a type guard function for any error class.
* The returned function can be called as a standalone function or as a method on an error object.
*
* @example
* ```typescript
* class MyError extends Error {}
* const isMyError = createErrorTypeGuard(MyError);
*
* // As a standalone function
* if (isMyError(error)) { ... }
*
* // As a method (when attached to error object)
* if (error.isMyError()) { ... }
* ```
*/
function createErrorTypeGuard(ErrorClass) {
	function typeGuard(error) {
		const target = error ?? this;
		if (!target) throw new TypeError(`${ErrorClass.kind || ErrorClass.name} type guard requires an error object`);
		if (ErrorClass.kind && typeof target === "object" && target !== null && "constructor" in target) {
			if (target.constructor?.kind === ErrorClass.kind) return true;
		}
		return target instanceof ErrorClass;
	}
	return typeGuard;
}

//#endregion
exports.createErrorTypeGuard = createErrorTypeGuard;