import { PasswordSettingsData } from "./userSettings.mjs";

//#region src/types/passwords.d.ts
interface ZxcvbnResult {
  feedback: {
    warning: string | null;
    suggestions: string[];
  };
  score: 0 | 1 | 2 | 3 | 4;
  password: string;
  guesses: number;
  guessesLog10: number;
  calcTime: number;
}
type ComplexityErrors = { [key in keyof Partial<Omit<PasswordSettingsData, 'disable_hibp' | 'min_zxcvbn_strength' | 'show_zxcvbn'>>]?: boolean };
type PasswordValidation = {
  complexity?: ComplexityErrors;
  strength?: PasswordStrength;
};
type ValidatePasswordCallbacks = {
  onValidation?: (res: PasswordValidation) => void;
  onValidationComplexity?: (b: boolean) => void;
};
type PasswordStrength<T = ZxcvbnResult> = {
  state: 'excellent';
  result: T;
} | {
  state: 'pass' | 'fail';
  keys: string[];
  result: T;
};
//#endregion
export { ComplexityErrors, PasswordStrength, PasswordValidation, ValidatePasswordCallbacks, ZxcvbnResult };