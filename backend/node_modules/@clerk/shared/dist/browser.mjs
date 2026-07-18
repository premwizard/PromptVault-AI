//#region src/browser.ts
/**
* Checks if the window object is defined. You can also use this to check if something is happening on the client side.
*
* @returns
*/
function inBrowser() {
	return typeof window !== "undefined";
}
const botAgentRegex = new RegExp([
	"bot",
	"spider",
	"crawl",
	"APIs-Google",
	"AdsBot",
	"Googlebot",
	"mediapartners",
	"Google Favicon",
	"FeedFetcher",
	"Google-Read-Aloud",
	"DuplexWeb-Google",
	"googleweblight",
	"bing",
	"yandex",
	"baidu",
	"duckduck",
	"yahoo",
	"ecosia",
	"ia_archiver",
	"facebook",
	"instagram",
	"pinterest",
	"reddit",
	"slack",
	"twitter",
	"whatsapp",
	"youtube",
	"semrush"
].join("|"), "i");
/**
* Checks if the user agent is a bot.
*
* @param userAgent - Any user agent string
* @returns
*/
function userAgentIsRobot(userAgent) {
	return !userAgent ? false : botAgentRegex.test(userAgent);
}
/**
* Server-side runtimes with worker-like globals self-identify in `navigator.userAgent`
* (`Cloudflare-Workers`, `Node.js/24`, `Deno/2.5.0`, `Bun/1.3.9`). Today workerd's `self`
* does not satisfy `instanceof WorkerGlobalScope` (even though it exposes the constructor),
* so the scope gate alone happens to exclude it, but that is an implementation detail of
* workerd's prototype chain, not a guarantee. Excluding self-identified server runtimes by
* user agent keeps these heuristics server-false even if such a runtime becomes fully
* spec-compliant about its worker scope.
*/
const serverRuntimeUserAgentRegex = /^(Cloudflare-Workers|Node\.js|Deno|Bun)\b/i;
/**
* Resolves the `Navigator` object from either the DOM `window` (standard browsers)
* or a Web/Service Worker global scope. An MV3 extension background service worker
* has no `window`, but runs inside a `WorkerGlobalScope` that exposes a
* `WorkerNavigator` as `self.navigator` with the `onLine`/`userAgent` properties
* our heuristics rely on.
*
* We intentionally gate the worker fallback on a real `WorkerGlobalScope` rather than
* accepting any global `navigator`. Modern Node exposes `globalThis.navigator`, so a
* blanket global-navigator check would make Node SSR look like a browser; requiring a
* `WorkerGlobalScope` keeps SSR returning `null`.
*
* @returns
*/
function getNavigator() {
	if (typeof window !== "undefined" && window.navigator) return window.navigator;
	const workerScope = globalThis;
	if (typeof workerScope.WorkerGlobalScope === "function" && workerScope.self instanceof workerScope.WorkerGlobalScope && workerScope.self.navigator && !serverRuntimeUserAgentRegex.test(workerScope.self.navigator.userAgent ?? "")) return workerScope.self.navigator;
	return null;
}
/**
* Checks if the current environment is a browser and the user agent is not a bot.
*
* @returns
*/
function isValidBrowser() {
	const navigator = getNavigator();
	if (!navigator) return false;
	return !userAgentIsRobot(navigator?.userAgent) && !navigator?.webdriver;
}
/**
* Checks if the current environment is a browser and if the navigator is online.
*
* @returns
*/
function isBrowserOnline() {
	const navigator = getNavigator();
	if (!navigator) return false;
	if (typeof navigator.onLine !== "boolean") return true;
	return !!navigator.onLine;
}
/**
* Runs `isBrowserOnline` and `isValidBrowser` to check if the current environment is a valid browser and if the navigator is online.
*
* @returns
*/
function isValidBrowserOnline() {
	return isBrowserOnline() && isValidBrowser();
}

//#endregion
export { inBrowser, isBrowserOnline, isValidBrowser, isValidBrowserOnline, userAgentIsRobot };
//# sourceMappingURL=browser.mjs.map