import { TelemetryEventRaw } from "../../types/telemetry.mjs";
//#region src/telemetry/events/method-called.d.ts
type EventMethodCalled = {
  method: string;
} & Record<string, string | number | boolean>;
/**
 * Fired when a helper method is called from a Clerk SDK.
 */
declare function eventMethodCalled(method: string, payload?: Record<string, unknown>): TelemetryEventRaw<EventMethodCalled>;
//#endregion
export { eventMethodCalled };