'use client';

const require_runtime = require('../../_virtual/_rolldown/runtime.js');
let react = require("react");
react = require_runtime.__toESM(react);

//#region src/react/hooks/createContextAndHook.ts
/**
* Assert that the context value exists, otherwise throw an error.
*
* @internal
*/
function assertContextExists(contextVal, msgOrCtx) {
	if (!contextVal) throw typeof msgOrCtx === "string" ? new Error(msgOrCtx) : /* @__PURE__ */ new Error(`${msgOrCtx.displayName} not found`);
}
/**
* Create and return a Context and two hooks that return the context value.
* The Context type is derived from the type passed in by the user.
*
* The first hook returned guarantees that the context exists so the returned value is always `CtxValue`
* The second hook makes no guarantees, so the returned value can be `CtxValue | undefined`
*
* @internal
*/
const createContextAndHook = (displayName, options) => {
	const { assertCtxFn = assertContextExists } = options || {};
	const Ctx = react.default.createContext(void 0);
	Ctx.displayName = displayName;
	const useCtx = () => {
		const ctx = react.default.useContext(Ctx);
		assertCtxFn(ctx, `${displayName} not found`);
		return ctx.value;
	};
	const useCtxWithoutGuarantee = () => {
		const ctx = react.default.useContext(Ctx);
		return ctx ? ctx.value : {};
	};
	return [
		Ctx,
		useCtx,
		useCtxWithoutGuarantee
	];
};

//#endregion
exports.assertContextExists = assertContextExists;
exports.createContextAndHook = createContextAndHook;