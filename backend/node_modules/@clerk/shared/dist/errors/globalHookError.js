const require_clerkApiResponseError = require('./clerkApiResponseError.js');
const require_clerkRuntimeError = require('./clerkRuntimeError.js');

//#region src/errors/globalHookError.ts
/**
* Creates a ClerkGlobalHookError object from a ClerkError instance.
* It's a wrapper for all the different instances of Clerk errors that can
* be returned when using Clerk hooks.
*/
function createClerkGlobalHookError(error) {
	const predicates = {
		isClerkAPIResponseError: require_clerkApiResponseError.isClerkAPIResponseError,
		isClerkRuntimeError: require_clerkRuntimeError.isClerkRuntimeError
	};
	for (const [name, fn] of Object.entries(predicates)) Object.assign(error, { [name]: fn });
	return error;
}

//#endregion
exports.createClerkGlobalHookError = createClerkGlobalHookError;