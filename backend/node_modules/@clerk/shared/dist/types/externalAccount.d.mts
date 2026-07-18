import { ClerkResource } from "./resource.mjs";
import { OAuthProvider, OAuthScope } from "./oauth.mjs";
import { VerificationResource } from "./verification.mjs";
import { ExternalAccountJSONSnapshot } from "./snapshots.mjs";

//#region src/types/externalAccount.d.ts
type ReauthorizeExternalAccountParams = {
  additionalScopes?: OAuthScope[];
  redirectUrl?: string;
  oidcPrompt?: string;
  oidcLoginHint?: string;
};
interface ExternalAccountResource extends ClerkResource {
  id: string;
  identificationId: string;
  provider: OAuthProvider;
  providerUserId: string;
  emailAddress: string;
  approvedScopes: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  username?: string;
  phoneNumber?: string;
  publicMetadata: Record<string, unknown>;
  label?: string;
  verification: VerificationResource | null;
  reauthorize: (params: ReauthorizeExternalAccountParams) => Promise<ExternalAccountResource>;
  destroy: () => Promise<void>;
  providerSlug: () => OAuthProvider;
  providerTitle: () => string;
  accountIdentifier: () => string;
  __internal_toSnapshot: () => ExternalAccountJSONSnapshot;
}
//#endregion
export { ExternalAccountResource, ReauthorizeExternalAccountParams };