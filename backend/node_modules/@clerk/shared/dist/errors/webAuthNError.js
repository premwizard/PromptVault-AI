const require_clerkRuntimeError = require('./clerkRuntimeError.js');

//#region src/errors/webAuthNError.ts
var ClerkWebAuthnError = class extends require_clerkRuntimeError.ClerkRuntimeError {
	/**
	* A unique code identifying the error, can be used for localization.
	*/
	code;
	constructor(message, options) {
		super(message, options);
		this.code = options.code;
	}
};

//#endregion
exports.ClerkWebAuthnError = ClerkWebAuthnError;