const require_url = require('../url.js');

//#region src/router/router.ts
const PRESERVED_QUERYSTRING_PARAMS = [
	"after_sign_in_url",
	"after_sign_up_url",
	"redirect_url"
];
/**
* Ensures the provided path has a leading slash and no trailing slash
*/
function normalizePath(path) {
	return require_url.withoutTrailingSlash(require_url.withLeadingSlash(path));
}
/**
* Factory function to create an instance of ClerkRouter with the provided host router.
*
* @param router - host router instance to be used by the router
* @param basePath - base path of the router, navigation and matching will be scoped to this path
* @returns A ClerkRouter instance
*/
function createClerkRouter(router, basePath = "/") {
	const normalizedBasePath = normalizePath(basePath);
	/**
	* Certain query parameters need to be preserved when navigating internally. These query parameters are ultimately used by Clerk to dictate behavior, so we keep them around.
	*/
	function makeDestinationUrlWithPreservedQueryParameters(path) {
		if (require_url.isAbsoluteUrl(path)) return path;
		const destinationUrl = new URL(path, window.location.origin);
		const currentSearchParams = router.searchParams();
		PRESERVED_QUERYSTRING_PARAMS.forEach((key) => {
			const maybeValue = currentSearchParams.get(key);
			if (maybeValue) destinationUrl.searchParams.set(key, maybeValue);
		});
		return `${destinationUrl.pathname}${destinationUrl.search}`;
	}
	/**
	*
	*/
	function match(path, index) {
		const pathToMatch = path ?? (index && "/");
		if (!pathToMatch) throw new Error("[clerk] router.match() requires either a path to match, or the index flag must be set to true.");
		return normalizePath(`${normalizedBasePath}${normalizePath(pathToMatch)}`) === normalizePath(router.pathname());
	}
	/**
	*
	*/
	function child(childBasePath) {
		return createClerkRouter(router, `${normalizedBasePath}${normalizePath(childBasePath)}`);
	}
	/**
	*
	*/
	function push(path) {
		const destinationUrl = makeDestinationUrlWithPreservedQueryParameters(path);
		return router.push(destinationUrl);
	}
	/**
	*
	*/
	function replace(path) {
		const destinationUrl = makeDestinationUrlWithPreservedQueryParameters(path);
		return router.replace(destinationUrl);
	}
	/**
	*
	*/
	function shallowPush(path) {
		const destinationUrl = makeDestinationUrlWithPreservedQueryParameters(path);
		return router.shallowPush(destinationUrl);
	}
	/**
	*
	*/
	function pathname() {
		return router.pathname();
	}
	/**
	*
	*/
	function searchParams() {
		return router.searchParams();
	}
	return {
		makeDestinationUrlWithPreservedQueryParameters,
		child,
		match,
		mode: router.mode,
		name: router.name,
		push,
		replace,
		shallowPush,
		pathname,
		searchParams,
		basePath: normalizedBasePath
	};
}

//#endregion
exports.createClerkRouter = createClerkRouter;