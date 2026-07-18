
//#region src/errors/emailLinkError.ts
var EmailLinkError = class EmailLinkError extends Error {
	code;
	constructor(code) {
		super(code);
		this.code = code;
		this.name = "EmailLinkError";
		Object.setPrototypeOf(this, EmailLinkError.prototype);
	}
};
/**
* @deprecated Use `EmailLinkErrorCodeStatus` instead.
*
* @internal
*/
const EmailLinkErrorCode = {
	Expired: "expired",
	Failed: "failed",
	ClientMismatch: "client_mismatch"
};
const EmailLinkErrorCodeStatus = {
	Expired: "expired",
	Failed: "failed",
	ClientMismatch: "client_mismatch"
};

//#endregion
exports.EmailLinkError = EmailLinkError;
exports.EmailLinkErrorCode = EmailLinkErrorCode;
exports.EmailLinkErrorCodeStatus = EmailLinkErrorCodeStatus;