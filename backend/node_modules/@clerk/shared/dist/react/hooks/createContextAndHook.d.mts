import React from "react";

//#region src/react/hooks/createContextAndHook.d.ts
/**
 * Assert that the context value exists, otherwise throw an error.
 *
 * @internal
 */
declare function assertContextExists(contextVal: unknown, msgOrCtx: string | React.Context<any>): asserts contextVal;
type Options = {
  assertCtxFn?: (v: unknown, msg: string) => void;
};
type ContextOf<T> = React.Context<{
  value: T;
} | undefined>;
type UseCtxFn<T> = () => T;
/**
 * Create and return a Context and two hooks that return the context value.
 * The Context type is derived from the type passed in by the user.
 *
 * The first hook returned guarantees that the context exists so the returned value is always `CtxValue`
 * The second hook makes no guarantees, so the returned value can be `CtxValue | undefined`
 *
 * @internal
 */
declare const createContextAndHook: <CtxVal>(displayName: string, options?: Options) => [ContextOf<CtxVal>, UseCtxFn<CtxVal>, UseCtxFn<CtxVal | Partial<CtxVal>>];
//#endregion
export { assertContextExists, createContextAndHook };