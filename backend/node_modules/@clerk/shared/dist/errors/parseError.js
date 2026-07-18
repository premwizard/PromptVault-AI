const require_clerkApiError = require('./clerkApiError.js');

//#region src/errors/parseError.ts
/**
* Parses an array of ClerkAPIErrorJSON objects into an array of ClerkAPIError objects.
*
* @internal
*/
function parseErrors(data = []) {
	return data.length > 0 ? data.map((e) => new require_clerkApiError.ClerkAPIError(e)) : [];
}
/**
* Parses a ClerkAPIErrorJSON object into a ClerkAPIError object.
*
* @deprecated Use `ClerkAPIError` class instead
*
* @internal
*/
function parseError(error) {
	return new require_clerkApiError.ClerkAPIError(error);
}
/**
* Converts a ClerkAPIError object into a ClerkAPIErrorJSON object.
*
* @internal
*/
function errorToJSON(error) {
	return {
		code: error?.code || "",
		message: error?.message || "",
		long_message: error?.longMessage,
		meta: {
			param_name: error?.meta?.paramName,
			session_id: error?.meta?.sessionId,
			email_addresses: error?.meta?.emailAddresses,
			identifiers: error?.meta?.identifiers,
			zxcvbn: error?.meta?.zxcvbn,
			plan: error?.meta?.plan,
			is_plan_upgrade_possible: error?.meta?.isPlanUpgradePossible,
			seats_quantity_to_add: error?.meta?.seatsQuantityToAdd,
			seats_quantity: error?.meta?.seatsQuantity
		}
	};
}

//#endregion
exports.errorToJSON = errorToJSON;
exports.parseError = parseError;
exports.parseErrors = parseErrors;