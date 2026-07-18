
//#region src/telemetry/throttler.ts
const DEFAULT_CACHE_TTL_MS = 864e5;
/**
* Manages throttling for telemetry events using a configurable cache implementation
* to mitigate event flooding in frequently executed code paths.
*/
var TelemetryEventThrottler = class {
	#cache;
	#cacheTtl = DEFAULT_CACHE_TTL_MS;
	constructor(cache) {
		this.#cache = cache;
	}
	isEventThrottled(payload) {
		const now = Date.now();
		const key = this.#generateKey(payload);
		const entry = this.#cache.getItem(key);
		if (!entry) {
			this.#cache.setItem(key, now);
			return false;
		}
		if (now - entry > this.#cacheTtl) {
			this.#cache.setItem(key, now);
			return false;
		}
		return true;
	}
	/**
	* Generates a consistent unique key for telemetry events by sorting payload properties.
	* This ensures that payloads with identical content in different orders produce the same key.
	*/
	#generateKey(event) {
		const { sk: _sk, pk: _pk, payload, ...rest } = event;
		const sanitizedEvent = {
			...payload,
			...rest
		};
		return JSON.stringify(Object.keys({
			...payload,
			...rest
		}).sort().map((key) => sanitizedEvent[key]));
	}
};
/**
* LocalStorage-based cache implementation for browser environments.
*/
var LocalStorageThrottlerCache = class {
	#storageKey = "clerk_telemetry_throttler";
	getItem(key) {
		return this.#getCache()[key];
	}
	setItem(key, value) {
		try {
			const cache = this.#getCache();
			cache[key] = value;
			localStorage.setItem(this.#storageKey, JSON.stringify(cache));
		} catch (err) {
			if (err instanceof DOMException && (err.name === "QuotaExceededError" || err.name === "NS_ERROR_DOM_QUOTA_REACHED") && localStorage.length > 0) localStorage.removeItem(this.#storageKey);
		}
	}
	removeItem(key) {
		try {
			const cache = this.#getCache();
			delete cache[key];
			localStorage.setItem(this.#storageKey, JSON.stringify(cache));
		} catch {}
	}
	#getCache() {
		try {
			const cacheString = localStorage.getItem(this.#storageKey);
			if (!cacheString) return {};
			return JSON.parse(cacheString);
		} catch {
			return {};
		}
	}
	static isSupported() {
		return typeof window !== "undefined" && !!window.localStorage;
	}
};
/**
* In-memory cache implementation for non-browser environments (e.g., React Native).
*/
var InMemoryThrottlerCache = class {
	#cache = /* @__PURE__ */ new Map();
	#maxSize = 1e4;
	getItem(key) {
		if (this.#cache.size > this.#maxSize) {
			this.#cache.clear();
			return;
		}
		return this.#cache.get(key);
	}
	setItem(key, value) {
		this.#cache.set(key, value);
	}
	removeItem(key) {
		this.#cache.delete(key);
	}
};

//#endregion
exports.InMemoryThrottlerCache = InMemoryThrottlerCache;
exports.LocalStorageThrottlerCache = LocalStorageThrottlerCache;
exports.TelemetryEventThrottler = TelemetryEventThrottler;