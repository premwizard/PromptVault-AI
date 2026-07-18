const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_createContextAndHook = require('../hooks/createContextAndHook.js');
const require_useClerk = require('../hooks/useClerk.js');
const require_index = require('../stripe-react/index.js');
const require_useInitializePaymentMethod = require('./useInitializePaymentMethod.js');
const require_useStripeClerkLibs = require('./useStripeClerkLibs.js');
const require_useStripeLoader = require('./useStripeLoader.js');
let react = require("react");
react = require_runtime.__toESM(react);

//#region src/react/billing/payment-element.tsx
const useInternalEnvironment = () => {
	return require_useClerk.useClerk().__internal_environment;
};
const useLocalization = () => {
	const clerk = require_useClerk.useClerk();
	let locale = "en";
	try {
		locale = clerk.__internal_getOption("localization")?.locale || "en";
	} catch {}
	return locale.split("-")[0];
};
const usePaymentSourceUtils = (forResource = "user") => {
	const stripeClerkLibs = require_useStripeClerkLibs.useStripeClerkLibs();
	const environment = useInternalEnvironment();
	const { initializedPaymentMethod, initializePaymentMethod } = require_useInitializePaymentMethod.useInitializePaymentMethod({ for: forResource });
	const stripePublishableKey = environment?.commerceSettings.billing.stripePublishableKey ?? void 0;
	return {
		stripe: require_useStripeLoader.useStripeLoader({
			stripeClerkLibs,
			externalGatewayId: initializedPaymentMethod?.externalGatewayId,
			stripePublishableKey
		}),
		initializePaymentMethod,
		externalClientSecret: initializedPaymentMethod?.externalClientSecret,
		paymentMethodOrder: initializedPaymentMethod?.paymentMethodOrder
	};
};
const [PaymentElementContext, usePaymentElementContext] = require_createContextAndHook.createContextAndHook("PaymentElementContext");
const [StripeUtilsContext, useStripeUtilsContext] = require_createContextAndHook.createContextAndHook("StripeUtilsContext");
const ValidateStripeUtils = ({ children }) => {
	const stripe = require_index.useStripe();
	const elements = require_index.useElements();
	return /* @__PURE__ */ react.default.createElement(StripeUtilsContext.Provider, { value: { value: {
		stripe,
		elements
	} } }, children);
};
const DummyStripeUtils = ({ children }) => {
	return /* @__PURE__ */ react.default.createElement(StripeUtilsContext.Provider, { value: { value: {} } }, children);
};
const PropsProvider = ({ children, ...props }) => {
	const utils = usePaymentSourceUtils(props.for);
	const [isPaymentElementReady, setIsPaymentElementReady] = (0, react.useState)(false);
	return /* @__PURE__ */ react.default.createElement(PaymentElementContext.Provider, { value: { value: {
		...props,
		...utils,
		setIsPaymentElementReady,
		isPaymentElementReady
	} } }, children);
};
const PaymentElementProvider = ({ children, ...props }) => {
	return /* @__PURE__ */ react.default.createElement(PropsProvider, props, /* @__PURE__ */ react.default.createElement(PaymentElementInternalRoot, null, children));
};
const PaymentElementInternalRoot = (props) => {
	const { stripe, externalClientSecret, stripeAppearance } = usePaymentElementContext();
	const locale = useLocalization();
	if (stripe && externalClientSecret) return /* @__PURE__ */ react.default.createElement(require_index.Elements, {
		key: externalClientSecret,
		stripe,
		options: {
			loader: "never",
			clientSecret: externalClientSecret,
			appearance: { variables: stripeAppearance },
			locale
		}
	}, /* @__PURE__ */ react.default.createElement(ValidateStripeUtils, null, props.children));
	return /* @__PURE__ */ react.default.createElement(DummyStripeUtils, null, props.children);
};
const PaymentElement = ({ fallback }) => {
	const { setIsPaymentElementReady, paymentMethodOrder, checkout, stripe, externalClientSecret, paymentDescription, for: _for } = usePaymentElementContext();
	const environment = useInternalEnvironment();
	const applePay = (0, react.useMemo)(() => {
		if (!checkout || !checkout.totals || !checkout.plan) return;
		return { recurringPaymentRequest: {
			paymentDescription: paymentDescription || "",
			managementURL: _for === "organization" ? environment?.displayConfig.organizationProfileUrl || "" : environment?.displayConfig.userProfileUrl || "",
			regularBilling: {
				amount: checkout.totals.totalDueNow?.amount || checkout.totals.grandTotal.amount,
				label: checkout.plan.name,
				recurringPaymentIntervalUnit: checkout.planPeriod === "annual" ? "year" : "month"
			}
		} };
	}, [
		checkout,
		paymentDescription,
		_for,
		environment
	]);
	const options = (0, react.useMemo)(() => {
		return {
			layout: {
				type: "tabs",
				defaultCollapsed: false
			},
			paymentMethodOrder,
			applePay
		};
	}, [applePay, paymentMethodOrder]);
	const onReady = (0, react.useCallback)(() => {
		setIsPaymentElementReady(true);
	}, [setIsPaymentElementReady]);
	if (!stripe || !externalClientSecret) return /* @__PURE__ */ react.default.createElement(react.default.Fragment, null, fallback);
	return /* @__PURE__ */ react.default.createElement(require_index.PaymentElement, {
		fallback,
		onReady,
		options
	});
};
const throwLibsMissingError = () => {
	throw new Error("Clerk: Unable to submit, Stripe libraries are not yet loaded. Be sure to check `isFormReady` before calling `submit`.");
};
const usePaymentElement = () => {
	const { isPaymentElementReady, initializePaymentMethod } = usePaymentElementContext();
	const { stripe, elements } = useStripeUtilsContext();
	const { externalClientSecret } = usePaymentElementContext();
	const submit = (0, react.useCallback)(async () => {
		if (!stripe || !elements) return throwLibsMissingError();
		const { setupIntent, error } = await stripe.confirmSetup({
			elements,
			confirmParams: { return_url: window.location.href },
			redirect: "if_required"
		});
		if (error) return {
			data: null,
			error: {
				gateway: "stripe",
				error: {
					code: error.code,
					message: error.message,
					type: error.type
				}
			}
		};
		return {
			data: {
				gateway: "stripe",
				paymentToken: setupIntent.payment_method
			},
			error: null
		};
	}, [stripe, elements]);
	const reset = (0, react.useCallback)(async () => {
		if (!stripe || !elements) return throwLibsMissingError();
		await initializePaymentMethod();
	}, [
		stripe,
		elements,
		initializePaymentMethod
	]);
	const isProviderReady = Boolean(stripe && externalClientSecret);
	if (!isProviderReady) return {
		submit: throwLibsMissingError,
		reset: throwLibsMissingError,
		isFormReady: false,
		provider: void 0,
		isProviderReady: false
	};
	return {
		submit,
		reset,
		isFormReady: isPaymentElementReady,
		provider: { name: "stripe" },
		isProviderReady
	};
};

//#endregion
exports.PaymentElement = PaymentElement;
exports.PaymentElementProvider = PaymentElementProvider;
exports.usePaymentElement = usePaymentElement;