const require_keep_previous_data = require('../query/keep-previous-data.js');
const require_useQuery = require('../query/useQuery.js');
const require_useBillingIsEnabled = require('../hooks/useBillingIsEnabled.js');
let react = require("react");

//#region src/react/billing/useStripeLoader.tsx
/**
* @internal
*/
function useStripeLoader(options) {
	const { stripeClerkLibs, externalGatewayId, stripePublishableKey } = options;
	const queryKey = (0, react.useMemo)(() => {
		return ["stripe-sdk", {
			externalGatewayId,
			stripePublishableKey
		}];
	}, [externalGatewayId, stripePublishableKey]);
	const billingEnabled = require_useBillingIsEnabled.useBillingIsEnabled({ authenticated: true });
	return require_useQuery.useClerkQuery({
		queryKey,
		queryFn: () => {
			if (!stripeClerkLibs || !externalGatewayId || !stripePublishableKey) return null;
			return stripeClerkLibs.loadStripe(stripePublishableKey, { stripeAccount: externalGatewayId });
		},
		enabled: Boolean(stripeClerkLibs && externalGatewayId && stripePublishableKey) && billingEnabled,
		staleTime: 1e3 * 60,
		refetchOnWindowFocus: false,
		placeholderData: require_keep_previous_data.defineKeepPreviousDataFn(true)
	}).data;
}

//#endregion
exports.useStripeLoader = useStripeLoader;