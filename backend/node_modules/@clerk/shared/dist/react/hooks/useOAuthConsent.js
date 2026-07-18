const require_method_called = require('../../telemetry/events/method-called.js');
const require_contexts = require('../contexts.js');
const require_keep_previous_data = require('../query/keep-previous-data.js');
const require_useQuery = require('../query/useQuery.js');
const require_useUserBase = require('./base/useUserBase.js');
const require_useOAuthConsent_shared = require('./useOAuthConsent.shared.js');

//#region src/react/hooks/useOAuthConsent.tsx
const HOOK_NAME = "useOAuthConsent";
/**
* The `useOAuthConsent()` hook loads OAuth application consent metadata for the **signed-in** user
* (`GET /me/oauth/consent/{oauthClientId}`). Ensure the user is authenticated before relying on this hook
* (for example, redirect to sign-in on your custom consent route).
*
* @example
* ```tsx
* import { useOAuthConsent } from '@clerk/react/internal'
*
* const { data, isLoading, error } = useOAuthConsent({
*   oauthClientId: clientIdFromProps,
*   scope: scopeFromProps,
* })
* ```
*/
function useOAuthConsent(params) {
	require_contexts.useAssertWrappedByClerkProvider(HOOK_NAME);
	const { oauthClientId: oauthClientIdParam, scope, redirectUri, keepPreviousData = true, enabled = true } = params;
	const clerk = require_contexts.useClerkInstanceContext();
	const user = require_useUserBase.useUserBase();
	const oauthClientId = (oauthClientIdParam ?? "").trim();
	clerk.telemetry?.record(require_method_called.eventMethodCalled(HOOK_NAME));
	const { queryKey } = require_useOAuthConsent_shared.useOAuthConsentCacheKeys({
		userId: user?.id ?? null,
		oauthClientId,
		scope,
		redirectUri
	});
	const hasClientId = oauthClientId.length > 0;
	const queryEnabled = Boolean(user) && hasClientId && enabled && clerk.loaded;
	const query = require_useQuery.useClerkQuery({
		queryKey,
		queryFn: () => fetchConsentInfo(clerk, {
			oauthClientId,
			scope,
			redirectUri
		}),
		enabled: queryEnabled,
		placeholderData: require_keep_previous_data.defineKeepPreviousDataFn(keepPreviousData && queryEnabled)
	});
	return {
		data: query.data,
		error: query.error ?? null,
		isLoading: query.isLoading,
		isFetching: query.isFetching
	};
}
function fetchConsentInfo(clerk, params) {
	return clerk.oauthApplication.getConsentInfo(params);
}

//#endregion
exports.useOAuthConsent = useOAuthConsent;