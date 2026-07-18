import { ClerkResource } from "./resource.mjs";
import { PhoneCodeStrategy } from "./strategies.mjs";
import { PhoneCodeChannel } from "./phoneCodeChannel.mjs";
import { VerificationResource } from "./verification.mjs";
import { PhoneNumberJSONSnapshot } from "./snapshots.mjs";
import { IdentificationLinkResource } from "./identificationLink.mjs";

//#region src/types/phoneNumber.d.ts
type PhoneNumberVerificationStrategy = PhoneCodeStrategy;
type PreparePhoneNumberVerificationParams = {
  strategy: PhoneNumberVerificationStrategy;
  channel?: PhoneCodeChannel;
};
type AttemptPhoneNumberVerificationParams = {
  code: string;
};
type SetReservedForSecondFactorParams = {
  reserved: boolean;
};
interface PhoneNumberResource extends ClerkResource {
  id: string;
  phoneNumber: string;
  verification: VerificationResource;
  reservedForSecondFactor: boolean;
  defaultSecondFactor: boolean;
  linkedTo: IdentificationLinkResource[];
  backupCodes?: string[];
  toString: () => string;
  prepareVerification: () => Promise<PhoneNumberResource>;
  attemptVerification: (params: AttemptPhoneNumberVerificationParams) => Promise<PhoneNumberResource>;
  makeDefaultSecondFactor: () => Promise<PhoneNumberResource>;
  setReservedForSecondFactor: (params: SetReservedForSecondFactorParams) => Promise<PhoneNumberResource>;
  destroy: () => Promise<void>;
  create: () => Promise<PhoneNumberResource>;
  __internal_toSnapshot: () => PhoneNumberJSONSnapshot;
}
//#endregion
export { AttemptPhoneNumberVerificationParams, PhoneNumberResource, PhoneNumberVerificationStrategy, PreparePhoneNumberVerificationParams, SetReservedForSecondFactorParams };