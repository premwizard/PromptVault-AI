Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_internal_clerk_js_constants = require('./constants.js');
const require_internal_clerk_js_queryParams = require('./queryParams.js');
const require_internal_clerk_js_encoders = require('./encoders.js');

//#region src/internal/clerk-js/queryStateParams.ts
const readStateParam = () => {
	const urlClerkState = require_internal_clerk_js_queryParams.getClerkQueryParam("__clerk_modal_state") ?? "";
	return urlClerkState ? JSON.parse(atob(urlClerkState)) : null;
};
const appendModalState = ({ url, startPath = "/user", currentPath = "", componentName, socialProvider = "" }) => {
	const redirectParams = {
		path: currentPath.replace(/CLERK-ROUTER\/VIRTUAL\/.*\//, "") || "",
		componentName,
		startPath,
		socialProvider
	};
	const encodedRedirectParams = require_internal_clerk_js_encoders.encodeB64(JSON.stringify(redirectParams));
	const urlWithParams = new URL(url);
	const searchParams = urlWithParams.searchParams;
	searchParams.set(require_internal_clerk_js_constants.CLERK_MODAL_STATE, encodedRedirectParams);
	urlWithParams.search = searchParams.toString();
	return urlWithParams.toString();
};

//#endregion
exports.appendModalState = appendModalState;
exports.readStateParam = readStateParam;
//# sourceMappingURL=queryStateParams.js.map