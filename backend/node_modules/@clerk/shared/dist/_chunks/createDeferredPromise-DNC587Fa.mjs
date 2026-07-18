import { t as noop } from "./noop-LBsrDrTs.mjs";

//#region src/utils/createDeferredPromise.ts
/**
* Create a promise that can be resolved or rejected from
* outside the Promise constructor callback
* A ES6 compatible utility that implements `Promise.withResolvers`
*
* @internal
*/
const createDeferredPromise = () => {
	let resolve = noop;
	let reject = noop;
	return {
		promise: new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		}),
		resolve,
		reject
	};
};

//#endregion
export { createDeferredPromise as t };
//# sourceMappingURL=createDeferredPromise-DNC587Fa.mjs.map