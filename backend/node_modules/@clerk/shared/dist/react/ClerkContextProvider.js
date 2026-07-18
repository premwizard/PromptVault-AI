const require_runtime = require('../_virtual/_rolldown/runtime.js');
const require_contexts = require('./contexts.js');
const require_utils = require('./utils.js');
let react = require("react");
react = require_runtime.__toESM(react);

//#region src/react/ClerkContextProvider.tsx
function ClerkContextProvider(props) {
	const clerk = props.clerk;
	require_utils.assertClerkSingletonExists(clerk);
	if (props.initialState instanceof Promise && !("use" in react.default && typeof react.default.use === "function")) throw new Error("initialState cannot be a promise if React version is less than 19");
	const clerkCtx = react.default.useMemo(() => ({ value: clerk }), [props.clerkStatus]);
	return /* @__PURE__ */ react.default.createElement(require_contexts.InitialStateProvider, { initialState: props.initialState }, /* @__PURE__ */ react.default.createElement(require_contexts.ClerkInstanceContext.Provider, { value: clerkCtx }, /* @__PURE__ */ react.default.createElement(require_contexts.__experimental_CheckoutProvider, { value: void 0 }, props.children)));
}

//#endregion
exports.ClerkContextProvider = ClerkContextProvider;