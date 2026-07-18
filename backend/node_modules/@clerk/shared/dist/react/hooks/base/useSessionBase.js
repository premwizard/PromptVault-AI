const require_deriveState = require('../../../deriveState.js');
const require_contexts = require('../../contexts.js');
let react = require("react");

//#region src/react/hooks/base/useSessionBase.ts
function useSessionBase() {
	const clerk = require_contexts.useClerkInstanceContext();
	const initialState = require_contexts.useInitialStateContext();
	const getInitialState = (0, react.useCallback)(() => {
		return initialState ? require_deriveState.deriveFromSsrInitialState(initialState)?.session : void 0;
	}, [initialState]);
	return (0, react.useSyncExternalStore)((0, react.useCallback)((callback) => clerk.addListener(callback, { skipInitialEmit: true }), [clerk]), (0, react.useCallback)(() => {
		if (!clerk.loaded || !clerk.__internal_lastEmittedResources) return getInitialState();
		return clerk.__internal_lastEmittedResources.session;
	}, [clerk, getInitialState]), getInitialState);
}

//#endregion
exports.useSessionBase = useSessionBase;