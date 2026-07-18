//#region src/utils/createDeferredPromise.d.ts
type Callback = (val?: any) => void;
/**
 * Create a promise that can be resolved or rejected from
 * outside the Promise constructor callback
 * A ES6 compatible utility that implements `Promise.withResolvers`
 *
 * @internal
 */
declare const createDeferredPromise: () => {
  promise: Promise<unknown>;
  resolve: Callback;
  reject: Callback;
};
//#endregion
export { createDeferredPromise };