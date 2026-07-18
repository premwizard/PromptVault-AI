
//#region src/telemetry/events/framework-metadata.ts
const EVENT_FRAMEWORK_METADATA = "FRAMEWORK_METADATA";
const EVENT_SAMPLING_RATE = .1;
/**
* Fired when a helper method is called from a Clerk SDK.
*/
function eventFrameworkMetadata(payload) {
	return {
		event: EVENT_FRAMEWORK_METADATA,
		eventSamplingRate: EVENT_SAMPLING_RATE,
		payload
	};
}

//#endregion
exports.eventFrameworkMetadata = eventFrameworkMetadata;