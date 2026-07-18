import { isProductionFromPublishableKey } from "./keys.mjs";
import { isTruthy } from "./underscore.mjs";

//#region src/proxy.ts
/**
*
*/
function isValidProxyUrl(key) {
	if (!key) return true;
	return isHttpOrHttps(key) || isProxyUrlRelative(key);
}
/**
*
*/
function isHttpOrHttps(key) {
	return /^http(s)?:\/\//.test(key || "");
}
/**
*
*/
function isProxyUrlRelative(key) {
	return key.startsWith("/");
}
/**
*
*/
function proxyUrlToAbsoluteURL(url) {
	if (!url) return "";
	if (!isProxyUrlRelative(url)) return url;
	if (typeof window === "undefined" || !window.location?.origin) return url;
	return new URL(url, window.location.origin).toString();
}
const AUTO_PROXY_HOST_SUFFIXES = [".vercel.app"];
const AUTO_PROXY_PATH = "/__clerk";
function shouldAutoProxy(hostname) {
	return AUTO_PROXY_HOST_SUFFIXES.some((hostSuffix) => hostname?.endsWith(hostSuffix)) ?? false;
}
function getDefaultEnvironment() {
	return typeof process !== "undefined" && process.env ? process.env : {};
}
function isAutoProxyDisabledFromEnvironment(environment = getDefaultEnvironment()) {
	return isTruthy(environment.CLERK_DISABLE_AUTO_PROXY);
}
function normalizeHostname(hostnameOrUrl) {
	if (hostnameOrUrl.startsWith("http://") || hostnameOrUrl.startsWith("https://")) try {
		return new URL(hostnameOrUrl).hostname;
	} catch {
		return "";
	}
	return hostnameOrUrl.split("/")[0] || "";
}
/**
* Determines if the current Vercel environment should use auto-proxy.
* Note: This runs both at build time (static generation) and at runtime
* (server-side rendering) via mergeNextClerkPropsWithEnv in providers.
* The return value may become the proxyUrl or the script src prefix.
*/
function getAutoProxyUrlFromEnvironment({ publishableKey, hasDomain = false, hasProxyUrl = false, environment = getDefaultEnvironment() }) {
	if (hasProxyUrl || hasDomain || !isProductionFromPublishableKey(publishableKey)) return "";
	if (isAutoProxyDisabledFromEnvironment(environment)) return "";
	if (environment.VERCEL_TARGET_ENV !== "production") return "";
	const vercelProductionHostname = environment.VERCEL_PROJECT_PRODUCTION_URL;
	if (!vercelProductionHostname || !shouldAutoProxy(normalizeHostname(vercelProductionHostname))) return "";
	return AUTO_PROXY_PATH;
}

//#endregion
export { AUTO_PROXY_PATH, getAutoProxyUrlFromEnvironment, isAutoProxyDisabledFromEnvironment, isHttpOrHttps, isProxyUrlRelative, isValidProxyUrl, proxyUrlToAbsoluteURL, shouldAutoProxy };
//# sourceMappingURL=proxy.mjs.map