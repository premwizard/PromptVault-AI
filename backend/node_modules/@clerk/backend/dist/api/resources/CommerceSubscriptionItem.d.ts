import type { BillingMoneyAmount } from '@clerk/shared/types';
import { BillingPlan } from './CommercePlan';
import type { BillingSubscriptionItemJSON } from './JSON';
/**
 * The `BillingSubscriptionItem` object is similar to the [`BillingSubscriptionItemResource`](https://clerk.com/docs/reference/types/billing-subscription-item-resource) object as it holds information about a subscription item, as well as methods for managing it. However, the `BillingSubscriptionItem` object is different in that it is used in the [Backend API](https://clerk.com/docs/reference/backend-api/tag/billing/GET/billing/subscription_items){{ target: '_blank' }} and is not directly accessible from the Frontend API.
 *
 * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
 */
export declare class BillingSubscriptionItem {
    /** The unique identifier for the Subscription Item. */
    readonly id: string;
    /** The status of the Subscription Item. */
    readonly status: BillingSubscriptionItemJSON['status'];
    /** The period of the Plan associated with this Subscription Item. */
    readonly planPeriod: 'month' | 'annual';
    /** The Unix timestamp (milliseconds) of when the current period starts. */
    readonly periodStart: number;
    /** Information about the next scheduled payment for this Subscription Item. */
    readonly nextPayment: {
        /** The amount of the next payment. */
        amount: number;
        /** The Unix timestamp (milliseconds) of when the next payment is scheduled. */
        date: number;
    } | null | undefined;
    /** The current amount for the Subscription Item. */
    readonly amount: BillingMoneyAmount | undefined;
    /** The Plan associated with this Subscription Item. */
    readonly plan: BillingPlan | null;
    /** The ID of the Plan associated with this Subscription Item. */
    readonly planId: string | null;
    /** The Unix timestamp (milliseconds) of when the Subscription Item was created. */
    readonly createdAt: number;
    /** The Unix timestamp (milliseconds) of when the Subscription Item was last updated. */
    readonly updatedAt: number;
    /** The Unix timestamp (milliseconds) of when the current period ends. */
    readonly periodEnd: number | null;
    /** The Unix timestamp (milliseconds) of when the Subscription Item was canceled. */
    readonly canceledAt: number | null;
    /** The Unix timestamp (milliseconds) of when the Subscription Item became past due. */
    readonly pastDueAt: number | null;
    /** The Unix timestamp (milliseconds) of when the Subscription Item ended. */
    readonly endedAt: number | null;
    /** The ID of the payer for this Subscription Item. */
    readonly payerId: string | undefined;
    /** Whether this Subscription Item is currently in a free trial period. */
    readonly isFreeTrial?: boolean | undefined;
    /** The lifetime amount paid for this Subscription Item. */
    readonly lifetimePaid?: BillingMoneyAmount | undefined;
    constructor(
    /** The unique identifier for the Subscription Item. */
    id: string, 
    /** The status of the Subscription Item. */
    status: BillingSubscriptionItemJSON['status'], 
    /** The period of the Plan associated with this Subscription Item. */
    planPeriod: 'month' | 'annual', 
    /** The Unix timestamp (milliseconds) of when the current period starts. */
    periodStart: number, 
    /** Information about the next scheduled payment for this Subscription Item. */
    nextPayment: {
        /** The amount of the next payment. */
        amount: number;
        /** The Unix timestamp (milliseconds) of when the next payment is scheduled. */
        date: number;
    } | null | undefined, 
    /** The current amount for the Subscription Item. */
    amount: BillingMoneyAmount | undefined, 
    /** The Plan associated with this Subscription Item. */
    plan: BillingPlan | null, 
    /** The ID of the Plan associated with this Subscription Item. */
    planId: string | null, 
    /** The Unix timestamp (milliseconds) of when the Subscription Item was created. */
    createdAt: number, 
    /** The Unix timestamp (milliseconds) of when the Subscription Item was last updated. */
    updatedAt: number, 
    /** The Unix timestamp (milliseconds) of when the current period ends. */
    periodEnd: number | null, 
    /** The Unix timestamp (milliseconds) of when the Subscription Item was canceled. */
    canceledAt: number | null, 
    /** The Unix timestamp (milliseconds) of when the Subscription Item became past due. */
    pastDueAt: number | null, 
    /** The Unix timestamp (milliseconds) of when the Subscription Item ended. */
    endedAt: number | null, 
    /** The ID of the payer for this Subscription Item. */
    payerId: string | undefined, 
    /** Whether this Subscription Item is currently in a free trial period. */
    isFreeTrial?: boolean | undefined, 
    /** The lifetime amount paid for this Subscription Item. */
    lifetimePaid?: BillingMoneyAmount | undefined);
    static fromJSON(data: BillingSubscriptionItemJSON): BillingSubscriptionItem;
}
//# sourceMappingURL=CommerceSubscriptionItem.d.ts.map