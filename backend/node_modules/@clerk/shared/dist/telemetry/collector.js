const require_keys = require('../keys.js');
const require_underscore = require('../underscore.js');
const require_notice = require('./notice.js');
const require_throttler = require('./throttler.js');

//#region src/telemetry/collector.ts
/**
* The `TelemetryCollector` class handles collection of telemetry events from Clerk SDKs. Telemetry is opt-out and can be disabled by setting a CLERK_TELEMETRY_DISABLED environment variable.
* The `ClerkProvider` also accepts a `telemetry` prop that will be passed to the collector during initialization:.
*
* ```jsx
* <ClerkProvider telemetry={false}>
*    ...
* </ClerkProvider>
* ```
*
* For more information, please see the telemetry documentation page: https://clerk.com/docs/telemetry.
*/
/**
* Type guard to check if window.Clerk exists and has the expected structure.
*/
function isWindowClerkWithMetadata(clerk) {
	return typeof clerk === "object" && clerk !== null && "constructor" in clerk && typeof clerk.constructor === "function";
}
const VALID_LOG_LEVELS = new Set([
	"error",
	"warn",
	"info",
	"debug",
	"trace"
]);
const DEFAULT_CONFIG = {
	samplingRate: 1,
	maxBufferSize: 5,
	endpoint: "https://clerk-telemetry.com"
};
var TelemetryCollector = class {
	#config;
	#eventThrottler;
	#metadata = {};
	#buffer = [];
	#pendingFlush = null;
	constructor(options) {
		this.#config = {
			maxBufferSize: options.maxBufferSize ?? DEFAULT_CONFIG.maxBufferSize,
			samplingRate: options.samplingRate ?? DEFAULT_CONFIG.samplingRate,
			perEventSampling: options.perEventSampling ?? true,
			disabled: options.disabled ?? false,
			debug: options.debug ?? false,
			endpoint: DEFAULT_CONFIG.endpoint
		};
		if (!options.clerkVersion && typeof window === "undefined") this.#metadata.clerkVersion = "";
		else this.#metadata.clerkVersion = options.clerkVersion ?? "";
		this.#metadata.sdk = options.sdk;
		this.#metadata.sdkVersion = options.sdkVersion;
		this.#metadata.publishableKey = options.publishableKey ?? "";
		const parsedKey = require_keys.parsePublishableKey(options.publishableKey);
		if (parsedKey) this.#metadata.instanceType = parsedKey.instanceType;
		if (options.secretKey) this.#metadata.secretKey = options.secretKey.substring(0, 16);
		const cache = require_throttler.LocalStorageThrottlerCache.isSupported() ? new require_throttler.LocalStorageThrottlerCache() : new require_throttler.InMemoryThrottlerCache();
		this.#eventThrottler = new require_throttler.TelemetryEventThrottler(cache);
		require_notice.maybeShowTelemetryNotice({ skip: !this.isEnabled });
	}
	get isEnabled() {
		if (this.#metadata.instanceType !== "development") return false;
		if (this.#config.disabled || typeof process !== "undefined" && process.env && require_underscore.isTruthy(process.env.CLERK_TELEMETRY_DISABLED)) return false;
		if (typeof window !== "undefined" && !!window?.navigator?.webdriver) return false;
		return true;
	}
	get isDebug() {
		return this.#config.debug || typeof process !== "undefined" && process.env && require_underscore.isTruthy(process.env.CLERK_TELEMETRY_DEBUG);
	}
	record(event) {
		try {
			const preparedPayload = this.#preparePayload(event.event, event.payload);
			this.#logEvent(preparedPayload.event, preparedPayload);
			if (!this.#shouldRecord(preparedPayload, event.eventSamplingRate)) return;
			this.#buffer.push({
				kind: "event",
				value: preparedPayload
			});
			this.#scheduleFlush();
		} catch (error) {
			console.error("[clerk/telemetry] Error recording telemetry event", error);
		}
	}
	/**
	* Records a telemetry log entry if logging is enabled and not in debug mode.
	*
	* @param entry - The telemetry log entry to record.
	*/
	recordLog(entry) {
		try {
			if (!this.#shouldRecordLog(entry)) return;
			const levelIsValid = typeof entry?.level === "string" && VALID_LOG_LEVELS.has(entry.level);
			const messageIsValid = typeof entry?.message === "string" && entry.message.trim().length > 0;
			let normalizedTimestamp = null;
			const timestampInput = entry?.timestamp;
			if (typeof timestampInput === "number" || typeof timestampInput === "string") {
				const candidate = new Date(timestampInput);
				if (!Number.isNaN(candidate.getTime())) normalizedTimestamp = candidate;
			}
			if (!levelIsValid || !messageIsValid || normalizedTimestamp === null) {
				if (this.isDebug && typeof console !== "undefined") console.warn("[clerk/telemetry] Dropping invalid telemetry log entry", {
					levelIsValid,
					messageIsValid,
					timestampIsValid: normalizedTimestamp !== null
				});
				return;
			}
			const sdkMetadata = this.#getSDKMetadata();
			const logData = {
				sdk: sdkMetadata.name,
				sdkv: sdkMetadata.version,
				cv: this.#metadata.clerkVersion ?? "",
				lvl: entry.level,
				msg: entry.message,
				ts: normalizedTimestamp.toISOString(),
				pk: this.#metadata.publishableKey || null,
				payload: this.#sanitizeContext(entry.context)
			};
			this.#buffer.push({
				kind: "log",
				value: logData
			});
			this.#scheduleFlush();
		} catch (error) {
			console.error("[clerk/telemetry] Error recording telemetry log entry", error);
		}
	}
	#shouldRecord(preparedPayload, eventSamplingRate) {
		return this.isEnabled && !this.isDebug && this.#shouldBeSampled(preparedPayload, eventSamplingRate);
	}
	#shouldRecordLog(_entry) {
		return true;
	}
	#shouldBeSampled(preparedPayload, eventSamplingRate) {
		const randomSeed = Math.random();
		if (!(randomSeed <= this.#config.samplingRate && (this.#config.perEventSampling === false || typeof eventSamplingRate === "undefined" || randomSeed <= eventSamplingRate))) return false;
		return !this.#eventThrottler.isEventThrottled(preparedPayload);
	}
	#scheduleFlush() {
		if (typeof window === "undefined") {
			this.#flush();
			return;
		}
		if (this.#buffer.length >= this.#config.maxBufferSize) {
			if (this.#pendingFlush) if (typeof cancelIdleCallback !== "undefined") cancelIdleCallback(Number(this.#pendingFlush));
			else clearTimeout(Number(this.#pendingFlush));
			this.#flush();
			return;
		}
		if (this.#pendingFlush) return;
		if ("requestIdleCallback" in window) this.#pendingFlush = requestIdleCallback(() => {
			this.#flush();
			this.#pendingFlush = null;
		});
		else this.#pendingFlush = setTimeout(() => {
			this.#flush();
			this.#pendingFlush = null;
		}, 0);
	}
	#flush() {
		const itemsToSend = [...this.#buffer];
		this.#buffer = [];
		this.#pendingFlush = null;
		if (itemsToSend.length === 0) return;
		const eventsToSend = itemsToSend.filter((item) => item.kind === "event").map((item) => item.value);
		const logsToSend = itemsToSend.filter((item) => item.kind === "log").map((item) => item.value);
		if (eventsToSend.length > 0) {
			const eventsUrl = new URL("/v1/event", this.#config.endpoint);
			fetch(eventsUrl, {
				headers: { "Content-Type": "application/json" },
				keepalive: true,
				method: "POST",
				body: JSON.stringify({ events: eventsToSend })
			}).catch(() => void 0);
		}
		if (logsToSend.length > 0) {
			const logsUrl = new URL("/v1/logs", this.#config.endpoint);
			fetch(logsUrl, {
				headers: { "Content-Type": "application/json" },
				keepalive: true,
				method: "POST",
				body: JSON.stringify({ logs: logsToSend })
			}).catch(() => void 0);
		}
	}
	/**
	* If running in debug mode, log the event and its payload to the console.
	*/
	#logEvent(event, payload) {
		if (!this.isDebug) return;
		if (typeof console.groupCollapsed !== "undefined") {
			console.groupCollapsed("[clerk/telemetry]", event);
			console.log(payload);
			console.groupEnd();
		} else console.log("[clerk/telemetry]", event, payload);
	}
	/**
	* If in browser, attempt to lazily grab the SDK metadata from the Clerk singleton, otherwise fallback to the initially passed in values.
	*
	* This is necessary because the sdkMetadata can be set by the host SDK after the TelemetryCollector is instantiated.
	*/
	#getSDKMetadata() {
		const sdkMetadata = {
			name: this.#metadata.sdk,
			version: this.#metadata.sdkVersion
		};
		if (typeof window !== "undefined") {
			const windowWithClerk = window;
			if (windowWithClerk.Clerk) {
				const windowClerk = windowWithClerk.Clerk;
				if (isWindowClerkWithMetadata(windowClerk) && windowClerk.constructor.sdkMetadata) {
					const { name, version } = windowClerk.constructor.sdkMetadata;
					if (name !== void 0) sdkMetadata.name = name;
					if (version !== void 0) sdkMetadata.version = version;
				}
			}
		}
		return sdkMetadata;
	}
	/**
	* Append relevant metadata from the Clerk singleton to the event payload.
	*/
	#preparePayload(event, payload) {
		const sdkMetadata = this.#getSDKMetadata();
		return {
			event,
			cv: this.#metadata.clerkVersion ?? "",
			it: this.#metadata.instanceType ?? "",
			sdk: sdkMetadata.name,
			sdkv: sdkMetadata.version,
			...this.#metadata.publishableKey ? { pk: this.#metadata.publishableKey } : {},
			...this.#metadata.secretKey ? { sk: this.#metadata.secretKey } : {},
			payload
		};
	}
	/**
	* Best-effort sanitization of the context payload. Returns a plain object with JSON-serializable
	* values or null when the input is missing or not serializable. Arrays are not accepted.
	*/
	#sanitizeContext(context) {
		if (context === null || typeof context === "undefined") return null;
		if (typeof context !== "object") return null;
		try {
			const cleaned = JSON.parse(JSON.stringify(context));
			if (cleaned && typeof cleaned === "object" && !Array.isArray(cleaned)) return cleaned;
			return null;
		} catch {
			return null;
		}
	}
};

//#endregion
exports.TelemetryCollector = TelemetryCollector;