const require_stable_keys = require('../stable-keys.js');
const require_createCacheKeys = require('./createCacheKeys.js');
let react = require("react");

//#region src/react/hooks/useOAuthConsent.shared.ts
function useOAuthConsentCacheKeys(params) {
	const { userId, oauthClientId, scope, redirectUri } = params;
	return (0, react.useMemo)(() => {
		const args = {
			oauthClientId,
			...scope !== void 0 && { scope },
			...redirectUri !== void 0 && { redirectUri }
		};
		return require_createCacheKeys.createCacheKeys({
			stablePrefix: require_stable_keys.STABLE_KEYS.OAUTH_CONSENT_INFO_KEY,
			authenticated: true,
			tracked: { userId: userId ?? null },
			untracked: { args }
		});
	}, [
		userId,
		oauthClientId,
		scope,
		redirectUri
	]);
}

//#endregion
exports.useOAuthConsentCacheKeys = useOAuthConsentCacheKeys;