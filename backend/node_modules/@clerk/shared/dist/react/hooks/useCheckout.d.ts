import { CheckoutSignalValue } from "../../types/clerk.js";
import { __experimental_CheckoutProvider } from "../contexts.js";

//#region src/react/hooks/useCheckout.d.ts
type UseCheckoutParams = Parameters<typeof __experimental_CheckoutProvider>[0];
/**
 * @function
 *
 * @param [options] - An object containing the configuration for the checkout flow.
 *
 * **Required** if the hook is used without a `<CheckoutProvider />` wrapping the component tree.
 */
declare const useCheckout: (options?: UseCheckoutParams) => CheckoutSignalValue;
//#endregion
export { useCheckout };