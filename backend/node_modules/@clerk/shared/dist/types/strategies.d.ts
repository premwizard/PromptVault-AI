import { OAuthProvider } from "./oauth.js";
import { Web3Provider } from "./web3.js";

//#region src/types/strategies.d.ts
/** @inline */
type GoogleOneTapStrategy = 'google_one_tap';
/** @inline */
type AppleIdTokenStrategy = 'oauth_token_apple';
/** @inline */
type PasskeyStrategy = 'passkey';
/** @inline */
type PasswordStrategy = 'password';
/** @inline */
type PhoneCodeStrategy = 'phone_code';
/** @inline */
type EmailCodeStrategy = 'email_code';
/** @inline */
type EmailLinkStrategy = 'email_link';
/** @inline */
type TicketStrategy = 'ticket';
/** @inline */
type TOTPStrategy = 'totp';
/** @inline */
type BackupCodeStrategy = 'backup_code';
/** @inline */
type ResetPasswordPhoneCodeStrategy = 'reset_password_phone_code';
/** @inline */
type ResetPasswordEmailCodeStrategy = 'reset_password_email_code';
/** @inline */
type CustomOAuthStrategy = `oauth_custom_${string}`;
/** @inline */
type EnterpriseSSOStrategy = 'enterprise_sso';
/** OAuth-related authentication strategies (`oauth_<provider>` and custom OAuth). */
type OAuthStrategy = `oauth_${OAuthProvider}` | CustomOAuthStrategy;
/** @inline */
type Web3Strategy = `web3_${Web3Provider}_signature`;
//#endregion
export { AppleIdTokenStrategy, BackupCodeStrategy, CustomOAuthStrategy, EmailCodeStrategy, EmailLinkStrategy, EnterpriseSSOStrategy, GoogleOneTapStrategy, OAuthStrategy, PasskeyStrategy, PasswordStrategy, PhoneCodeStrategy, ResetPasswordEmailCodeStrategy, ResetPasswordPhoneCodeStrategy, TOTPStrategy, TicketStrategy, Web3Strategy };