const require_logger = require('../../logger.js');
const require_contexts = require('../contexts.js');
const require_keep_previous_data = require('../query/keep-previous-data.js');
const require_use_clerk_query_client = require('../query/use-clerk-query-client.js');
const require_useQuery = require('../query/useQuery.js');
const require_useClearQueriesOnSignOut = require('./useClearQueriesOnSignOut.js');
const require_useOrganizationBase = require('./base/useOrganizationBase.js');
const require_useOrganizationDomains_shared = require('./useOrganizationDomains.shared.js');
let react = require("react");

//#region src/react/hooks/useOrganizationDomains.tsx
const OWNERSHIP_VERIFICATION_POLL_INTERVAL_MS = 1e4;
/**
* Domains for the active organization.
*
* @internal
*/
function useOrganizationDomains(params = {}) {
	const { keepPreviousData = true, enabled = true, enrollmentMode, onOwnershipVerified } = params;
	const clerk = require_contexts.useClerkInstanceContext();
	const organization = require_useOrganizationBase.useOrganizationBase();
	const [queryClient] = require_use_clerk_query_client.useClerkQueryClient();
	const onOwnershipVerifiedRef = (0, react.useRef)(onOwnershipVerified);
	onOwnershipVerifiedRef.current = onOwnershipVerified;
	const { queryKey, stableKey, authenticated } = require_useOrganizationDomains_shared.useOrganizationDomainsCacheKeys({
		organizationId: organization?.id ?? null,
		enrollmentMode
	});
	const queryEnabled = enabled && clerk.loaded && Boolean(organization);
	require_useClearQueriesOnSignOut.useClearQueriesOnSignOut({
		isSignedOut: organization === null,
		authenticated,
		stableKeys: stableKey
	});
	const fetchParams = enrollmentMode ? { enrollmentMode } : void 0;
	const query = require_useQuery.useClerkQuery({
		queryKey,
		queryFn: () => organization?.getDomains(fetchParams),
		enabled: queryEnabled,
		placeholderData: require_keep_previous_data.defineKeepPreviousDataFn(keepPreviousData)
	});
	const revalidate = (0, react.useCallback)(() => queryClient.invalidateQueries({ queryKey: [stableKey] }), [queryClient, stableKey]);
	const createDomain = (0, react.useCallback)(async (name) => {
		let created = await organization?.createDomain(name, enrollmentMode ? { enrollmentMode } : void 0);
		if (created && enrollmentMode === "enterprise_sso") created = (await organization?.prepareOwnershipVerification([created.id]))?.data[0] ?? created;
		await revalidate();
		return created;
	}, [
		organization,
		revalidate,
		enrollmentMode
	]);
	const prepareOwnershipVerification = (0, react.useCallback)(async (domains) => {
		const prepared = await organization?.prepareOwnershipVerification(domains.map((domain) => domain.id));
		await revalidate();
		return prepared;
	}, [organization, revalidate]);
	const attemptOwnershipVerification = (0, react.useCallback)(async (domains) => {
		const attempted = await organization?.attemptOwnershipVerification(domains.map((domain) => domain.id));
		await revalidate();
		return attempted;
	}, [organization, revalidate]);
	const response = query.data;
	const unverifiedOwnershipKey = (0, react.useMemo)(() => (response?.data ?? []).filter((domain) => domain.ownershipVerification?.status === "unverified").map((domain) => domain.id), [response?.data]).join(",");
	(0, react.useEffect)(() => {
		if (!queryEnabled || !organization || !unverifiedOwnershipKey) return;
		let cancelled = false;
		let timeoutId;
		const scheduleNext = () => {
			timeoutId = setTimeout(() => void runAttempt(), OWNERSHIP_VERIFICATION_POLL_INTERVAL_MS);
		};
		const domainIds = unverifiedOwnershipKey.split(",");
		const runAttempt = async () => {
			const result = await organization.attemptOwnershipVerification(domainIds).catch((error) => {
				require_logger.logger.warnOnce(`Clerk: failed to attempt organization domain ownership verification: ${error}`);
			});
			if (cancelled) return;
			await revalidate();
			if (cancelled) return;
			const verifiedDomains = result?.data.filter((domain) => domain.ownershipVerification?.status === "verified") ?? [];
			if (verifiedDomains.length) await onOwnershipVerifiedRef.current?.(verifiedDomains);
			if (cancelled) return;
			if (!!result?.data.length && result.data.every((domain) => domain.ownershipVerification?.status === "verified")) return;
			scheduleNext();
		};
		scheduleNext();
		return () => {
			cancelled = true;
			clearTimeout(timeoutId);
		};
	}, [unverifiedOwnershipKey, queryEnabled]);
	return {
		data: response?.data,
		totalCount: response?.total_count,
		error: query.error ?? null,
		isLoading: query.isLoading,
		isFetching: query.isFetching,
		createDomain,
		prepareOwnershipVerification,
		attemptOwnershipVerification,
		revalidate
	};
}

//#endregion
exports.useOrganizationDomains = useOrganizationDomains;