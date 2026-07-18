const require_method_called = require('../../telemetry/events/method-called.js');
const require_contexts = require('../contexts.js');
const require_keep_previous_data = require('../query/keep-previous-data.js');
const require_useQuery = require('../query/useQuery.js');
const require_useUserBase = require('./base/useUserBase.js');
const require_useOrganizationCreationDefaults_shared = require('./useOrganizationCreationDefaults.shared.js');

//#region src/react/hooks/useOrganizationCreationDefaults.tsx
const HOOK_NAME = "useOrganizationCreationDefaults";
/**
* The `useOrganizationCreationDefaults()` hook retrieves the organization creation defaults for the current user.
*
* @example
* ### Basic usage
*
* ```tsx
* import { useOrganizationCreationDefaults } from '@clerk/clerk-react'
*
* export default function CreateOrganizationForm() {
*   const { data, isLoading } = useOrganizationCreationDefaults()
*
*   if (isLoading) return <div>Loading...</div>
*
*   return (
*     <form>
*       <input defaultValue={data?.form.name} placeholder="Organization name" />
*       <input defaultValue={data?.form.slug} placeholder="Slug" />
*       <button type="submit">Create</button>
*     </form>
*   )
* }
* ```
*/
function useOrganizationCreationDefaults(params = {}) {
	require_contexts.useAssertWrappedByClerkProvider(HOOK_NAME);
	const { keepPreviousData = true, enabled = true } = params;
	const clerk = require_contexts.useClerkInstanceContext();
	const user = require_useUserBase.useUserBase();
	const featureEnabled = clerk.__internal_environment?.organizationSettings?.organizationCreationDefaults?.enabled ?? false;
	clerk.telemetry?.record(require_method_called.eventMethodCalled(HOOK_NAME));
	const { queryKey } = require_useOrganizationCreationDefaults_shared.useOrganizationCreationDefaultsCacheKeys({ userId: user?.id ?? null });
	const queryEnabled = Boolean(user) && enabled && featureEnabled && clerk.loaded;
	const query = require_useQuery.useClerkQuery({
		queryKey,
		queryFn: user?.getOrganizationCreationDefaults,
		enabled: queryEnabled,
		placeholderData: require_keep_previous_data.defineKeepPreviousDataFn(keepPreviousData)
	});
	return {
		data: query.data,
		error: query.error ?? null,
		isLoading: query.isLoading,
		isFetching: query.isFetching
	};
}

//#endregion
exports.useOrganizationCreationDefaults = useOrganizationCreationDefaults;