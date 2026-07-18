const require_contexts = require('../contexts.js');
const require_useOrganizationBase = require('./base/useOrganizationBase.js');
const require_useUser = require('./useUser.js');
let react = require("react");

//#region src/react/hooks/useCheckout.ts
/**
* @function
*
* @param [options] - An object containing the configuration for the checkout flow.
*
* **Required** if the hook is used without a `<CheckoutProvider />` wrapping the component tree.
*/
const useCheckout = (options) => {
	const contextOptions = require_contexts.useCheckoutContext();
	const { for: forOrganization, planId, planPeriod, seatsQuantity, priceId } = options || contextOptions;
	const organization = require_useOrganizationBase.useOrganizationBase();
	const { isLoaded, user } = require_useUser.useUser();
	const clerk = require_contexts.useClerkInstanceContext();
	if (user === null && isLoaded) throw new Error("Clerk: Ensure that `useCheckout` is inside a component wrapped with `<Show when=\"signed-in\" />`.");
	if (isLoaded && forOrganization === "organization" && organization === null) throw new Error("Clerk: Ensure your flow checks for an active organization. Retrieve `orgId` from `useAuth()` and confirm it is defined. For SSR, see: https://clerk.com/docs/reference/backend/types/auth-object#how-to-access-the-auth-object");
	const signal = (0, react.useCallback)(() => {
		return clerk.__experimental_checkout({
			planId,
			planPeriod,
			for: forOrganization,
			seatsQuantity,
			priceId
		});
	}, [
		user?.id,
		organization?.id,
		planId,
		planPeriod,
		forOrganization,
		seatsQuantity,
		priceId
	]);
	const subscribe = (0, react.useCallback)((callback) => {
		if (!clerk.loaded) return () => {};
		return clerk.__internal_state.__internal_effect(() => {
			signal();
			callback();
		});
	}, [
		signal,
		clerk.loaded,
		clerk.__internal_state
	]);
	const getSnapshot = (0, react.useCallback)(() => {
		return signal();
	}, [signal]);
	return (0, react.useSyncExternalStore)(subscribe, getSnapshot, getSnapshot);
};

//#endregion
exports.useCheckout = useCheckout;