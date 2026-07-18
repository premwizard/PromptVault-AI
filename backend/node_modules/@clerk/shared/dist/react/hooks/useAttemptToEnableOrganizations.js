const require_useClerk = require('./useClerk.js');
let react = require("react");

//#region src/react/hooks/useAttemptToEnableOrganizations.ts
/**
* Attempts to enable the organizations environment setting for a given caller
*
* @internal
*/
function useAttemptToEnableOrganizations(caller) {
	const clerk = require_useClerk.useClerk();
	const hasAttempted = (0, react.useRef)(false);
	(0, react.useEffect)(() => {
		if (hasAttempted.current) return;
		hasAttempted.current = true;
		clerk.__internal_attemptToEnableEnvironmentSetting?.({
			for: "organizations",
			caller
		});
	}, [clerk, caller]);
}

//#endregion
exports.useAttemptToEnableOrganizations = useAttemptToEnableOrganizations;