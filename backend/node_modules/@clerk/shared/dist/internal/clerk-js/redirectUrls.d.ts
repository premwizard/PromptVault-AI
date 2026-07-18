import { RedirectOptions } from "../../types/redirects.js";
import { ClerkOptions } from "../../types/clerk.js";
//#region src/internal/clerk-js/redirectUrls.d.ts
type ComponentMode = 'modal' | 'mounted';
declare class RedirectUrls {
  #private;
  private static keys;
  private static preserved;
  private readonly options;
  private readonly fromOptions;
  private readonly fromProps;
  private readonly fromSearchParams;
  private readonly mode?;
  constructor(options: ClerkOptions, props?: RedirectOptions, searchParams?: any, mode?: ComponentMode);
  getAfterSignInUrl(): string;
  getAfterSignUpUrl(): string;
  getPreservedSearchParams(): URLSearchParams;
  toSearchParams(): URLSearchParams;
}
//#endregion
export { RedirectUrls };