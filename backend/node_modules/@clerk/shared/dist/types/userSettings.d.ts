import { ClerkResource } from "./resource.js";
import { OAuthStrategy, Web3Strategy } from "./strategies.js";
import { PhoneCodeChannel } from "./phoneCodeChannel.js";
import { UserSettingsJSONSnapshot } from "./snapshots.js";
import { ClerkResourceJSON } from "./json.js";

//#region src/types/userSettings.d.ts
type Attribute = 'email_address' | 'phone_number' | 'username' | 'first_name' | 'last_name' | 'password' | 'web3_wallet' | 'authenticator_app' | 'backup_code' | 'passkey';
type VerificationStrategy = 'email_link' | 'email_code' | 'phone_code' | 'totp' | 'backup_code';
type OAuthProviderSettings = {
  enabled: boolean;
  required: boolean;
  authenticatable: boolean;
  strategy: OAuthStrategy;
  name: string;
  logo_url: string | null;
};
type AttributeDataJSON = {
  enabled: boolean;
  required: boolean;
  immutable?: boolean;
  verifications: VerificationStrategy[];
  used_for_first_factor: boolean;
  first_factors: VerificationStrategy[];
  used_for_second_factor: boolean;
  second_factors: VerificationStrategy[];
  verify_at_sign_up: boolean;
  channels?: PhoneCodeChannel[];
};
type AttributeData = AttributeDataJSON & {
  name: Attribute;
};
type SignInData = {
  second_factor: {
    required: boolean;
    enabled: boolean;
  };
};
type SignUpModes = 'public' | 'restricted' | 'waitlist';
type SignUpData = {
  allowlist_only: boolean;
  progressive: boolean;
  captcha_enabled: boolean;
  mode: SignUpModes;
  legal_consent_enabled: boolean;
  mfa?: {
    required: boolean;
  };
};
type PasswordSettingsData = {
  allowed_special_characters: string;
  disable_hibp: boolean;
  min_length: number;
  max_length: number;
  require_special_char: boolean;
  require_numbers: boolean;
  require_uppercase: boolean;
  require_lowercase: boolean;
  show_zxcvbn: boolean;
  min_zxcvbn_strength: number;
};
type UsernameSettingsData = {
  min_length: number;
  max_length: number;
};
type PasskeySettingsData = {
  allow_autofill: boolean;
  show_sign_in_button: boolean;
};
type OAuthProviders = { [provider in OAuthStrategy]: OAuthProviderSettings };
type EnterpriseSSOSettings = {
  enabled: boolean;
  self_serve_sso: boolean;
};
type AttributesJSON = { [attribute in Attribute]: AttributeDataJSON };
type Attributes = { [attribute in Attribute]: AttributeData };
type Actions = {
  delete_self: boolean;
  create_organization: boolean;
};
interface UserSettingsJSON extends ClerkResourceJSON {
  id: never;
  object: never;
  attributes: AttributesJSON;
  actions: Actions;
  social: OAuthProviders;
  enterprise_sso: EnterpriseSSOSettings;
  sign_in: SignInData;
  sign_up: SignUpData;
  password_settings: PasswordSettingsData;
  passkey_settings: PasskeySettingsData;
  username_settings: UsernameSettingsData;
}
interface UserSettingsResource extends ClerkResource {
  id?: undefined;
  social: OAuthProviders;
  enterpriseSSO: EnterpriseSSOSettings;
  attributes: Attributes;
  actions: Actions;
  signIn: SignInData;
  signUp: SignUpData;
  passwordSettings: PasswordSettingsData;
  usernameSettings: UsernameSettingsData;
  passkeySettings: PasskeySettingsData;
  socialProviderStrategies: OAuthStrategy[];
  authenticatableSocialStrategies: OAuthStrategy[];
  web3FirstFactors: Web3Strategy[];
  alternativePhoneCodeChannels: PhoneCodeChannel[];
  enabledFirstFactorIdentifiers: Attribute[];
  instanceIsPasswordBased: boolean;
  hasValidAuthFactor: boolean;
  __internal_toSnapshot: () => UserSettingsJSONSnapshot;
}
//#endregion
export { Actions, Attribute, AttributeData, AttributeDataJSON, Attributes, AttributesJSON, EnterpriseSSOSettings, OAuthProviderSettings, OAuthProviders, PasskeySettingsData, PasswordSettingsData, SignInData, SignUpData, SignUpModes, UserSettingsJSON, UserSettingsResource, UsernameSettingsData, VerificationStrategy };