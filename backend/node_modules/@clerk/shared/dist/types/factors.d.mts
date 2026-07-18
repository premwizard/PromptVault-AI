import { BackupCodeStrategy, EmailCodeStrategy, EmailLinkStrategy, EnterpriseSSOStrategy, OAuthStrategy, PasskeyStrategy, PasswordStrategy, PhoneCodeStrategy, ResetPasswordEmailCodeStrategy, ResetPasswordPhoneCodeStrategy, TOTPStrategy, Web3Strategy } from "./strategies.mjs";
import { PhoneCodeChannel } from "./phoneCodeChannel.mjs";
import { PublicKeyCredentialWithAuthenticatorAssertionResponse } from "./passkey.mjs";

//#region src/types/factors.d.ts
/** @generateWithEmptyComment */
type EmailCodeFactor = {
  /**
   * The strategy type.
   */
  strategy: EmailCodeStrategy;
  /**
   * The ID of the email address used for the email code factor.
   */
  emailAddressId: string;
  /**
   * The identifier provided by the user, but masked for security reasons.
   */
  safeIdentifier: string;
  /**
   * Indicates whether the email address is set as the primary email address, as multiple can be added to a user's profile.
   */
  primary?: boolean;
};
/** @generateWithEmptyComment */
type EmailLinkFactor = {
  /**
   * The strategy type.
   */
  strategy: EmailLinkStrategy;
  /**
   * The ID of the email address used for the email link factor.
   */
  emailAddressId: string;
  /**
   * The identifier provided by the user, but masked for security reasons.
   */
  safeIdentifier: string;
  /**
   * Indicates whether the email address is set as the primary email address, as multiple can be added to a user's profile.
   */
  primary?: boolean;
};
/** @generateWithEmptyComment */
type PhoneCodeFactor = {
  /**
   * The strategy type.
   */
  strategy: PhoneCodeStrategy;
  /**
   * The ID of the phone number used for the phone code factor.
   */
  phoneNumberId: string;
  /**
   * The identifier provided by the user, but masked for security reasons.
   */
  safeIdentifier: string;
  /**
   * Indicates whether the phone number is set as the primary phone number, as multiple can be added to a user's profile.
   */
  primary?: boolean;
  /**
   * Indicates whether the phone number is set as the default identifier.
   */
  default?: boolean;
  /**
   * The channel used for the phone code factor.
   */
  channel?: PhoneCodeChannel;
};
/** @generateWithEmptyComment */
type Web3SignatureFactor = {
  /**
   * The strategy type.
   */
  strategy: Web3Strategy;
  /**
   * The ID of the Web3 Wallet.
   */
  web3WalletId: string;
  /**
   * Indicates whether the Web3 Wallet is set as the primary Web3 Wallet, as multiple can be added to a user's profile.
   */
  primary?: boolean;
  /**
   * The name of the Web3 Wallet.
   */
  walletName?: string;
};
/** @inline */
type PasswordFactor = {
  strategy: PasswordStrategy;
};
/** @inline */
type PasskeyFactor = {
  strategy: PasskeyStrategy;
};
/** @inline */
type OauthFactor = {
  strategy: OAuthStrategy;
};
/** @generateWithEmptyComment */
type EnterpriseSSOFactor = {
  /**
   * The strategy type.
   */
  strategy: EnterpriseSSOStrategy;
  /**
   * The ID of the enterprise connection.
   * @experimental
   */
  enterpriseConnectionId?: string;
  /**
   * The name of the enterprise connection.
   * @experimental
   */
  enterpriseConnectionName?: string;
};
/** @inline */
type TOTPFactor = {
  strategy: TOTPStrategy;
};
/** @inline */
type BackupCodeFactor = {
  strategy: BackupCodeStrategy;
};
/** @generateWithEmptyComment */
type ResetPasswordPhoneCodeFactor = {
  /**
   * The strategy type.
   */
  strategy: ResetPasswordPhoneCodeStrategy;
  /**
   * The ID of the phone number used for the reset password phone code factor.
   */
  phoneNumberId: string;
  /**
   * The identifier provided by the user, but masked for security reasons.
   */
  safeIdentifier: string;
  /**
   * Indicates whether the phone number is set as the primary phone number, as multiple can be added to a user's profile.
   */
  primary?: boolean;
};
/** @generateWithEmptyComment */
type ResetPasswordEmailCodeFactor = {
  /**
   * The strategy type.
   */
  strategy: ResetPasswordEmailCodeStrategy;
  /**
   * The ID of the email address used for the reset password email code factor.
   */
  emailAddressId: string;
  /**
   * The identifier provided by the user, but masked for security reasons.
   */
  safeIdentifier: string;
  /**
   * Indicates whether the email address is set as the primary email address, as multiple can be added to a user's profile.
   */
  primary?: boolean;
};
/** @generateWithEmptyComment */
type ResetPasswordCodeFactor = ResetPasswordEmailCodeFactor | ResetPasswordPhoneCodeFactor;
/** @generateWithEmptyComment */
type ResetPasswordPhoneCodeFactorConfig = Omit<ResetPasswordPhoneCodeFactor, 'safeIdentifier'>;
/** @generateWithEmptyComment */
type ResetPasswordEmailCodeFactorConfig = Omit<ResetPasswordEmailCodeFactor, 'safeIdentifier'>;
/** @generateWithEmptyComment */
type EmailCodeConfig = Omit<EmailCodeFactor, 'safeIdentifier'>;
/** @generateWithEmptyComment */
type EmailLinkConfig = Omit<EmailLinkFactor, 'safeIdentifier'> & {
  /**
   * The URL to redirect to after the email link is clicked.
   */
  redirectUrl: string;
};
/** @generateWithEmptyComment */
type PhoneCodeConfig = Omit<PhoneCodeFactor, 'safeIdentifier'>;
/** @generateWithEmptyComment */
type Web3SignatureConfig = Web3SignatureFactor;
/** @inline */
type PassKeyConfig = PasskeyFactor;
/** @generateWithEmptyComment */
type OAuthConfig = OauthFactor & {
  /**
   * The URL to redirect to after the OAuth flow is completed.
   */
  redirectUrl: string; /** @generateWithEmptyComment */
  actionCompleteRedirectUrl: string;
  /**
   * The OIDC prompt parameter to use for the OAuth flow.
   */
  oidcPrompt?: string;
  /**
   * The OIDC login hint parameter to use for the OAuth flow.
   */
  oidcLoginHint?: string;
};
/** @generateWithEmptyComment */
type EnterpriseSSOConfig = EnterpriseSSOFactor & {
  /**
   * The URL to redirect to after the OAuth flow is completed.
   */
  redirectUrl: string; /** @generateWithEmptyComment */
  actionCompleteRedirectUrl: string;
  /**
   * The OIDC prompt parameter to use for the OAuth flow.
   */
  oidcPrompt?: string;
  /**
   * The ID of the email address used for the enterprise SSO factor.
   * @experimental
   */
  emailAddressId?: string;
  /**
   * The ID of the enterprise connection used for the enterprise SSO factor.
   * @experimental
   */
  enterpriseConnectionId?: string;
};
type PhoneCodeSecondFactorConfig = {
  /**
   * The strategy type.
   */
  strategy: PhoneCodeStrategy;
  /**
   * The ID of the phone number used for the phone code second factor.
   */
  phoneNumberId?: string;
};
type EmailCodeSecondFactorConfig = {
  /**
   * The strategy type.
   */
  strategy: EmailCodeStrategy;
  /**
   * The ID of the email address used for the email code second factor.
   */
  emailAddressId?: string;
};
/** @generateWithEmptyComment */
type EmailCodeAttempt = {
  /**
   * The strategy type.
   */
  strategy: EmailCodeStrategy;
  /**
   * The one-time code sent to the user's email.
   */
  code: string;
};
/** @generateWithEmptyComment */
type PhoneCodeAttempt = {
  /**
   * The strategy type.
   */
  strategy: PhoneCodeStrategy;
  /**
   * The one-time code sent via SMS.
   */
  code: string;
};
/** @generateWithEmptyComment */
type PasswordAttempt = {
  /**
   * The strategy type.
   */
  strategy: PasswordStrategy;
  /**
   * The user's password.
   */
  password: string;
};
/** @generateWithEmptyComment */
type PasskeyAttempt = {
  /**
   * The strategy type.
   */
  strategy: PasskeyStrategy;
  /**
   * The Web Authentication assertion returned by the browser.
   */
  publicKeyCredential: PublicKeyCredentialWithAuthenticatorAssertionResponse;
};
/** @generateWithEmptyComment */
type Web3Attempt = {
  /**
   * The strategy type.
   */
  strategy: Web3Strategy;
  /**
   * The signature of the Web3 transaction.
   */
  signature: string;
};
/** @generateWithEmptyComment */
type TOTPAttempt = {
  /**
   * The strategy type.
   */
  strategy: TOTPStrategy;
  /**
   * The code generated by the authenticator app.
   */
  code: string;
};
/** @generateWithEmptyComment */
type BackupCodeAttempt = {
  /**
   * The strategy type.
   */
  strategy: BackupCodeStrategy;
  /**
   * The backup code.
   */
  code: string;
};
/** @generateWithEmptyComment */
type ResetPasswordPhoneCodeAttempt = {
  /**
   * The strategy type.
   */
  strategy: ResetPasswordPhoneCodeStrategy;
  /**
   * The one-time code sent via SMS.
   */
  code: string;
  /**
   * The password provided by the user.
   */
  password?: string;
};
/** @generateWithEmptyComment */
type ResetPasswordEmailCodeAttempt = {
  /**
   * The strategy type.
   */
  strategy: ResetPasswordEmailCodeStrategy;
  /**
   * The one-time code sent to the user's email.
   */
  code: string;
  /**
   * The password provided by the user.
   */
  password?: string;
};
//#endregion
export { BackupCodeAttempt, BackupCodeFactor, EmailCodeAttempt, EmailCodeConfig, EmailCodeFactor, EmailCodeSecondFactorConfig, EmailLinkConfig, EmailLinkFactor, EnterpriseSSOConfig, EnterpriseSSOFactor, OAuthConfig, OauthFactor, PassKeyConfig, PasskeyAttempt, PasskeyFactor, PasswordAttempt, PasswordFactor, PhoneCodeAttempt, PhoneCodeConfig, PhoneCodeFactor, PhoneCodeSecondFactorConfig, ResetPasswordCodeFactor, ResetPasswordEmailCodeAttempt, ResetPasswordEmailCodeFactor, ResetPasswordEmailCodeFactorConfig, ResetPasswordPhoneCodeAttempt, ResetPasswordPhoneCodeFactor, ResetPasswordPhoneCodeFactorConfig, TOTPAttempt, TOTPFactor, Web3Attempt, Web3SignatureConfig, Web3SignatureFactor };