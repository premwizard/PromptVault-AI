
//#region src/telemetry/events/component-mounted.ts
const EVENT_COMPONENT_MOUNTED = "COMPONENT_MOUNTED";
const EVENT_COMPONENT_OPENED = "COMPONENT_OPENED";
const EVENT_SAMPLING_RATE = .1;
/** Increase sampling for high-signal auth components on mount. */
const AUTH_COMPONENTS = new Set(["SignIn", "SignUp"]);
/**
* Returns the per-event sampling rate for component-mounted telemetry events.
* Uses a higher rate for SignIn/SignUp to improve signal quality.
*
*  @internal
*/
function getComponentMountedSamplingRate(component) {
	return AUTH_COMPONENTS.has(component) ? 1 : EVENT_SAMPLING_RATE;
}
/**
* Factory for prebuilt component telemetry events.
*
* @internal
*/
function createPrebuiltComponentEvent(event) {
	return function(component, props, additionalPayload) {
		return {
			event,
			eventSamplingRate: event === EVENT_COMPONENT_MOUNTED ? getComponentMountedSamplingRate(component) : EVENT_SAMPLING_RATE,
			payload: {
				component,
				appearanceProp: Boolean(props?.appearance),
				theme: Boolean(props?.appearance?.theme),
				elements: Boolean(props?.appearance?.elements),
				variables: Boolean(props?.appearance?.variables),
				...additionalPayload
			}
		};
	};
}
/**
* Helper function for `telemetry.record()`. Create a consistent event object for when a prebuilt (AIO) component is mounted.
*
* @param component - The name of the component.
* @param props - The props passed to the component. Will be filtered to a known list of props.
* @param additionalPayload - Additional data to send with the event.
* @example
* telemetry.record(eventPrebuiltComponentMounted('SignUp', props));
*/
function eventPrebuiltComponentMounted(component, props, additionalPayload) {
	return createPrebuiltComponentEvent(EVENT_COMPONENT_MOUNTED)(component, props, additionalPayload);
}
/**
* Helper function for `telemetry.record()`. Create a consistent event object for when a prebuilt (AIO) component is opened as a modal.
*
* @param component - The name of the component.
* @param props - The props passed to the component. Will be filtered to a known list of props.
* @param additionalPayload - Additional data to send with the event.
* @example
* telemetry.record(eventPrebuiltComponentOpened('GoogleOneTap', props));
*/
function eventPrebuiltComponentOpened(component, props, additionalPayload) {
	return createPrebuiltComponentEvent(EVENT_COMPONENT_OPENED)(component, props, additionalPayload);
}
/**
* Helper function for `telemetry.record()`. Create a consistent event object for when a component is mounted. Use `eventPrebuiltComponentMounted` for prebuilt components.
*
* **Caution:** Filter the `props` you pass to this function to avoid sending too much data.
*
* @param component - The name of the component.
* @param props - The props passed to the component. Ideally you only pass a handful of props here.
* @example
* telemetry.record(eventComponentMounted('SignUp', props));
*/
function eventComponentMounted(component, props = {}) {
	return {
		event: EVENT_COMPONENT_MOUNTED,
		eventSamplingRate: getComponentMountedSamplingRate(component),
		payload: {
			component,
			...props
		}
	};
}

//#endregion
exports.eventComponentMounted = eventComponentMounted;
exports.eventPrebuiltComponentMounted = eventPrebuiltComponentMounted;
exports.eventPrebuiltComponentOpened = eventPrebuiltComponentOpened;