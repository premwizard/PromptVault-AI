const require_keep_previous_data = require('../query/keep-previous-data.js');
const require_useQuery = require('../query/useQuery.js');
const require_useClerk = require('../hooks/useClerk.js');

//#region src/react/billing/useStripeClerkLibs.tsx
/**
* @internal
*/
function useStripeClerkLibs() {
	const clerk = require_useClerk.useClerk();
	return require_useQuery.useClerkQuery({
		queryKey: ["clerk-stripe-sdk"],
		queryFn: async () => {
			return { loadStripe: await clerk.__internal_loadStripeJs() };
		},
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		placeholderData: require_keep_previous_data.defineKeepPreviousDataFn(true)
	}).data ?? null;
}

//#endregion
exports.useStripeClerkLibs = useStripeClerkLibs;