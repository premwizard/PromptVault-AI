import { TelemetryCollector as TelemetryCollector$1, TelemetryEventRaw, TelemetryLogEntry } from "../types/telemetry.mjs";
import { TelemetryCollectorOptions } from "./types.mjs";

//#region src/telemetry/collector.d.ts
declare class TelemetryCollector implements TelemetryCollector$1 {
  #private;
  constructor(options: TelemetryCollectorOptions);
  get isEnabled(): boolean;
  get isDebug(): boolean;
  record(event: TelemetryEventRaw): void;
  /**
   * Records a telemetry log entry if logging is enabled and not in debug mode.
   *
   * @param entry - The telemetry log entry to record.
   */
  recordLog(entry: TelemetryLogEntry): void;
}
//#endregion
export { TelemetryCollector };