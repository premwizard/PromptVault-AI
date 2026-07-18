import { ClerkResource } from "./resource.js";
import { OAuthProvider } from "./oauth.js";
import { VerificationResource } from "./verification.js";
import { EnterpriseAccountConnectionJSONSnapshot, EnterpriseAccountJSONSnapshot } from "./snapshots.js";
import { SamlIdpSlug } from "./saml.js";

//#region src/types/enterpriseAccount.d.ts
type EnterpriseProtocol = 'saml' | 'oauth';
type EnterpriseProvider = SamlIdpSlug | `oauth_${OAuthProvider}`;
interface EnterpriseAccountResource extends ClerkResource {
  active: boolean;
  emailAddress: string;
  enterpriseConnection: EnterpriseAccountConnectionResource | null;
  enterpriseConnectionId: string | null;
  firstName: string | null;
  lastName: string | null;
  protocol: EnterpriseProtocol;
  provider: EnterpriseProvider;
  providerUserId: string | null;
  publicMetadata: Record<string, unknown> | null;
  verification: VerificationResource | null;
  lastAuthenticatedAt: Date | null;
  destroy: () => Promise<void>;
  __internal_toSnapshot: () => EnterpriseAccountJSONSnapshot;
}
interface EnterpriseAccountConnectionResource extends ClerkResource {
  active: boolean;
  allowIdpInitiated: boolean;
  allowSubdomains: boolean;
  disableAdditionalIdentifications: boolean;
  domain: string;
  logoPublicUrl: string | null;
  name: string;
  protocol: EnterpriseProtocol;
  provider: EnterpriseProvider;
  syncUserAttributes: boolean;
  allowOrganizationAccountLinking: boolean;
  enterpriseConnectionId: string | null;
  __internal_toSnapshot: () => EnterpriseAccountConnectionJSONSnapshot;
}
//#endregion
export { EnterpriseAccountConnectionResource, EnterpriseAccountResource, EnterpriseProtocol, EnterpriseProvider };