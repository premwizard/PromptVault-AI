import { TelemetryEventRaw } from "../../types/telemetry.js";
//#region src/telemetry/events/theme-usage.d.ts
declare const EVENT_THEME_USAGE = "THEME_USAGE";
declare const EVENT_SAMPLING_RATE = 1;
type EventThemeUsage = {
  /**
   * The name of the theme being used (e.g., "shadcn", "neobrutalism", etc.).
   */
  themeName?: string;
};
/**
 * Helper function for `telemetry.record()`. Create a consistent event object for tracking theme usage in ClerkProvider.
 *
 * @param appearance - The appearance prop from ClerkProvider.
 * @example
 * telemetry.record(eventThemeUsage(appearance));
 */
declare function eventThemeUsage(appearance?: any): TelemetryEventRaw<EventThemeUsage>;
//#endregion
export { EVENT_SAMPLING_RATE, EVENT_THEME_USAGE, eventThemeUsage };