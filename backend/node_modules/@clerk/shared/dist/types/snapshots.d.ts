import { Nullable, Override } from "./utils.js";
import { CommerceSettingsJSON } from "./commerceSettings.js";
import { DisplayConfigJSON } from "./displayConfig.js";
import { OrganizationCreationDefaultsJSON } from "./organizationCreationDefaults.js";
import { OrganizationSettingsJSON } from "./organizationSettings.js";
import { ProtectConfigJSON } from "./protectConfig.js";
import { UserSettingsJSON } from "./userSettings.js";
import { SignInJSON } from "./signIn.js";
import { APIKeysSettingsJSON } from "./apiKeysSettings.js";
import { AuthConfigJSON, ClientJSON, ClientTrustState, EmailAddressJSON, EnterpriseAccountConnectionJSON, EnterpriseAccountJSON, EnvironmentJSON, ExternalAccountJSON, IdentificationLinkJSON, OrganizationJSON, OrganizationMembershipJSON, PasskeyJSON, PhoneNumberJSON, PublicUserDataJSON, SessionJSON, SignUpJSON, SignUpVerificationJSON, SignUpVerificationsJSON, TokenJSON, UserDataJSON, UserJSON, VerificationJSON, Web3WalletJSON } from "./json.js";

//#region src/types/snapshots.d.ts
type SignInJSONSnapshot = Override<Nullable<SignInJSON, 'status' | 'identifier' | 'supported_first_factors' | 'supported_second_factors'>, {
  first_factor_verification: VerificationJSONSnapshot;
  second_factor_verification: VerificationJSONSnapshot;
  user_data: UserDataJSONSnapshot;
  client_trust_state?: ClientTrustState;
}>;
type VerificationJSONSnapshot = Nullable<VerificationJSON, 'status' | 'verified_at_client' | 'strategy' | 'nonce' | 'message' | 'external_verification_redirect_url' | 'attempts' | 'expire_at'>;
type UserDataJSONSnapshot = Nullable<UserDataJSON, 'image_url' | 'has_image'>;
type UserJSONSnapshot = Override<Nullable<UserJSON, 'external_id' | 'primary_email_address_id' | 'primary_phone_number_id' | 'primary_web3_wallet_id' | 'username' | 'first_name' | 'last_name' | 'updated_at' | 'created_at'>, {
  external_accounts: ExternalAccountJSONSnapshot[];
  email_addresses: EmailAddressJSONSnapshot[];
  passkeys: PasskeyJSONSnapshot[];
  enterprise_accounts: EnterpriseAccountJSONSnapshot[];
  phone_numbers: PhoneNumberJSONSnapshot[];
  web3_wallets: Web3WalletJSONSnapshot[];
}>;
type ExternalAccountJSONSnapshot = Override<ExternalAccountJSON, {
  verification: VerificationJSONSnapshot | null;
}>;
type SessionJSONSnapshot = Override<Nullable<SessionJSON, 'last_active_at' | 'last_active_token'>, {
  user: UserJSONSnapshot | null;
}>;
type SignUpJSONSnapshot = Override<Nullable<SignUpJSON, 'status'>, {
  verifications: SignUpVerificationsJSONSnapshot;
}>;
type ClientJSONSnapshot = Override<Nullable<ClientJSON, 'created_at' | 'updated_at'>, {
  sign_up: SignUpJSONSnapshot;
  sign_in: SignInJSONSnapshot;
  sessions: SessionJSONSnapshot[];
}>;
type AuthConfigJSONSnapshot = AuthConfigJSON;
type EnvironmentJSONSnapshot = EnvironmentJSON;
type DisplayConfigJSONSnapshot = DisplayConfigJSON;
type ProtectConfigJSONSnapshot = ProtectConfigJSON;
type EmailAddressJSONSnapshot = Override<EmailAddressJSON, {
  verification: VerificationJSONSnapshot | null;
}>;
type EnterpriseAccountJSONSnapshot = Override<EnterpriseAccountJSON, {
  verification: VerificationJSONSnapshot | null;
}>;
type EnterpriseAccountConnectionJSONSnapshot = EnterpriseAccountConnectionJSON;
type IdentificationLinkJSONSnapshot = IdentificationLinkJSON;
type OrganizationJSONSnapshot = OrganizationJSON;
type OrganizationMembershipJSONSnapshot = OrganizationMembershipJSON;
type OrganizationSettingsJSONSnapshot = OrganizationSettingsJSON;
type OrganizationCreationDefaultsJSONSnapshot = OrganizationCreationDefaultsJSON;
type PasskeyJSONSnapshot = Override<PasskeyJSON, {
  verification: VerificationJSONSnapshot | null;
}>;
type PhoneNumberJSONSnapshot = Override<PhoneNumberJSON, {
  verification: VerificationJSONSnapshot;
}>;
type SignUpVerificationsJSONSnapshot = Override<SignUpVerificationsJSON, {
  external_account: VerificationJSONSnapshot;
  web3_wallet: SignUpVerificationJSONSnapshot;
  email_address: SignUpVerificationJSONSnapshot;
  phone_number: SignUpVerificationJSONSnapshot;
}>;
type SignUpVerificationJSONSnapshot = Pick<SignUpVerificationJSON, 'next_action' | 'supported_strategies'> & VerificationJSONSnapshot;
type TokenJSONSnapshot = TokenJSON;
type UserSettingsJSONSnapshot = UserSettingsJSON;
type Web3WalletJSONSnapshot = Override<Web3WalletJSON, {
  verification: VerificationJSONSnapshot | null;
}>;
type PublicUserDataJSONSnapshot = PublicUserDataJSON;
type CommerceSettingsJSONSnapshot = CommerceSettingsJSON;
type APIKeysSettingsJSONSnapshot = APIKeysSettingsJSON;
//#endregion
export { APIKeysSettingsJSONSnapshot, AuthConfigJSONSnapshot, ClientJSONSnapshot, CommerceSettingsJSONSnapshot, DisplayConfigJSONSnapshot, EmailAddressJSONSnapshot, EnterpriseAccountConnectionJSONSnapshot, EnterpriseAccountJSONSnapshot, EnvironmentJSONSnapshot, ExternalAccountJSONSnapshot, IdentificationLinkJSONSnapshot, OrganizationCreationDefaultsJSONSnapshot, OrganizationJSONSnapshot, OrganizationMembershipJSONSnapshot, OrganizationSettingsJSONSnapshot, PasskeyJSONSnapshot, PhoneNumberJSONSnapshot, ProtectConfigJSONSnapshot, PublicUserDataJSONSnapshot, SessionJSONSnapshot, SignInJSONSnapshot, SignUpJSONSnapshot, SignUpVerificationJSONSnapshot, SignUpVerificationsJSONSnapshot, TokenJSONSnapshot, UserDataJSONSnapshot, UserJSONSnapshot, UserSettingsJSONSnapshot, VerificationJSONSnapshot, Web3WalletJSONSnapshot };