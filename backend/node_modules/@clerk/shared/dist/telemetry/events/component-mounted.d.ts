import { TelemetryEventRaw } from "../../types/telemetry.js";
//#region src/telemetry/events/component-mounted.d.ts
type ComponentMountedBase = {
  component: string;
};
type EventPrebuiltComponent = ComponentMountedBase & {
  appearanceProp: boolean;
  elements: boolean;
  variables: boolean;
  theme: boolean;
};
type EventComponentMounted = ComponentMountedBase & TelemetryEventRaw['payload'];
/**
 * Helper function for `telemetry.record()`. Create a consistent event object for when a prebuilt (AIO) component is mounted.
 *
 * @param component - The name of the component.
 * @param props - The props passed to the component. Will be filtered to a known list of props.
 * @param additionalPayload - Additional data to send with the event.
 * @example
 * telemetry.record(eventPrebuiltComponentMounted('SignUp', props));
 */
declare function eventPrebuiltComponentMounted(component: string, props?: Record<string, any>, additionalPayload?: TelemetryEventRaw['payload']): TelemetryEventRaw<EventPrebuiltComponent>;
/**
 * Helper function for `telemetry.record()`. Create a consistent event object for when a prebuilt (AIO) component is opened as a modal.
 *
 * @param component - The name of the component.
 * @param props - The props passed to the component. Will be filtered to a known list of props.
 * @param additionalPayload - Additional data to send with the event.
 * @example
 * telemetry.record(eventPrebuiltComponentOpened('GoogleOneTap', props));
 */
declare function eventPrebuiltComponentOpened(component: string, props?: Record<string, any>, additionalPayload?: TelemetryEventRaw['payload']): TelemetryEventRaw<EventPrebuiltComponent>;
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
declare function eventComponentMounted(component: string, props?: TelemetryEventRaw['payload']): TelemetryEventRaw<EventComponentMounted>;
//#endregion
export { eventComponentMounted, eventPrebuiltComponentMounted, eventPrebuiltComponentOpened };