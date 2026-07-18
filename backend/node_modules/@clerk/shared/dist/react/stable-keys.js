
//#region src/react/stable-keys.ts
const USER_MEMBERSHIPS_KEY = "userMemberships";
const USER_INVITATIONS_KEY = "userInvitations";
const USER_SUGGESTIONS_KEY = "userSuggestions";
const DOMAINS_KEY = "domains";
const MEMBERSHIP_REQUESTS_KEY = "membershipRequests";
const MEMBERSHIPS_KEY = "memberships";
const INVITATIONS_KEY = "invitations";
const API_KEYS_KEY = "apiKeys";
const ORGANIZATION_CREATION_DEFAULTS_KEY = "organizationCreationDefaults";
const OAUTH_CONSENT_INFO_KEY = "oauthConsentInfo";
const PLANS_KEY = "billing-plans";
const SUBSCRIPTION_KEY = "billing-subscription";
const PAYMENT_METHODS_KEY = "billing-payment-methods";
const PAYMENT_ATTEMPTS_KEY = "billing-payment-attempts";
const STATEMENTS_KEY = "billing-statements";
const CREDIT_BALANCE_KEY = "billing-credit-balance";
const STABLE_KEYS = {
	USER_MEMBERSHIPS_KEY,
	USER_INVITATIONS_KEY,
	USER_SUGGESTIONS_KEY,
	DOMAINS_KEY,
	MEMBERSHIP_REQUESTS_KEY,
	MEMBERSHIPS_KEY,
	INVITATIONS_KEY,
	PLANS_KEY,
	SUBSCRIPTION_KEY,
	PAYMENT_METHODS_KEY,
	PAYMENT_ATTEMPTS_KEY,
	STATEMENTS_KEY,
	API_KEYS_KEY,
	ORGANIZATION_CREATION_DEFAULTS_KEY,
	OAUTH_CONSENT_INFO_KEY,
	CREDIT_BALANCE_KEY
};
/**
* Internal stable keys for queries only used by our UI components.
* These keys are not used by the hooks themselves.
*/
const PAYMENT_ATTEMPT_KEY = "billing-payment-attempt";
const BILLING_PLANS_KEY = "billing-plan";
const BILLING_STATEMENTS_KEY = "billing-statement";
const USER_ENTERPRISE_CONNECTIONS_KEY = "userEnterpriseConnections";
const ENTERPRISE_CONNECTION_TEST_RUNS_KEY = "enterpriseConnectionTestRuns";
const ORGANIZATION_ENTERPRISE_CONNECTIONS_KEY = "organizationEnterpriseConnections";
const ORGANIZATION_ENTERPRISE_CONNECTION_TEST_RUNS_KEY = "organizationEnterpriseConnectionTestRuns";
const ORGANIZATION_DOMAINS_KEY = "organizationDomains";
const CREDIT_HISTORY_KEY = "billing-credit-history";
const INTERNAL_STABLE_KEYS = {
	PAYMENT_ATTEMPT_KEY,
	BILLING_PLANS_KEY,
	BILLING_STATEMENTS_KEY,
	CREDIT_HISTORY_KEY,
	USER_ENTERPRISE_CONNECTIONS_KEY,
	ENTERPRISE_CONNECTION_TEST_RUNS_KEY,
	ORGANIZATION_ENTERPRISE_CONNECTIONS_KEY,
	ORGANIZATION_ENTERPRISE_CONNECTION_TEST_RUNS_KEY,
	ORGANIZATION_DOMAINS_KEY
};

//#endregion
exports.INTERNAL_STABLE_KEYS = INTERNAL_STABLE_KEYS;
exports.STABLE_KEYS = STABLE_KEYS;