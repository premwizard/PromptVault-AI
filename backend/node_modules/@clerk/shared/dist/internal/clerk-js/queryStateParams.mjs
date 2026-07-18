import { CLERK_MODAL_STATE } from "./constants.mjs";
import { getClerkQueryParam } from "./queryParams.mjs";
import { encodeB64 } from "./encoders.mjs";

//#region src/internal/clerk-js/queryStateParams.ts
const readStateParam = () => {
	const urlClerkState = getClerkQueryParam("__clerk_modal_state") ?? "";
	return urlClerkState ? JSON.parse(atob(urlClerkState)) : null;
};
const appendModalState = ({ url, startPath = "/user", currentPath = "", componentName, socialProvider = "" }) => {
	const redirectParams = {
		path: currentPath.replace(/CLERK-ROUTER\/VIRTUAL\/.*\//, "") || "",
		componentName,
		startPath,
		socialProvider
	};
	const encodedRedirectParams = encodeB64(JSON.stringify(redirectParams));
	const urlWithParams = new URL(url);
	const searchParams = urlWithParams.searchParams;
	searchParams.set(CLERK_MODAL_STATE, encodedRedirectParams);
	urlWithParams.search = searchParams.toString();
	return urlWithParams.toString();
};

//#endregion
export { appendModalState, readStateParam };
//# sourceMappingURL=queryStateParams.mjs.map