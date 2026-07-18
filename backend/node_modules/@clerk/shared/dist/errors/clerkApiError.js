const require_createErrorTypeGuard = require('./createErrorTypeGuard.js');

//#region src/errors/clerkApiError.ts
/**
* This error contains the specific error message, code, and any additional metadata that was returned by the Clerk API.
*/
var ClerkAPIError = class {
	static kind = "ClerkAPIError";
	code;
	message;
	longMessage;
	meta;
	constructor(json) {
		const parsedError = {
			code: json.code,
			message: json.message,
			longMessage: json.long_message,
			meta: {
				paramName: json.meta?.param_name,
				sessionId: json.meta?.session_id,
				emailAddresses: json.meta?.email_addresses,
				identifiers: json.meta?.identifiers,
				zxcvbn: json.meta?.zxcvbn,
				plan: json.meta?.plan,
				isPlanUpgradePossible: json.meta?.is_plan_upgrade_possible,
				seatsQuantityToAdd: json.meta?.seats_quantity_to_add,
				seatsQuantity: json.meta?.seats_quantity
			}
		};
		this.code = parsedError.code;
		this.message = parsedError.message;
		this.longMessage = parsedError.longMessage;
		this.meta = parsedError.meta;
	}
};
/**
* Type guard to check if a value is a ClerkAPIError instance.
*/
const isClerkAPIError = require_createErrorTypeGuard.createErrorTypeGuard(ClerkAPIError);

//#endregion
exports.ClerkAPIError = ClerkAPIError;
exports.isClerkAPIError = isClerkAPIError;