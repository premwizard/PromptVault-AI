import type { BillingMoneyAmount } from '@clerk/shared/types';
import { BillingSubscriptionItem } from './CommerceSubscriptionItem';
import type { BillingSubscriptionJSON } from './JSON';
/**
 * The `BillingSubscription` object is similar to the [`BillingSubscriptionResource`](https://clerk.com/docs/reference/types/billing-subscription-resource) object as it holds information about a subscription, as well as methods for managing it. However, the `BillingSubscription` object is different in that it is used in the [Backend API](https://clerk.com/docs/reference/backend-api/tag/billing/GET/organizations/%7Borganization_id%7D/billing/subscription){{ target: '_blank' }} and is not directly accessible from the Frontend API.
 *
 * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
 */
export declare class BillingSubscription {
    /** The unique identifier for the Subscription. */
    readonly id: string;
    /** The current status of the Subscription. */
    readonly status: BillingSubscriptionJSON['status'];
    /** The ID of the payer for this Subscription. */
    readonly payerId: string;
    /** The Unix timestamp (milliseconds) of when the Subscription was created. */
    readonly createdAt: number;
    /** The Unix timestamp (milliseconds) of when the Subscription was last updated. */
    readonly updatedAt: number;
    /** The Unix timestamp (milliseconds) of when the Subscription became active. */
    readonly activeAt: number | null;
    /** The Unix timestamp (milliseconds) of when the Subscription became past due. */
    readonly pastDueAt: number | null;
    /** All of the Subscription Items in this Subscription. */
    readonly subscriptionItems: BillingSubscriptionItem[];
    /** Information about the next scheduled payment for this Subscription. */
    readonly nextPayment: {
        /** The Unix timestamp (milliseconds) of when the next payment is scheduled. */
        date: number;
        /** The amount of the next payment. */
        amount: BillingMoneyAmount;
    } | null;
    /** Whether the payer is eligible for a free trial. */
    readonly eligibleForFreeTrial: boolean;
    constructor(
    /** The unique identifier for the Subscription. */
    id: string, 
    /** The current status of the Subscription. */
    status: BillingSubscriptionJSON['status'], 
    /** The ID of the payer for this Subscription. */
    payerId: string, 
    /** The Unix timestamp (milliseconds) of when the Subscription was created. */
    createdAt: number, 
    /** The Unix timestamp (milliseconds) of when the Subscription was last updated. */
    updatedAt: number, 
    /** The Unix timestamp (milliseconds) of when the Subscription became active. */
    activeAt: number | null, 
    /** The Unix timestamp (milliseconds) of when the Subscription became past due. */
    pastDueAt: number | null, 
    /** All of the Subscription Items in this Subscription. */
    subscriptionItems: BillingSubscriptionItem[], 
    /** Information about the next scheduled payment for this Subscription. */
    nextPayment: {
        /** The Unix timestamp (milliseconds) of when the next payment is scheduled. */
        date: number;
        /** The amount of the next payment. */
        amount: BillingMoneyAmount;
    } | null, 
    /** Whether the payer is eligible for a free trial. */
    eligibleForFreeTrial: boolean);
    static fromJSON(data: BillingSubscriptionJSON): BillingSubscription;
}
//# sourceMappingURL=CommerceSubscription.d.ts.map