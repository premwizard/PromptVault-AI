import type { ClerkPaginationRequest } from '@clerk/shared/types';
import type { BillingPlan } from '../resources/CommercePlan';
import type { BillingSubscription } from '../resources/CommerceSubscription';
import type { BillingSubscriptionItem } from '../resources/CommerceSubscriptionItem';
import type { PaginatedResourceResponse } from '../resources/Deserializer';
import { AbstractAPI } from './AbstractApi';
/** @generateWithEmptyComment */
export type GetPlanListParams = ClerkPaginationRequest<{
    /**
     * Filters plans by the type of payer.
     */
    payerType: 'org' | 'user';
}>;
/** @inline */
export type CancelSubscriptionItemParams = {
    /**
     * Whether the Subscription Item should be canceled immediately. If `false`, the Subscription Item will be canceled at the end of the current billing period.
     */
    endNow?: boolean;
};
/** @inline */
export type ExtendSubscriptionItemFreeTrialParams = {
    /**
     * The date to extend the free trial to. Must be in the future and not more than 365 days from the current trial end date.
     */
    extendTo: Date;
};
/** @generateWithEmptyComment */
export declare class BillingAPI extends AbstractAPI {
    /**
     * Gets the list of Billing Plans for the instance. By default, the list is returned in descending order by creation date (newest first).
     * @returns A [`PaginatedResourceResponse`](https://clerk.com/docs/reference/backend/types/paginated-resource-response) object with a `data` property containing an array of [`BillingPlan`](https://clerk.com/docs/reference/backend/types/billing-plan) objects and a `totalCount` property containing the total number of Billing Plans for the instance.
     * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
     */
    getPlanList(params?: GetPlanListParams): Promise<PaginatedResourceResponse<BillingPlan[]>>;
    /**
     * Cancels the given Subscription Item.
     * @param subscriptionItemId - The ID of the Subscription Item to cancel.
     * @param params - The parameters for the request.
     * @returns The cancelled [`BillingSubscriptionItem`](https://clerk.com/docs/reference/backend/types/billing-subscription-item) object.
     * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
     */
    cancelSubscriptionItem(subscriptionItemId: string, params?: CancelSubscriptionItemParams): Promise<BillingSubscriptionItem>;
    /**
     * Extends the free trial for the given Subscription Item.
     * @param subscriptionItemId - The ID of the Subscription Item to extend the free trial for.
     * @param params - The parameters for the request.
     * @returns The updated [`BillingSubscriptionItem`](https://clerk.com/docs/reference/backend/types/billing-subscription-item) object.
     * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
     */
    extendSubscriptionItemFreeTrial(subscriptionItemId: string, params: ExtendSubscriptionItemFreeTrialParams): Promise<BillingSubscriptionItem>;
    /**
     * Gets the [`BillingSubscription`](https://clerk.com/docs/reference/backend/types/billing-subscription) for the given Organization.
     * @param organizationId - The ID of the Organization to get the Billing Subscription for.
     * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
     */
    getOrganizationBillingSubscription(organizationId: string): Promise<BillingSubscription>;
    /**
     * Gets the [`BillingSubscription`](https://clerk.com/docs/reference/backend/types/billing-subscription) for the given User.
     * @param userId - The ID of the User to get the Billing Subscription for.
     * @experimental This is an experimental API for the Billing feature that is available under a public beta, and the API is subject to change. It is advised to [pin](https://clerk.com/docs/pinning) the SDK version and the clerk-js version to avoid breaking changes.
     */
    getUserBillingSubscription(userId: string): Promise<BillingSubscription>;
}
//# sourceMappingURL=BillingApi.d.ts.map