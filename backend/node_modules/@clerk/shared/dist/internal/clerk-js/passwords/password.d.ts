import { PasswordSettingsData } from "../../../types/userSettings.js";
import { ValidatePasswordCallbacks, ZxcvbnResult } from "../../../types/passwords.js";
//#region src/internal/clerk-js/passwords/password.d.ts
type zxcvbnFN = (password: string, userInputs?: (string | number)[]) => ZxcvbnResult;
type UsePasswordConfig = PasswordSettingsData & {
  validatePassword: boolean;
};
type UsePasswordCbs = {
  onValidationError?: (error: string | undefined) => void;
  onValidationSuccess?: () => void;
  onValidationWarning?: (warning: string) => void;
  onValidationInfo?: (info: string) => void;
  onValidationComplexity?: (b: boolean) => void;
};
declare const createValidatePassword: (loadZxcvbn: () => Promise<zxcvbnFN>, config: UsePasswordConfig, callbacks?: ValidatePasswordCallbacks) => (password: string, internalCallbacks?: ValidatePasswordCallbacks) => void;
//#endregion
export { UsePasswordCbs, UsePasswordConfig, createValidatePassword };