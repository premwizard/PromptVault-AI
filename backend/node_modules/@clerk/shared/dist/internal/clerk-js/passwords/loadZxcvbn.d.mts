import { ModuleManager } from "../../../moduleManager.mjs";
import { ZxcvbnResult } from "../../../types/passwords.mjs";
//#region src/internal/clerk-js/passwords/loadZxcvbn.d.ts
type zxcvbnFN = (password: string, userInputs?: (string | number)[]) => ZxcvbnResult;
declare const createLoadZxcvbn: (moduleManager: ModuleManager) => {
  loadZxcvbn: () => Promise<(password: string, userInputs?: (string | number)[]) => import("@zxcvbn-ts/core").ZxcvbnResult>;
};
//#endregion
export { createLoadZxcvbn, zxcvbnFN };