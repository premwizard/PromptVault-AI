import type { PaginatedResourceResponse } from '../resources/Deserializer';
import type { RedirectUrl } from '../resources/RedirectUrl';
import { AbstractAPI } from './AbstractApi';
/** @generateWithEmptyComment */
export type CreateRedirectUrlParams = {
    /** The full URL value prefixed with `https://` or a custom scheme. For example, `https://my-app.com/oauth-callback` or `my-app://oauth-callback`. */
    url: string;
};
/** @generateWithEmptyComment */
export declare class RedirectUrlAPI extends AbstractAPI {
    /**
     * Gets a list of whitelisted redirect URLs for the instance. By default, the list is returned in descending order by creation date (newest first).
     * @returns A [`PaginatedResourceResponse`](https://clerk.com/docs/reference/backend/types/paginated-resource-response) object with a `data` property containing an array of [`RedirectUrl`](https://clerk.com/docs/reference/backend/types/backend-redirect-url) objects and a `totalCount` property containing the total number of redirect URLs.
     */
    getRedirectUrlList(): Promise<PaginatedResourceResponse<RedirectUrl[]>>;
    /**
     * Gets the given [`RedirectUrl`](https://clerk.com/docs/reference/backend/types/backend-redirect-url).
     * @param redirectUrlId - The ID of the redirect URL to get.
     */
    getRedirectUrl(redirectUrlId: string): Promise<RedirectUrl>;
    /**
     * Creates a new redirect URL for the instance.
     * @returns The created [`RedirectUrl`](https://clerk.com/docs/reference/backend/types/backend-redirect-url) object.
     */
    createRedirectUrl(params: CreateRedirectUrlParams): Promise<RedirectUrl>;
    /**
     * Deletes the given redirect URL.
     * @param redirectUrlId - The ID of the redirect URL to delete.
     * @returns The deleted [`RedirectUrl`](https://clerk.com/docs/reference/backend/types/backend-redirect-url) object.
     */
    deleteRedirectUrl(redirectUrlId: string): Promise<RedirectUrl>;
}
//# sourceMappingURL=RedirectUrlApi.d.ts.map