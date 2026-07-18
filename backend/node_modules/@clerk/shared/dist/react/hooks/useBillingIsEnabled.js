const require_contexts = require('../contexts.js');
const require_useUserBase = require('./base/useUserBase.js');
const require_useOrganizationBase = require('./base/useOrganizationBase.js');

//#region src/react/hooks/useBillingIsEnabled.ts
/**
* @internal
*/
function useBillingIsEnabled(params) {
	const clerk = require_contexts.useClerkInstanceContext();
	const enabledFromParam = params?.enabled ?? true;
	const environment = clerk.__internal_environment;
	const user = require_useUserBase.useUserBase();
	const organization = require_useOrganizationBase.useOrganizationBase();
	const userBillingEnabled = environment?.commerceSettings.billing.user.enabled;
	const orgBillingEnabled = environment?.commerceSettings.billing.organization.enabled;
	const billingEnabled = params?.for === "organization" ? orgBillingEnabled : params?.for === "user" ? userBillingEnabled : userBillingEnabled || orgBillingEnabled;
	const isOrganization = params?.for === "organization";
	const requireUserAndOrganizationWhenAuthenticated = params?.authenticated ?? true ? (isOrganization ? Boolean(organization?.id) : true) && Boolean(user?.id) : true;
	return billingEnabled && enabledFromParam && clerk.loaded && requireUserAndOrganizationWhenAuthenticated;
}

//#endregion
exports.useBillingIsEnabled = useBillingIsEnabled;