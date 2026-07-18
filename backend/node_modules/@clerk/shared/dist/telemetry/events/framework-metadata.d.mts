import { TelemetryEventRaw } from "../../types/telemetry.mjs";
//#region src/telemetry/events/framework-metadata.d.ts
type EventFrameworkMetadata = Record<string, string | number | boolean>;
/**
 * Fired when a helper method is called from a Clerk SDK.
 */
declare function eventFrameworkMetadata(payload: EventFrameworkMetadata): TelemetryEventRaw<EventFrameworkMetadata>;
//#endregion
export { eventFrameworkMetadata };