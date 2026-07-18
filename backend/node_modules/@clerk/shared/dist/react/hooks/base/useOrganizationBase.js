const require_contexts = require('../../contexts.js');
let react = require("react");

//#region src/react/hooks/base/useOrganizationBase.ts
function useOrganizationBase() {
	const clerk = require_contexts.useClerkInstanceContext();
	const initialState = require_contexts.useInitialStateContext();
	const getInitialState = (0, react.useCallback)(() => initialState?.organization, [initialState?.organization]);
	return (0, react.useSyncExternalStore)((0, react.useCallback)((callback) => clerk.addListener(callback, { skipInitialEmit: true }), [clerk]), (0, react.useCallback)(() => {
		if (!clerk.loaded || !clerk.__internal_lastEmittedResources) return getInitialState();
		return clerk.__internal_lastEmittedResources.organization;
	}, [clerk, getInitialState]), getInitialState);
}

//#endregion
exports.useOrganizationBase = useOrganizationBase;