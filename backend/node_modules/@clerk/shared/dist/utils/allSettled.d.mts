//#region src/utils/allSettled.d.ts
/**
 * A ES6 compatible utility that implements `Promise.allSettled`
 *
 * @internal
 */
declare function allSettled<T>(iterable: Iterable<Promise<T>>): Promise<({
  status: 'fulfilled';
  value: T;
} | {
  status: 'rejected';
  reason: any;
})[]>;
//#endregion
export { allSettled };