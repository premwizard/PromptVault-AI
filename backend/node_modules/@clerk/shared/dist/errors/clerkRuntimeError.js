const require_createErrorTypeGuard = require('./createErrorTypeGuard.js');
const require_clerkError = require('./clerkError.js');

//#region src/errors/clerkRuntimeError.ts
/**
* Custom error class for representing Clerk runtime errors.
*
* @class ClerkRuntimeError
*
* @example
*   throw new ClerkRuntimeError('An error occurred', { code: 'password_invalid' });
*/
var ClerkRuntimeError = class ClerkRuntimeError extends require_clerkError.ClerkError {
	static kind = "ClerkRuntimeError";
	/**
	* @deprecated Use `clerkError` property instead. This property is maintained for backward compatibility.
	*/
	clerkRuntimeError = true;
	constructor(message, options) {
		super({
			...options,
			message
		});
		Object.setPrototypeOf(this, ClerkRuntimeError.prototype);
	}
};
/**
* Type guard to check if an error is a ClerkRuntimeError.
* Can be called as a standalone function or as a method on an error object.
*
* @example
* // As a standalone function
* if (isClerkRuntimeError(error)) { ... }
*
* // As a method (when attached to error object)
* if (error.isClerkRuntimeError()) { ... }
*/
const isClerkRuntimeError = require_createErrorTypeGuard.createErrorTypeGuard(ClerkRuntimeError);

//#endregion
exports.ClerkRuntimeError = ClerkRuntimeError;
exports.isClerkRuntimeError = isClerkRuntimeError;