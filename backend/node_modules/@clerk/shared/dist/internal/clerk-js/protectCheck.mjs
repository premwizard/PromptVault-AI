import { t as ClerkRuntimeError } from "../../_chunks/clerkRuntimeError-DlesLWqO.mjs";
import "../../_chunks/error-uYOdvTDm.mjs";

//#region src/internal/clerk-js/protectCheck.ts
/**
* Validates the `sdk_url` returned by the server before passing it to dynamic `import()`.
*
* Rejects:
*   - Anything that fails URL parsing (relative paths, garbage strings)
*   - Non-`https:` schemes — including `http:`, `data:`, `blob:`, `javascript:`. The server
*     always returns an HTTPS URL, but the dynamic-import primitive accepts `data:`/`blob:`
*     modules which would let a tampered response inject arbitrary code into the host page.
*   - URLs containing credentials (`user:pass@host`) — phishing surface, no legitimate use.
*
* Throws `ClerkRuntimeError` with code `protect_check_invalid_sdk_url`. We deliberately do
* NOT silently strip an invalid `protect_check` from the resource: the gate must remain
* present so the user can't bypass it by manipulating the response. Fail-closed.
*/
function assertValidSdkUrl(sdkUrl) {
	let parsed;
	try {
		parsed = new URL(sdkUrl);
	} catch {
		throw new ClerkRuntimeError("Protect check sdk_url is not a valid URL", { code: "protect_check_invalid_sdk_url" });
	}
	if (parsed.protocol !== "https:") throw new ClerkRuntimeError("Protect check sdk_url must use HTTPS", { code: "protect_check_invalid_sdk_url" });
	if (parsed.username || parsed.password) throw new ClerkRuntimeError("Protect check sdk_url must not contain credentials", { code: "protect_check_invalid_sdk_url" });
	return parsed;
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
async function executeProtectCheck(protectCheck, container, options = {}) {
	const { signal, setWidgetVisible } = options;
	const { sdkUrl, token, uiHints } = protectCheck;
	const validated = assertValidSdkUrl(sdkUrl);
	if (signal?.aborted) throw new ClerkRuntimeError("Protect check aborted by caller", { code: "protect_check_aborted" });
	let mod;
	try {
		mod = await import(
			/* webpackIgnore: true */
			validated.toString()
);
	} catch {
		throw new ClerkRuntimeError("Protect check script failed to load. This is commonly caused by a Content Security Policy that blocks the script origin (add it to your script-src directive), a network error, or an invalid module.", { code: "protect_check_script_load_failed" });
	}
	if (signal?.aborted) throw new ClerkRuntimeError("Protect check aborted by caller", { code: "protect_check_aborted" });
	if (typeof mod.default !== "function") throw new ClerkRuntimeError("Protect check script does not export a default function", { code: "protect_check_invalid_script" });
	let proofToken;
	try {
		proofToken = await mod.default(container, {
			token,
			uiHints,
			signal,
			setWidgetVisible
		});
	} catch (err) {
		const looksLikeAbort = err instanceof Error && err.name === "AbortError";
		if (signal?.aborted && looksLikeAbort) throw new ClerkRuntimeError("Protect check aborted by caller", { code: "protect_check_aborted" });
		throw new ClerkRuntimeError(`Protect check script execution failed: ${err instanceof Error ? err.message : String(err)}`, { code: "protect_check_execution_failed" });
	}
	if (signal?.aborted) throw new ClerkRuntimeError("Protect check aborted by caller", { code: "protect_check_aborted" });
	return proofToken;
}

//#endregion
export { executeProtectCheck };
//# sourceMappingURL=protectCheck.mjs.map