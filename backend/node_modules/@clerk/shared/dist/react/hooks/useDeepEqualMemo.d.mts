import React from "react";
import { dequal } from "dequal";

//#region src/react/hooks/useDeepEqualMemo.d.ts
type UseMemoFactory<T> = () => T;
type UseMemoDependencyArray = Exclude<Parameters<typeof React.useMemo>[1], 'undefined'>;
type UseDeepEqualMemo = <T>(factory: UseMemoFactory<T>, dependencyArray: UseMemoDependencyArray) => T;
/**
 * @internal
 */
declare const useDeepEqualMemo: UseDeepEqualMemo;
/**
 * @internal
 */
declare const isDeeplyEqual: typeof dequal;
//#endregion
export { isDeeplyEqual, useDeepEqualMemo };