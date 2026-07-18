const require_runtimeEnvironment = require('../utils/runtimeEnvironment.js');
const require_underscore = require('../underscore.js');

//#region src/telemetry/notice.ts
/**
* One-time runtime disclosure that Clerk collects telemetry from development instances.
*
* Replaces the previous `postinstall` script. Disclosure is intentionally surfaced
* only on Node (server-side) so the noise profile matches the original postinstall
* (terminal-only, dev-eyes-only). Browser consoles are not used because they are
* frequently observed by non-developers (QA, screenshots, demos), and adding another
* console warning is a common source of customer complaints.
*
* Known gap: pure browser-only setups with no server-side Clerk runtime (e.g. a Vite
* SPA using `@clerk/clerk-react` or `@clerk/clerk-js` directly, without any Node/Edge
* backend that imports `@clerk/shared`) will never hit this code path and therefore
* see no in-band disclosure. This is an accepted trade-off: the original postinstall
* already fired only once at install time and was easily missed, so the practical
* delta is small. Authoritative disclosure for those setups lives in the Clerk
* telemetry docs (https://clerk.com/docs/telemetry). Opt-out continues to work the
* same way (`telemetry={false}` on `<ClerkProvider>` or the framework-specific
* `*_CLERK_TELEMETRY_DISABLED` env var).
*
* Persistence is in-process via a `globalThis` Symbol, which survives Next.js HMR
* module reloads. No filesystem access, no `node:` imports, no dynamic-code APIs, so
* the module remains safe to bundle for Edge Runtime, Workers, and any browser path.
*
* All work is wrapped in try/catch. Failure to display the notice must never affect
* the SDK.
*/
const PROCESS_FLAG = Symbol.for("@clerk/shared.telemetryNoticeShown");
const NOTICE_LINES = [
	"Attention: Clerk collects telemetry data from its SDKs when connected to development instances.",
	"The data collected is used to inform Clerk's product roadmap.",
	"To learn more, including how to opt-out from the telemetry program, visit: https://clerk.com/docs/telemetry."
];
function isServerRuntime() {
	if (typeof window !== "undefined") return false;
	if (typeof globalThis.EdgeRuntime !== "undefined") return false;
	return true;
}
function isCI() {
	if (typeof process === "undefined" || !process.env) return false;
	return require_runtimeEnvironment.automatedEnvironmentVariables.some((name) => require_underscore.isTruthy(process.env[name]));
}
function hasSeen() {
	return Boolean(globalThis[PROCESS_FLAG]);
}
function markSeen() {
	globalThis[PROCESS_FLAG] = true;
}
function printNotice() {
	if (typeof console === "undefined" || typeof console.log !== "function") return;
	for (const line of NOTICE_LINES) console.log(line);
	console.log("");
}
/**
* Display the one-time telemetry disclosure on server runtimes if it has not already been
* shown in this process. Browser and Edge Runtime callers are silently skipped. Never throws.
*/
function maybeShowTelemetryNotice(options = {}) {
	if (options.skip) return;
	try {
		if (!isServerRuntime()) return;
		if (isCI()) return;
		if (hasSeen()) return;
		printNotice();
		markSeen();
	} catch {}
}

//#endregion
exports.maybeShowTelemetryNotice = maybeShowTelemetryNotice;