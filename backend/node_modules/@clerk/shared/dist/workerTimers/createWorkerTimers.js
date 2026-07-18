const require_noop = require('../utils/noop.js');
const require_workerTimers_built = require('./workerTimers.built.js');

//#region src/workerTimers/createWorkerTimers.ts
const createWebWorker = (source, opts = {}) => {
	if (typeof Worker === "undefined") return null;
	try {
		const blob = new Blob([source], { type: "application/javascript; charset=utf-8" });
		const workerScript = globalThis.URL.createObjectURL(blob);
		return new Worker(workerScript, opts);
	} catch {
		console.warn("Clerk: Cannot create worker from blob. Consider adding worker-src blob:; to your CSP");
		return null;
	}
};
const fallbackTimers = () => {
	return {
		setTimeout: globalThis.setTimeout.bind(globalThis),
		setInterval: globalThis.setInterval.bind(globalThis),
		clearTimeout: globalThis.clearTimeout.bind(globalThis),
		clearInterval: globalThis.clearInterval.bind(globalThis),
		cleanup: require_noop.noop
	};
};
const createWorkerTimers = () => {
	let id = 0;
	const generateId = () => id++;
	const callbacks = /* @__PURE__ */ new Map();
	const post = (w, p) => w?.postMessage(p);
	const handleMessage = (e) => {
		callbacks.get(e.data.id)?.();
	};
	let worker = createWebWorker(require_workerTimers_built.default, { name: "clerk-timers" });
	worker?.addEventListener("message", handleMessage);
	if (!worker) return fallbackTimers();
	const init = () => {
		if (!worker) {
			worker = createWebWorker(require_workerTimers_built.default, { name: "clerk-timers" });
			worker?.addEventListener("message", handleMessage);
		}
	};
	const cleanup = () => {
		if (worker) {
			worker.terminate();
			worker = null;
			callbacks.clear();
		}
	};
	const setTimeout = (cb, ms) => {
		init();
		const id = generateId();
		callbacks.set(id, () => {
			cb();
			callbacks.delete(id);
		});
		post(worker, {
			type: "setTimeout",
			id,
			ms
		});
		return id;
	};
	const setInterval = (cb, ms) => {
		init();
		const id = generateId();
		callbacks.set(id, cb);
		post(worker, {
			type: "setInterval",
			id,
			ms
		});
		return id;
	};
	const clearTimeout = (id) => {
		init();
		callbacks.delete(id);
		post(worker, {
			type: "clearTimeout",
			id
		});
	};
	const clearInterval = (id) => {
		init();
		callbacks.delete(id);
		post(worker, {
			type: "clearInterval",
			id
		});
	};
	return {
		setTimeout,
		setInterval,
		clearTimeout,
		clearInterval,
		cleanup
	};
};

//#endregion
exports.createWorkerTimers = createWorkerTimers;