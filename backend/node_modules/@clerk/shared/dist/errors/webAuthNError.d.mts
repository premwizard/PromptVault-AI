import { ClerkErrorParams } from "./clerkError.mjs";
import { ClerkRuntimeError } from "./clerkRuntimeError.mjs";

//#region src/errors/webAuthNError.d.ts
type ClerkWebAuthnErrorCode = 'passkey_not_supported' | 'passkey_pa_not_supported' | 'passkey_invalid_rpID_or_domain' | 'passkey_already_exists' | 'passkey_operation_aborted' | 'passkey_retrieval_cancelled' | 'passkey_retrieval_failed' | 'passkey_registration_cancelled' | 'passkey_registration_failed';
type ClerkWebAuthnErrorOptions = Omit<ClerkErrorParams, 'message' | 'code'> & {
  code: ClerkWebAuthnErrorCode;
};
declare class ClerkWebAuthnError extends ClerkRuntimeError {
  /**
   * A unique code identifying the error, can be used for localization.
   */
  code: ClerkWebAuthnErrorCode;
  constructor(message: string, options: ClerkWebAuthnErrorOptions);
}
//#endregion
export { ClerkWebAuthnError };