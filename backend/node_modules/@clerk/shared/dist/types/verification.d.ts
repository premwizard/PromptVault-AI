import { ClerkResource } from "./resource.js";
import { PhoneCodeChannel } from "./phoneCodeChannel.js";
import { ClerkAPIError } from "./errors.js";
import { PublicKeyCredentialCreationOptionsWithoutExtensions } from "./passkey.js";
import { VerificationJSONSnapshot } from "./snapshots.js";

//#region src/types/verification.d.ts
interface VerificationResource extends ClerkResource {
  attempts: number | null;
  error: ClerkAPIError | null;
  expireAt: Date | null;
  externalVerificationRedirectURL: URL | null;
  nonce: string | null;
  message: string | null;
  status: VerificationStatus | null;
  strategy: string | null;
  verifiedAtClient: string | null;
  verifiedFromTheSameClient: () => boolean;
  channel?: PhoneCodeChannel;
  __internal_toSnapshot: () => VerificationJSONSnapshot;
}
interface PasskeyVerificationResource extends VerificationResource {
  publicKey: PublicKeyCredentialCreationOptionsWithoutExtensions | null;
}
type VerificationStatus = 'unverified' | 'verified' | 'transferable' | 'failed' | 'expired';
interface CodeVerificationAttemptParam {
  code: string;
  signature?: never;
}
interface SignatureVerificationAttemptParam {
  code?: never;
  signature: string;
}
type VerificationAttemptParams = CodeVerificationAttemptParam | SignatureVerificationAttemptParam;
interface StartEmailLinkFlowParams {
  redirectUrl: string;
}
type CreateEmailLinkFlowReturn<Params, Resource> = {
  startEmailLinkFlow: (params: Params) => Promise<Resource>;
  cancelEmailLinkFlow: () => void;
};
interface StartEnterpriseSSOLinkFlowParams {
  redirectUrl: string;
}
type CreateEnterpriseSSOLinkFlowReturn<Params, Resource> = {
  startEnterpriseSSOLinkFlow: (params: Params) => Promise<Resource>;
  cancelEnterpriseSSOLinkFlow: () => void;
};
//#endregion
export { CodeVerificationAttemptParam, CreateEmailLinkFlowReturn, CreateEnterpriseSSOLinkFlowReturn, PasskeyVerificationResource, SignatureVerificationAttemptParam, StartEmailLinkFlowParams, StartEnterpriseSSOLinkFlowParams, VerificationAttemptParams, VerificationResource, VerificationStatus };