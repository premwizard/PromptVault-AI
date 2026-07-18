import { WorkerClearTimeout, WorkerSetTimeout } from "./workerTimers.types.mjs";

//#region src/workerTimers/createWorkerTimers.d.ts
declare const createWorkerTimers: () => {
  setTimeout: WorkerSetTimeout;
  setInterval: WorkerSetTimeout;
  clearTimeout: WorkerClearTimeout;
  clearInterval: WorkerClearTimeout;
  cleanup: (..._args: any[]) => void;
};
//#endregion
export { createWorkerTimers };