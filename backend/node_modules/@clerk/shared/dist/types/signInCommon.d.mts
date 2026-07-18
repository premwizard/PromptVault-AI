import { AppleIdTokenStrategy, BackupCodeStrategy, EmailCodeStrategy, EmailLinkStrategy, EnterpriseSSOStrategy, GoogleOneTapStrategy, OAuthStrategy, PasskeyStrategy, PasswordStrategy, PhoneCodeStrategy, ResetPasswordEmailCodeStrategy, ResetPasswordPhoneCodeStrategy, TOTPStrategy, TicketStrategy, Web3Strategy } from "./strategies.mjs";
import { StartEmailLinkFlowParams } from "./verification.mjs";
import { BackupCodeAttempt, BackupCodeFactor, EmailCodeAttempt, EmailCodeConfig, EmailCodeFactor, EmailCodeSecondFactorConfig, EmailLinkConfig, EmailLinkFactor, EnterpriseSSOConfig, EnterpriseSSOFactor, OAuthConfig, OauthFactor, PassKeyConfig, PasskeyAttempt, PasskeyFactor, PasswordAttempt, PasswordFactor, PhoneCodeAttempt, PhoneCodeConfig, PhoneCodeFactor, PhoneCodeSecondFactorConfig, ResetPasswordEmailCodeAttempt, ResetPasswordEmailCodeFactor, ResetPasswordEmailCodeFactorConfig, ResetPasswordPhoneCodeAttempt, ResetPasswordPhoneCodeFactor, ResetPasswordPhoneCodeFactorConfig, TOTPAttempt, TOTPFactor, Web3Attempt, Web3SignatureConfig, Web3SignatureFactor } from "./factors.mjs";
import { EmailAddressIdentifier, PhoneNumberIdentifier, UsernameIdentifier, Web3WalletIdentifier } from "./identifiers.mjs";

//#region src/types/signInCommon.d.ts
type SignInStatus = 'needs_identifier' | 'needs_first_factor' | 'needs_second_factor' | 'needs_client_trust' | 'needs_new_password' | 'needs_protect_check' | 'complete';
type SignInIdentifier = UsernameIdentifier | EmailAddressIdentifier | PhoneNumberIdentifier | Web3WalletIdentifier;
type SignInFirstFactor = EmailCodeFactor | EmailLinkFactor | PhoneCodeFactor | PasswordFactor | PasskeyFactor | ResetPasswordPhoneCodeFactor | ResetPasswordEmailCodeFactor | Web3SignatureFactor | OauthFactor | EnterpriseSSOFactor;
type SignInSecondFactor = PhoneCodeFactor | TOTPFactor | BackupCodeFactor | EmailCodeFactor | EmailLinkFactor;
interface UserData {
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  hasImage?: boolean;
}
type SignInFactor = SignInFirstFactor | SignInSecondFactor;
type PrepareFirstFactorParams = EmailCodeConfig | EmailLinkConfig | PhoneCodeConfig | Web3SignatureConfig | PassKeyConfig | ResetPasswordPhoneCodeFactorConfig | ResetPasswordEmailCodeFactorConfig | OAuthConfig | EnterpriseSSOConfig;
type AttemptFirstFactorParams = PasskeyAttempt | EmailCodeAttempt | PhoneCodeAttempt | PasswordAttempt | Web3Attempt | ResetPasswordPhoneCodeAttempt | ResetPasswordEmailCodeAttempt;
type PrepareSecondFactorParams = PhoneCodeSecondFactorConfig | EmailCodeSecondFactorConfig | EmailLinkConfig;
type AttemptSecondFactorParams = PhoneCodeAttempt | TOTPAttempt | BackupCodeAttempt | EmailCodeAttempt;
type SignInCreateParams = ({
  strategy: OAuthStrategy | EnterpriseSSOStrategy;
  redirectUrl: string;
  actionCompleteRedirectUrl?: string;
  identifier?: string;
  oidcPrompt?: string;
  oidcLoginHint?: string;
} | {
  strategy: TicketStrategy;
  ticket: string;
} | {
  strategy: GoogleOneTapStrategy;
  token: string;
} | {
  strategy: AppleIdTokenStrategy;
  token: string;
} | {
  strategy: PasswordStrategy;
  password: string;
  identifier: string;
} | {
  strategy: PasskeyStrategy;
} | {
  strategy: PhoneCodeStrategy | EmailCodeStrategy | Web3Strategy | ResetPasswordEmailCodeStrategy | ResetPasswordPhoneCodeStrategy;
  identifier: string;
} | {
  strategy: EmailLinkStrategy;
  identifier: string;
  redirectUrl?: string;
} | {
  identifier: string;
} | {
  transfer?: boolean;
}) & {
  transfer?: boolean;
  signUpIfMissing?: boolean;
};
type ResetPasswordParams = {
  password: string;
  signOutOfOtherSessions?: boolean;
};
type AuthenticateWithPasskeyParams = {
  flow?: 'autofill' | 'discoverable';
};
interface SignInStartEmailLinkFlowParams extends StartEmailLinkFlowParams {
  emailAddressId: string;
}
type SignInStrategy = PasskeyStrategy | PasswordStrategy | ResetPasswordPhoneCodeStrategy | ResetPasswordEmailCodeStrategy | PhoneCodeStrategy | EmailCodeStrategy | EmailLinkStrategy | TicketStrategy | Web3Strategy | TOTPStrategy | BackupCodeStrategy | OAuthStrategy | EnterpriseSSOStrategy;
interface SignInAuthenticateWithSolanaParams {
  walletName: string;
}
//#endregion
export { AttemptFirstFactorParams, AttemptSecondFactorParams, AuthenticateWithPasskeyParams, PrepareFirstFactorParams, PrepareSecondFactorParams, ResetPasswordParams, SignInAuthenticateWithSolanaParams, SignInCreateParams, SignInFactor, SignInFirstFactor, SignInIdentifier, SignInSecondFactor, SignInStartEmailLinkFlowParams, SignInStatus, SignInStrategy, UserData };