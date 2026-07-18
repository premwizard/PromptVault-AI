const require_runtime = require('../_virtual/_rolldown/runtime.js');
const require_router = require('./router.js');
let react = require("react");
react = require_runtime.__toESM(react);

//#region src/router/react.tsx
/**
* React-specific binding's for interacting with Clerk's router interface.
*/
const ClerkHostRouterContext = (0, react.createContext)(null);
const ClerkRouterContext = (0, react.createContext)(null);
/**
*
*/
function useClerkHostRouter() {
	const ctx = (0, react.useContext)(ClerkHostRouterContext);
	if (!ctx) throw new Error("clerk: Unable to locate ClerkHostRouter, make sure this is rendered within `<ClerkHostRouterContext.Provider>`.");
	return ctx;
}
/**
*
*/
function useClerkRouter() {
	const ctx = (0, react.useContext)(ClerkRouterContext);
	if (!ctx) throw new Error("clerk: Unable to locate ClerkRouter, make sure this is rendered within `<Router>`.");
	return ctx;
}
/**
* Construct a Clerk Router using the provided host router. The router instance is accessible using `useClerkRouter()`.
*/
function Router({ basePath, children, router }) {
	const hostRouter = useClerkHostRouter();
	const clerkRouter = require_router.createClerkRouter(router ?? hostRouter, basePath);
	return /* @__PURE__ */ react.default.createElement(ClerkRouterContext.Provider, { value: clerkRouter }, children);
}
/**
* Used to conditionally render its children based on whether or not the current path matches the provided path.
*/
function Route({ path, children, index }) {
	const parentRouter = useClerkRouter();
	if (!path && !index) return children;
	if (!parentRouter?.match(path, index)) return null;
	return children;
}

//#endregion
exports.ClerkHostRouterContext = ClerkHostRouterContext;
exports.ClerkRouterContext = ClerkRouterContext;
exports.Route = Route;
exports.Router = Router;
exports.useClerkHostRouter = useClerkHostRouter;
exports.useClerkRouter = useClerkRouter;