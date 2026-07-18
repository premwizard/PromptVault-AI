
//#region src/telemetry/events/flow-step.ts
const EVENT_FLOW_STEP_MOUNTED = "FLOW_STEP_MOUNTED";
const EVENT_SAMPLING_RATE = 1;
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
function eventFlowStepMounted(flow, step, metadata = {}, eventSamplingRate = EVENT_SAMPLING_RATE) {
	return {
		event: EVENT_FLOW_STEP_MOUNTED,
		eventSamplingRate,
		payload: {
			flow,
			step,
			metadata
		}
	};
}

//#endregion
exports.eventFlowStepMounted = eventFlowStepMounted;