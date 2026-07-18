const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_utils = require('./utils.js');
let react = require("react");
react = require_runtime.__toESM(react);

//#region src/react/stripe-react/index.tsx
const ElementsContext = react.default.createContext(null);
ElementsContext.displayName = "ElementsContext";
const parseElementsContext = (ctx, useCase) => {
	if (!ctx) throw new Error(`Could not find Elements context; You need to wrap the part of your app that ${useCase} in an <Elements> provider.`);
	return ctx;
};
/**
* The `Elements` provider allows you to use [Element components](https://stripe.com/docs/stripe-js/react#element-components) and access the [Stripe object](https://stripe.com/docs/js/initializing) in any nested component.
* Render an `Elements` provider at the root of your React app so that it is available everywhere you need it.
*
* To use the `Elements` provider, call `loadStripe` from `@stripe/stripe-js` with your publishable key.
* The `loadStripe` function will asynchronously load the Stripe.js script and initialize a `Stripe` object.
* Pass the returned `Promise` to `Elements`.
*
* @docs https://stripe.com/docs/stripe-js/react#elements-provider
*/
const Elements = (({ stripe: rawStripeProp, options, children }) => {
	const parsed = react.default.useMemo(() => parseStripeProp(rawStripeProp), [rawStripeProp]);
	const [ctx, setContext] = react.default.useState(() => ({
		stripe: parsed.tag === "sync" ? parsed.stripe : null,
		elements: parsed.tag === "sync" ? parsed.stripe.elements(options) : null
	}));
	react.default.useEffect(() => {
		let isMounted = true;
		const safeSetContext = (stripe) => {
			setContext((ctx) => {
				if (ctx.stripe) return ctx;
				return {
					stripe,
					elements: stripe.elements(options)
				};
			});
		};
		if (parsed.tag === "async" && !ctx.stripe) parsed.stripePromise.then((stripe) => {
			if (stripe && isMounted) safeSetContext(stripe);
		});
		else if (parsed.tag === "sync" && !ctx.stripe) safeSetContext(parsed.stripe);
		return () => {
			isMounted = false;
		};
	}, [
		parsed,
		ctx,
		options
	]);
	const prevStripe = require_utils.usePrevious(rawStripeProp);
	react.default.useEffect(() => {
		if (prevStripe !== null && prevStripe !== rawStripeProp) console.warn("Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.");
	}, [prevStripe, rawStripeProp]);
	const prevOptions = require_utils.usePrevious(options);
	react.default.useEffect(() => {
		if (!ctx.elements) return;
		const updates = extractAllowedOptionsUpdates(options, prevOptions, ["clientSecret", "fonts"]);
		if (updates) ctx.elements.update(updates);
	}, [
		options,
		prevOptions,
		ctx.elements
	]);
	return /* @__PURE__ */ react.default.createElement(ElementsContext.Provider, { value: ctx }, children);
});
const useElementsContextWithUseCase = (useCaseMessage) => {
	return parseElementsContext(react.default.useContext(ElementsContext), useCaseMessage);
};
const useElements = () => {
	const { elements } = useElementsContextWithUseCase("calls useElements()");
	return elements;
};
const INVALID_STRIPE_ERROR = "Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.";
const validateStripe = (maybeStripe, errorMsg = INVALID_STRIPE_ERROR) => {
	if (maybeStripe === null || isStripe(maybeStripe)) return maybeStripe;
	throw new Error(errorMsg);
};
const parseStripeProp = (raw, errorMsg = INVALID_STRIPE_ERROR) => {
	if (isPromise(raw)) return {
		tag: "async",
		stripePromise: Promise.resolve(raw).then((result) => validateStripe(result, errorMsg))
	};
	const stripe = validateStripe(raw, errorMsg);
	if (stripe === null) return { tag: "empty" };
	return {
		tag: "sync",
		stripe
	};
};
const isUnknownObject = (raw) => {
	return raw !== null && typeof raw === "object";
};
const isPromise = (raw) => {
	return isUnknownObject(raw) && typeof raw.then === "function";
};
const isStripe = (raw) => {
	return isUnknownObject(raw) && typeof raw.elements === "function" && typeof raw.createToken === "function" && typeof raw.createPaymentMethod === "function" && typeof raw.confirmCardPayment === "function";
};
const extractAllowedOptionsUpdates = (options, prevOptions, immutableKeys) => {
	if (!isUnknownObject(options)) return null;
	return Object.keys(options).reduce((newOptions, key) => {
		const isUpdated = !isUnknownObject(prevOptions) || !isEqual(options[key], prevOptions[key]);
		if (immutableKeys.includes(key)) {
			if (isUpdated) console.warn(`Unsupported prop change: options.${key} is not a mutable property.`);
			return newOptions;
		}
		if (!isUpdated) return newOptions;
		return {
			...newOptions || {},
			[key]: options[key]
		};
	}, null);
};
const PLAIN_OBJECT_STR = "[object Object]";
const isEqual = (left, right) => {
	if (!isUnknownObject(left) || !isUnknownObject(right)) return left === right;
	const leftArray = Array.isArray(left);
	if (leftArray !== Array.isArray(right)) return false;
	const leftPlainObject = Object.prototype.toString.call(left) === PLAIN_OBJECT_STR;
	if (leftPlainObject !== (Object.prototype.toString.call(right) === PLAIN_OBJECT_STR)) return false;
	if (!leftPlainObject && !leftArray) return left === right;
	const leftKeys = Object.keys(left);
	const rightKeys = Object.keys(right);
	if (leftKeys.length !== rightKeys.length) return false;
	const keySet = {};
	for (let i = 0; i < leftKeys.length; i += 1) keySet[leftKeys[i]] = true;
	for (let i = 0; i < rightKeys.length; i += 1) keySet[rightKeys[i]] = true;
	const allKeys = Object.keys(keySet);
	if (allKeys.length !== leftKeys.length) return false;
	const l = left;
	const r = right;
	const pred = (key) => {
		return isEqual(l[key], r[key]);
	};
	return allKeys.every(pred);
};
const useStripe = () => {
	const { stripe } = useElementsOrCheckoutSdkContextWithUseCase("calls useStripe()");
	return stripe;
};
const useElementsOrCheckoutSdkContextWithUseCase = (useCaseString) => {
	return parseElementsContext(react.default.useContext(ElementsContext), useCaseString);
};
const capitalized = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const createElementComponent = (type, isServer) => {
	const displayName = `${capitalized(type)}Element`;
	const ClientElement = ({ id, className, fallback, options = {}, onBlur, onFocus, onReady, onChange, onEscape, onClick, onLoadError, onLoaderStart, onNetworksChange, onConfirm, onCancel, onShippingAddressChange, onShippingRateChange }) => {
		const ctx = useElementsOrCheckoutSdkContextWithUseCase(`mounts <${displayName}>`);
		const elements = "elements" in ctx ? ctx.elements : null;
		const [element, setElement] = react.default.useState(null);
		const elementRef = react.default.useRef(null);
		const domNode = react.default.useRef(null);
		const [isReady, setReady] = (0, react.useState)(false);
		require_utils.useAttachEvent(element, "blur", onBlur);
		require_utils.useAttachEvent(element, "focus", onFocus);
		require_utils.useAttachEvent(element, "escape", onEscape);
		require_utils.useAttachEvent(element, "click", onClick);
		require_utils.useAttachEvent(element, "loaderror", onLoadError);
		require_utils.useAttachEvent(element, "loaderstart", onLoaderStart);
		require_utils.useAttachEvent(element, "networkschange", onNetworksChange);
		require_utils.useAttachEvent(element, "confirm", onConfirm);
		require_utils.useAttachEvent(element, "cancel", onCancel);
		require_utils.useAttachEvent(element, "shippingaddresschange", onShippingAddressChange);
		require_utils.useAttachEvent(element, "shippingratechange", onShippingRateChange);
		require_utils.useAttachEvent(element, "change", onChange);
		let readyCallback;
		if (onReady) readyCallback = () => {
			setReady(true);
			onReady(element);
		};
		require_utils.useAttachEvent(element, "ready", readyCallback);
		react.default.useLayoutEffect(() => {
			if (elementRef.current === null && domNode.current !== null && elements) {
				let newElement = null;
				if (elements) newElement = elements.create(type, options);
				elementRef.current = newElement;
				setElement(newElement);
				if (newElement) newElement.mount(domNode.current);
			}
		}, [elements, options]);
		const prevOptions = require_utils.usePrevious(options);
		react.default.useEffect(() => {
			if (!elementRef.current) return;
			const updates = extractAllowedOptionsUpdates(options, prevOptions, ["paymentRequest"]);
			if (updates && "update" in elementRef.current) elementRef.current.update(updates);
		}, [options, prevOptions]);
		react.default.useLayoutEffect(() => {
			return () => {
				if (elementRef.current && typeof elementRef.current.destroy === "function") try {
					elementRef.current.destroy();
					elementRef.current = null;
				} catch {}
			};
		}, []);
		return /* @__PURE__ */ react.default.createElement(react.default.Fragment, null, !isReady && fallback, /* @__PURE__ */ react.default.createElement("div", {
			id,
			style: {
				height: isReady ? "unset" : "0px",
				visibility: isReady ? "visible" : "hidden"
			},
			className,
			ref: domNode
		}));
	};
	const ServerElement = (props) => {
		useElementsOrCheckoutSdkContextWithUseCase(`mounts <${displayName}>`);
		const { id, className } = props;
		return /* @__PURE__ */ react.default.createElement("div", {
			id,
			className
		});
	};
	const Element = isServer ? ServerElement : ClientElement;
	Element.displayName = displayName;
	Element.__elementType = type;
	return Element;
};
const PaymentElement = createElementComponent("payment", typeof window === "undefined");

//#endregion
exports.Elements = Elements;
exports.PaymentElement = PaymentElement;
exports.useElements = useElements;
exports.useStripe = useStripe;