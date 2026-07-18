const require_clerkApiResponseError = require('./clerkApiResponseError.js');

//#region src/errors/missingExpiredTokenError.ts
/**
* Error class representing a missing expired token error from the API.
* This error occurs when the server requires an expired token to mint a new session token.
*
* Use the static `is` method to check if a ClerkAPIResponseError matches this error type.
*
* @example
* ```typescript
* if (MissingExpiredTokenError.is(error)) {
*   // Handle the missing expired token error
* }
* ```
*/
var MissingExpiredTokenError = class MissingExpiredTokenError extends require_clerkApiResponseError.ClerkAPIResponseError {
	static kind = "MissingExpiredTokenError";
	static ERROR_CODE = "missing_expired_token";
	static STATUS = 422;
	/**
	* Type guard to check if an error is a MissingExpiredTokenError.
	* This checks the error's properties (status and error code) rather than instanceof,
	* allowing it to work with ClerkAPIResponseError instances thrown from the API layer.
	*
	* @example
	* ```typescript
	* try {
	*   await someApiCall();
	* } catch (e) {
	*   if (MissingExpiredTokenError.is(e)) {
	*     // e is typed as ClerkAPIResponseError with the specific error properties
	*   }
	* }
	* ```
	*/
	static is(err) {
		return require_clerkApiResponseError.isClerkAPIResponseError(err) && err.status === MissingExpiredTokenError.STATUS && err.errors.length > 0 && err.errors[0].code === MissingExpiredTokenError.ERROR_CODE;
	}
};

//#endregion
exports.MissingExpiredTokenError = MissingExpiredTokenError;