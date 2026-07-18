const require_clerkRuntimeError = require('./clerkRuntimeError.js');

//#region src/errors/clerkOfflineError.ts
/**
* Error thrown when a network request fails due to the client being offline.
*
* This error is thrown instead of returning `null` to make it explicit that
* the failure was due to network conditions, not authentication state.
*
* @example
* ```typescript
* try {
*   const token = await session.getToken();
* } catch (error) {
*   if (ClerkOfflineError.is(error)) {
*     // Handle offline scenario
*     showOfflineScreen();
*   }
* }
* ```
*/
var ClerkOfflineError = class ClerkOfflineError extends require_clerkRuntimeError.ClerkRuntimeError {
	static kind = "ClerkOfflineError";
	static ERROR_CODE = "clerk_offline";
	constructor(message) {
		super(message, { code: ClerkOfflineError.ERROR_CODE });
		Object.setPrototypeOf(this, ClerkOfflineError.prototype);
	}
	/**
	* Type guard to check if an error is a ClerkOfflineError.
	* This checks both instanceof and the error code to support cross-bundle/cross-realm errors
	*
	* @example
	* ```typescript
	* try {
	*   const token = await session.getToken();
	* } catch (error) {
	*   if (ClerkOfflineError.is(error)) {
	*     // error is typed as ClerkOfflineError
	*     console.log('User is offline');
	*   }
	* }
	* ```
	*/
	static is(error) {
		if (error === null || error === void 0) return false;
		return error instanceof ClerkOfflineError || require_clerkRuntimeError.isClerkRuntimeError(error) && error.code === ClerkOfflineError.ERROR_CODE;
	}
};

//#endregion
exports.ClerkOfflineError = ClerkOfflineError;