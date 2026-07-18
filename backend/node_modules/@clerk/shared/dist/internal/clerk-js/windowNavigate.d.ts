//#region src/internal/clerk-js/windowNavigate.d.ts
declare const CLERK_BEFORE_UNLOAD_EVENT = "clerk:beforeunload";
/**
 * Additional protocols can be provided using the `allowedRedirectProtocols` Clerk option.
 */
declare const ALLOWED_PROTOCOLS: string[];
type WindowNavigateOptions = {
  /**
   * Protocol allowlist applied to the resolved URL. Defaults to `ALLOWED_PROTOCOLS`. Pass an
   * extended list (e.g. `Clerk`'s `#allowedRedirectProtocols`) to honor the customer-supplied
   * `allowedRedirectProtocols` option.
   */
  allowedProtocols?: ReadonlyArray<string>;
};
/**
 * Helper utility to navigate via window.location.href. Also dispatches a clerk:beforeunload custom event.
 *
 * Navigations whose protocol is not in the allowlist (e.g. `javascript:`, `data:`) are aborted.
 * Scheme-relative inputs (`//host`, `\\host`) are also rejected: they adopt the base URL's scheme,
 * which is always in the allowlist, so they would otherwise pass the protocol check while
 * redirecting cross-origin.
 *
 * Callers that have already validated against an extended allowlist should pass it via
 * `options.allowedProtocols` so legitimate custom protocols (Wails, Tauri, etc.) are honored.
 *
 * @deprecated Use `clerk.__internal_windowNavigate` instead. It honors the customer-supplied
 * `allowedRedirectProtocols` option by default, so internal call sites can't accidentally
 * bypass it by forgetting to pass `options.allowedProtocols`. The bare export will be removed
 * in the next major version.
 */
declare function windowNavigate(to: URL | string, options?: WindowNavigateOptions): void;
//#endregion
export { ALLOWED_PROTOCOLS, CLERK_BEFORE_UNLOAD_EVENT, WindowNavigateOptions, windowNavigate };