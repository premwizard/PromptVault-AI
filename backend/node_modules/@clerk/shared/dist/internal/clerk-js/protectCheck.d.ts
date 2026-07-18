import { ProtectCheckResource } from "../../types/signUpCommon.js";
//#region src/internal/clerk-js/protectCheck.d.ts
interface ExecuteProtectCheckOptions {
  /**
   * Host-provided visibility handshake, forwarded to the script verbatim as
   * `setWidgetVisible` in the init payload. The script calls it right before revealing UI in
   * the container (and with `false` once its widget is done); the returned promise resolves
   * only after the host has applied the change to the DOM (e.g. removed its own loading
   * spinner), so the script can sequence its reveal without a frame of overlap. A script that
   * knows its widget is imminent may call it immediately to avoid a spinner flash. Scripts
   * must treat the field as optional — older hosts don't provide it.
   */
  setWidgetVisible?: (visible: boolean) => Promise<void>;
  /**
   * Signals that the caller no longer needs the proof token (component unmounted, user
   * navigated away, etc.). When the signal aborts:
   *   - If the script has not yet been imported, `executeProtectCheck` rejects with
   *     `protect_check_aborted` without loading the script.
   *   - The signal is forwarded to the script as `{ signal }` in the second argument so
   *     cooperating SDKs can cancel any in-flight UI / network work.
   *   - Even if the script ignores the signal and resolves with a token, the helper
   *     re-checks `signal.aborted` after the await and rejects with `protect_check_aborted`
   *     so the caller never observes a "successful" abort.
   *
   * Scripts that don't honor the signal will continue to run; this is best-effort by design.
   */
  signal?: AbortSignal;
}
/**
 * Loads the Protect challenge SDK from `protectCheck.sdkUrl`, hands it the container element
 * and the spec-defined init payload (`token`, `uiHints`, `signal`), and returns the proof
 * token the SDK produces.
 *
 * The SDK script must:
 *   - Be a valid ES module served over HTTPS
 *   - Have a default export of the shape `(container, { token, uiHints, signal }) => Promise<string>`
 *   - Honor the `signal` to abort any pending work (best-effort)
 *
 * Only the minimal fields (`token`, optional `ui_hints`) are surfaced to the script — the
 * full sign-up/sign-in resource is intentionally NOT passed, to minimize the trust surface
 * granted to third-party Protect scripts.
 *
 * Failure modes are surfaced as `ClerkRuntimeError` with one of:
 *   - `protect_check_invalid_sdk_url` — URL fails the safety checks above
 *   - `protect_check_aborted` — caller aborted before or during execution
 *   - `protect_check_script_load_failed` — network error, CSP block, or invalid module
 *   - `protect_check_invalid_script` — module loaded but no callable default export
 *   - `protect_check_execution_failed` — the script's default export threw
 */
declare function executeProtectCheck(protectCheck: Pick<ProtectCheckResource, 'sdkUrl' | 'token' | 'uiHints'>, container: HTMLDivElement, options?: ExecuteProtectCheckOptions): Promise<string>;
//#endregion
export { ExecuteProtectCheckOptions, executeProtectCheck };