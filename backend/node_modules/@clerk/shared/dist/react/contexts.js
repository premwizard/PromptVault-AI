'use client';

const require_runtime = require('../_virtual/_rolldown/runtime.js');
const require_createContextAndHook = require('./hooks/createContextAndHook.js');
let react = require("react");
react = require_runtime.__toESM(react);

//#region src/react/contexts.tsx
const [ClerkInstanceContext, useClerkInstanceContext] = require_createContextAndHook.createContextAndHook("ClerkInstanceContext");
const [InitialStateContext, _useInitialStateContext] = require_createContextAndHook.createContextAndHook("InitialStateContext");
/**
* Provides initial Clerk state (session, user, organization data) from server-side rendering
* to child components via React context.
*
* Passing in a promise is only supported for React >= 19.
*
* The initialState is snapshotted on mount and cannot change during the component lifecycle.
*
* Note that different parts of the React tree can use separate InitialStateProvider instances
* with different initialState values if needed.
*/
function InitialStateProvider({ children, initialState }) {
	const [initialStateSnapshot] = (0, react.useState)(initialState);
	const initialStateCtx = react.default.useMemo(() => ({ value: initialStateSnapshot }), [initialStateSnapshot]);
	return /* @__PURE__ */ react.default.createElement(InitialStateContext.Provider, { value: initialStateCtx }, children);
}
function useInitialStateContext() {
	const initialState = _useInitialStateContext();
	if (initialState instanceof Promise) if ("use" in react.default && typeof react.default.use === "function") return react.default.use(initialState);
	else throw new Error("initialState cannot be a promise if React version is less than 19");
	return initialState;
}
const OptionsContext = react.default.createContext({});
const [CheckoutContext, useCheckoutContext] = require_createContextAndHook.createContextAndHook("CheckoutContext");
const __experimental_CheckoutProvider = ({ children, ...rest }) => {
	return /* @__PURE__ */ react.default.createElement(CheckoutContext.Provider, { value: { value: rest } }, children);
};
/**
* @internal
*/
function useOptionsContext() {
	const context = react.default.useContext(OptionsContext);
	if (context === void 0) throw new Error("useOptions must be used within an OptionsContext");
	return context;
}
/**
* @internal
*/
function useAssertWrappedByClerkProvider(displayNameOrFn) {
	if (!react.default.useContext(ClerkInstanceContext)) {
		if (typeof displayNameOrFn === "function") {
			displayNameOrFn();
			return;
		}
		throw new Error(`${displayNameOrFn} can only be used within the <ClerkProvider /> component.

Possible fixes:
1. Ensure that the <ClerkProvider /> is correctly wrapping your application where this component is used.
2. Check for multiple versions of the \`@clerk/shared\` package in your project. Use a tool like \`npm ls @clerk/shared\` to identify multiple versions, and update your dependencies to only rely on one.

Learn more: https://clerk.com/docs/components/clerk-provider`.trim());
	}
}

//#endregion
exports.ClerkInstanceContext = ClerkInstanceContext;
exports.InitialStateProvider = InitialStateProvider;
exports.OptionsContext = OptionsContext;
exports.__experimental_CheckoutProvider = __experimental_CheckoutProvider;
exports.useAssertWrappedByClerkProvider = useAssertWrappedByClerkProvider;
exports.useCheckoutContext = useCheckoutContext;
exports.useClerkInstanceContext = useClerkInstanceContext;
exports.useInitialStateContext = useInitialStateContext;
exports.useOptionsContext = useOptionsContext;