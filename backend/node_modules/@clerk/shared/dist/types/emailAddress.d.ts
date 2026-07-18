import { ClerkResource } from "./resource.js";
import { EmailCodeStrategy, EmailLinkStrategy, EnterpriseSSOStrategy } from "./strategies.js";
import { CreateEmailLinkFlowReturn, CreateEnterpriseSSOLinkFlowReturn, StartEmailLinkFlowParams, StartEnterpriseSSOLinkFlowParams, VerificationResource } from "./verification.js";
import { EmailAddressJSONSnapshot } from "./snapshots.js";
import { IdentificationLinkResource } from "./identificationLink.js";

//#region src/types/emailAddress.d.ts
type PrepareEmailAddressVerificationParams = {
  strategy: EmailCodeStrategy;
} | {
  strategy: EmailLinkStrategy | EnterpriseSSOStrategy;
  redirectUrl: string;
};
type AttemptEmailAddressVerificationParams = {
  code: string;
};
interface EmailAddressResource extends ClerkResource {
  id: string;
  emailAddress: string;
  verification: VerificationResource;
  matchesSsoConnection: boolean;
  linkedTo: IdentificationLinkResource[];
  toString: () => string;
  prepareVerification: (params: PrepareEmailAddressVerificationParams) => Promise<EmailAddressResource>;
  attemptVerification: (params: AttemptEmailAddressVerificationParams) => Promise<EmailAddressResource>;
  createEmailLinkFlow: () => CreateEmailLinkFlowReturn<StartEmailLinkFlowParams, EmailAddressResource>;
  createEnterpriseSSOLinkFlow: () => CreateEnterpriseSSOLinkFlowReturn<StartEnterpriseSSOLinkFlowParams, EmailAddressResource>;
  destroy: () => Promise<void>;
  create: () => Promise<EmailAddressResource>;
  __internal_toSnapshot: () => EmailAddressJSONSnapshot;
}
//#endregion
export { AttemptEmailAddressVerificationParams, EmailAddressResource, PrepareEmailAddressVerificationParams };