
//#region src/telemetry/events/method-called.ts
const EVENT_METHOD_CALLED = "METHOD_CALLED";
const EVENT_SAMPLING_RATE = .1;
/**
* Fired when a helper method is called from a Clerk SDK.
*/
function eventMethodCalled(method, payload) {
	return {
		event: EVENT_METHOD_CALLED,
		eventSamplingRate: EVENT_SAMPLING_RATE,
		payload: {
			method,
			...payload
		}
	};
}

//#endregion
exports.eventMethodCalled = eventMethodCalled;