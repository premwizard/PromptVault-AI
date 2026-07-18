import { BillingSubscriptionPlanPeriod, ForPayerType } from "../types/billing.js";
import { ClerkOptions, LoadedClerk } from "../types/clerk.js";
import { InitialState } from "../types/ssr.js";
import React, { PropsWithChildren } from "react";

//#region src/react/contexts.d.ts
declare const ClerkInstanceContext: React.Context<{
    value: LoadedClerk;
  } | undefined>, useClerkInstanceContext: () => LoadedClerk;
/**
 * Provides initial Clerk state (session, user, organization data) from server-side rendering
 * to child components via React context.
 *
 * Passing in a promise is only supported for React >= 19.
 *
 * The initialState is snapshotted on mount and cannot change during the component lifecycle.
 *
 * Note that different parts of the React tree can use separate InitialStateProvider instances
 * with different initialState values if needed.
 */
declare function InitialStateProvider({
  children,
  initialState
}: {
  children: React.ReactNode;
  initialState: InitialState | Promise<InitialState> | undefined;
}): React.JSX.Element;
declare function useInitialStateContext(): InitialState | undefined;
declare const OptionsContext: React.Context<ClerkOptions>;
/**
 * @interface
 */
type UseCheckoutOptions = {
  /**
   * Specifies if the checkout is for an Organization.
   *
   * @default 'user'
   */
  for?: ForPayerType;
  /**
   * The billing period for the Plan.
   */
  planPeriod: BillingSubscriptionPlanPeriod;
  /**
   * The ID of the Subscription Plan to check out (e.g. `cplan_xxx`).
   */
  planId: string;
  /**
   * The number of total seats to check out for
   */
  seatsQuantity?: number;
  /**
   * The specific price ID to check out for, used when the desired price ID is not the current default price
   */
  priceId?: string;
};
declare const __experimental_CheckoutProvider: ({
  children,
  ...rest
}: PropsWithChildren<UseCheckoutOptions>) => React.JSX.Element;
/**
 * @internal
 */
declare function useOptionsContext(): ClerkOptions;
/**
 * @internal
 */
declare function useAssertWrappedByClerkProvider(displayNameOrFn: string | (() => void)): void;
//#endregion
export { ClerkInstanceContext, InitialStateProvider, OptionsContext, __experimental_CheckoutProvider, useAssertWrappedByClerkProvider, useClerkInstanceContext, useInitialStateContext, useOptionsContext };