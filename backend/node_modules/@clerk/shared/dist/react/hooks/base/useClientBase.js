const require_contexts = require('../../contexts.js');
let react = require("react");

//#region src/react/hooks/base/useClientBase.ts
const initialSnapshot = void 0;
const getInitialSnapshot = () => initialSnapshot;
function useClientBase() {
	const clerk = require_contexts.useClerkInstanceContext();
	return (0, react.useSyncExternalStore)((0, react.useCallback)((callback) => clerk.addListener(callback, { skipInitialEmit: true }), [clerk]), (0, react.useCallback)(() => {
		if (!clerk.loaded || !clerk.__internal_lastEmittedResources) return;
		return clerk.__internal_lastEmittedResources.client;
	}, [clerk]), getInitialSnapshot);
}

//#endregion
exports.useClientBase = useClientBase;