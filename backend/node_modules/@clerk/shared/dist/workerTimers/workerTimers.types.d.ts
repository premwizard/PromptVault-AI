//#region src/workerTimers/workerTimers.types.d.ts
type WorkerTimerId = number;
type WorkerTimeoutCallback = () => void;
type WorkerSetTimeout = (cb: WorkerTimeoutCallback, ms: number) => WorkerTimerId;
type WorkerClearTimeout = (id: WorkerTimerId) => void;
//#endregion
export { WorkerClearTimeout, WorkerSetTimeout };