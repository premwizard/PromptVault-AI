import { TelemetryEventRaw } from "../../types/telemetry.js";
//#region src/telemetry/events/flow-step.d.ts
type EventFlowStepMounted = {
  /** The flow the step belongs to, e.g. `configureSSO` (mirrors `Flow.Root`'s `flow`). */flow: string; /** The step/part that mounted, e.g. `verify-domain` */
  step: string; /** Free-form, flow-specific metadata supplied by the caller (e.g. `timestamp`, `connectionStatus`). */
  metadata: TelemetryEventRaw['payload'];
} & TelemetryEventRaw['payload'];
/**
 * Fires an event from a part of a multi-step flow.
 *
 * @param flow - The flow identifier (matches `Flow.Root`'s `flow`).
 * @param step - The step/part that mounted.
 * @param metadata - Flow-specific metadata sent under `payload.metadata`.
 * @param eventSamplingRate - Override the default full-capture sampling rate.
 * @example
 * telemetry.record(eventFlowStepMounted('configureSSO', 'verify-domain', { timestamp: new Date().toISOString(), connectionStatus: 'unconfigured' }));
 */
declare function eventFlowStepMounted(flow: string, step: string, metadata?: TelemetryEventRaw['payload'], eventSamplingRate?: number): TelemetryEventRaw<EventFlowStepMounted>;
//#endregion
export { eventFlowStepMounted };