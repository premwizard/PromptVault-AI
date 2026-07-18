import { ClerkResource } from "./resource.js";
import { VerificationResource } from "./verification.js";
import { BackupCodeFactor, EmailCodeFactor, EnterpriseSSOFactor, PasskeyFactor, PasswordFactor, PhoneCodeFactor, TOTPFactor } from "./factors.js";
import { SessionResource } from "./session.js";

//#region src/types/sessionVerification.d.ts
interface SessionVerificationResource extends ClerkResource {
  status: SessionVerificationStatus;
  level: SessionVerificationLevel;
  session: SessionResource;
  firstFactorVerification: VerificationResource;
  secondFactorVerification: VerificationResource;
  supportedFirstFactors: SessionVerificationFirstFactor[] | null;
  supportedSecondFactors: SessionVerificationSecondFactor[] | null;
}
type SessionVerificationStatus = 'needs_first_factor' | 'needs_second_factor' | 'complete';
/**
 * @inline
 */
type SessionVerificationTypes = 'strict_mfa' | 'strict' | 'moderate' | 'lax';
/**
 * The `ReverificationConfig` type has the following properties:
 */
type ReverificationConfig = SessionVerificationTypes | {
  /**
   * The reverification level of credentials to check for.
   */
  level: SessionVerificationLevel;
  /**
   * The age of the factor level to check for. Value should be greater than or equal to 1 and less than 99,999.
   */
  afterMinutes: SessionVerificationAfterMinutes;
};
/**
 * @inline
 */
type SessionVerificationLevel = 'first_factor' | 'second_factor' | 'multi_factor';
type SessionVerificationAfterMinutes = number;
type SessionVerificationFirstFactor = EmailCodeFactor | PhoneCodeFactor | PasswordFactor | PasskeyFactor
/**
 * @experimental
 */
| EnterpriseSSOFactor;
type SessionVerificationSecondFactor = PhoneCodeFactor | TOTPFactor | BackupCodeFactor;
//#endregion
export { ReverificationConfig, SessionVerificationAfterMinutes, SessionVerificationFirstFactor, SessionVerificationLevel, SessionVerificationResource, SessionVerificationSecondFactor, SessionVerificationStatus, SessionVerificationTypes };