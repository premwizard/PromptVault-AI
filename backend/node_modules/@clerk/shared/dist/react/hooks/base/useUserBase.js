const require_contexts = require('../../contexts.js');
let react = require("react");

//#region src/react/hooks/base/useUserBase.ts
function useUserBase() {
	const clerk = require_contexts.useClerkInstanceContext();
	const initialState = require_contexts.useInitialStateContext();
	const getInitialState = (0, react.useCallback)(() => initialState?.user, [initialState?.user]);
	return (0, react.useSyncExternalStore)((0, react.useCallback)((callback) => {
		return clerk.addListener(callback, { skipInitialEmit: true });
	}, [clerk]), (0, react.useCallback)(() => {
		if (!clerk.loaded || !clerk.__internal_lastEmittedResources) return getInitialState();
		return clerk.__internal_lastEmittedResources.user;
	}, [clerk, getInitialState]), getInitialState);
}

//#endregion
exports.useUserBase = useUserBase;