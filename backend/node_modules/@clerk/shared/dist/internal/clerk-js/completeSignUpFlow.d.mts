import { SignUpResource } from "../../types/signUp.mjs";
//#region src/internal/clerk-js/completeSignUpFlow.d.ts
type CompleteSignUpFlowProps = {
  signUp: SignUpResource;
  verifyEmailPath?: string;
  verifyPhonePath?: string;
  protectCheckPath?: string;
  continuePath?: string;
  navigate: (to: string, options?: {
    searchParams?: URLSearchParams;
  }) => Promise<unknown>;
  handleComplete?: () => Promise<void>;
  redirectUrl?: string;
  redirectUrlComplete?: string;
  oidcPrompt?: string;
};
declare const completeSignUpFlow: ({
  signUp,
  verifyEmailPath,
  verifyPhonePath,
  protectCheckPath,
  continuePath,
  navigate,
  handleComplete,
  redirectUrl,
  redirectUrlComplete,
  oidcPrompt
}: CompleteSignUpFlowProps) => Promise<unknown> | undefined;
//#endregion
export { completeSignUpFlow };