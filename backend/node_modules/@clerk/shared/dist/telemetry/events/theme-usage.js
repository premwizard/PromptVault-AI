
//#region src/telemetry/events/theme-usage.ts
const EVENT_THEME_USAGE = "THEME_USAGE";
const EVENT_SAMPLING_RATE = 1;
/**
* Helper function for `telemetry.record()`. Create a consistent event object for tracking theme usage in ClerkProvider.
*
* @param appearance - The appearance prop from ClerkProvider.
* @example
* telemetry.record(eventThemeUsage(appearance));
*/
function eventThemeUsage(appearance) {
	return {
		event: EVENT_THEME_USAGE,
		eventSamplingRate: 1,
		payload: analyzeThemeUsage(appearance)
	};
}
/**
* Analyzes the appearance prop to extract theme usage information for telemetry.
*
* @internal
*/
function analyzeThemeUsage(appearance) {
	if (!appearance || typeof appearance !== "object") return {};
	const themeProperty = appearance.theme;
	if (!themeProperty) return {};
	let themeName;
	if (Array.isArray(themeProperty)) for (const theme of themeProperty) {
		const name = extractThemeName(theme);
		if (name) {
			themeName = name;
			break;
		}
	}
	else themeName = extractThemeName(themeProperty);
	return { themeName };
}
/**
* Extracts the theme name from a theme object.
*
* @internal
*/
function extractThemeName(theme) {
	if (typeof theme === "string") return theme;
	if (typeof theme === "object" && theme !== null) {
		if ("name" in theme && typeof theme.name === "string") return theme.name;
	}
}

//#endregion
exports.EVENT_SAMPLING_RATE = EVENT_SAMPLING_RATE;
exports.EVENT_THEME_USAGE = EVENT_THEME_USAGE;
exports.eventThemeUsage = eventThemeUsage;