const require_createErrorTypeGuard = require('./createErrorTypeGuard.js');
const require_clerkApiError = require('./clerkApiError.js');
const require_clerkError = require('./clerkError.js');

//#region src/errors/clerkApiResponseError.ts
var ClerkAPIResponseError = class ClerkAPIResponseError extends require_clerkError.ClerkError {
	static kind = "ClerkAPIResponseError";
	status;
	clerkTraceId;
	retryAfter;
	errors;
	constructor(message, options) {
		const { data: errorsJson, status, clerkTraceId, retryAfter } = options;
		super({
			...options,
			message,
			code: "api_response_error"
		});
		Object.setPrototypeOf(this, ClerkAPIResponseError.prototype);
		this.status = status;
		this.clerkTraceId = clerkTraceId;
		this.retryAfter = retryAfter;
		this.errors = (errorsJson || []).map((e) => new require_clerkApiError.ClerkAPIError(e));
	}
	toString() {
		let message = `[${this.name}]\nMessage:${this.message}\nStatus:${this.status}\nSerialized errors: ${this.errors.map((e) => JSON.stringify(e))}`;
		if (this.clerkTraceId) message += `\nClerk Trace ID: ${this.clerkTraceId}`;
		return message;
	}
	static formatMessage(name, msg, _, __) {
		return msg;
	}
};
/**
* Type guard to check if an error is a ClerkAPIResponseError.
* Can be called as a standalone function or as a method on an error object.
*
* @example
* // As a standalone function
* if (isClerkAPIResponseError(error)) { ... }
*
* // As a method (when attached to error object)
* if (error.isClerkAPIResponseError()) { ... }
*/
const isClerkAPIResponseError = require_createErrorTypeGuard.createErrorTypeGuard(ClerkAPIResponseError);

//#endregion
exports.ClerkAPIResponseError = ClerkAPIResponseError;
exports.isClerkAPIResponseError = isClerkAPIResponseError;