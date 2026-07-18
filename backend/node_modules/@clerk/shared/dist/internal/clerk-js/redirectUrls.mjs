import { camelToSnake } from "../../underscore.mjs";
import { applyFunctionToObj, filterProps, removeUndefined } from "../../object.mjs";
import { isAllowedRedirect, relativeToAbsoluteUrl } from "./url.mjs";

//#region src/internal/clerk-js/redirectUrls.ts
var RedirectUrls = class RedirectUrls {
	static keys = [
		"signInForceRedirectUrl",
		"signInFallbackRedirectUrl",
		"signUpForceRedirectUrl",
		"signUpFallbackRedirectUrl",
		"redirectUrl"
	];
	static preserved = ["redirectUrl"];
	options;
	fromOptions;
	fromProps;
	fromSearchParams;
	mode;
	constructor(options, props = {}, searchParams = {}, mode) {
		this.options = options;
		this.fromOptions = this.#parse(options || {});
		this.fromProps = this.#parse(props || {});
		this.fromSearchParams = this.#parseSearchParams(searchParams || {});
		this.mode = mode;
	}
	getAfterSignInUrl() {
		return this.#getRedirectUrl("signIn");
	}
	getAfterSignUpUrl() {
		return this.#getRedirectUrl("signUp");
	}
	getPreservedSearchParams() {
		return this.#toSearchParams(this.#flattenPreserved());
	}
	toSearchParams() {
		return this.#toSearchParams(this.#flattenAll());
	}
	#toSearchParams(obj) {
		const camelCased = Object.fromEntries(Object.entries(obj).map(([key, value]) => [camelToSnake(key), value]));
		return new URLSearchParams(removeUndefined(camelCased));
	}
	#flattenPreserved() {
		return Object.fromEntries(Object.entries({ ...this.fromSearchParams }).filter(([key]) => RedirectUrls.preserved.includes(key)));
	}
	#flattenAll() {
		const signUpForceRedirectUrl = this.fromSearchParams.signUpForceRedirectUrl || this.fromProps.signUpForceRedirectUrl || this.fromOptions.signUpForceRedirectUrl;
		const signUpFallbackRedirectUrl = this.fromSearchParams.signUpFallbackRedirectUrl || this.fromProps.signUpFallbackRedirectUrl || this.fromOptions.signUpFallbackRedirectUrl;
		const signInForceRedirectUrl = this.fromSearchParams.signInForceRedirectUrl || this.fromProps.signInForceRedirectUrl || this.fromOptions.signInForceRedirectUrl;
		const res = {
			signUpForceRedirectUrl,
			signUpFallbackRedirectUrl,
			signInFallbackRedirectUrl: this.fromSearchParams.signInFallbackRedirectUrl || this.fromProps.signInFallbackRedirectUrl || this.fromOptions.signInFallbackRedirectUrl,
			signInForceRedirectUrl,
			redirectUrl: this.fromSearchParams.redirectUrl || this.fromProps.redirectUrl
		};
		if (signUpForceRedirectUrl) delete res.signUpFallbackRedirectUrl;
		if (signInForceRedirectUrl) delete res.signInFallbackRedirectUrl;
		return res;
	}
	#getRedirectUrl(prefix) {
		const forceKey = `${prefix}ForceRedirectUrl`;
		const fallbackKey = `${prefix}FallbackRedirectUrl`;
		let result;
		result = this.fromSearchParams[forceKey] || this.fromProps[forceKey] || this.fromOptions[forceKey];
		result ||= this.fromSearchParams.redirectUrl;
		result ||= this.fromSearchParams[fallbackKey] || this.fromProps[fallbackKey] || this.fromOptions[fallbackKey];
		if (!result && this.mode === "modal") return window.location.href;
		return result || "/";
	}
	#parse(obj) {
		const res = {};
		RedirectUrls.keys.forEach((key) => {
			res[key] = obj[key];
		});
		return applyFunctionToObj(this.#filterRedirects(this.#toAbsoluteUrls(filterProps(res, Boolean))), (val) => val.toString());
	}
	#parseSearchParams(obj) {
		const res = {};
		RedirectUrls.keys.forEach((key) => {
			if (obj instanceof URLSearchParams) res[key] = obj.get(camelToSnake(key));
			else res[key] = obj[camelToSnake(key)];
		});
		return applyFunctionToObj(this.#filterRedirects(this.#toAbsoluteUrls(filterProps(res, Boolean))), (val) => val.toString());
	}
	#toAbsoluteUrls(obj) {
		return applyFunctionToObj(obj, (url) => relativeToAbsoluteUrl(url, window.location.origin));
	}
	#filterRedirects = (obj) => {
		return filterProps(obj, isAllowedRedirect(this.options?.allowedRedirectOrigins, window.location.origin));
	};
};

//#endregion
export { RedirectUrls };
//# sourceMappingURL=redirectUrls.mjs.map