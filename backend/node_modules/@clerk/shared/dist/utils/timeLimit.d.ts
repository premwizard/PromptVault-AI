//#region src/utils/timeLimit.d.ts
declare function timeLimit<T>(value: T | PromiseLike<T>, ms: number, abortController?: Pick<AbortController, 'abort'>): Promise<T>;
//#endregion
export { timeLimit };