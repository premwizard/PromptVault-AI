import type { ClerkPaginationRequest } from '@clerk/shared/types';
import type { DeletedObject } from '../resources';
import type { PaginatedResourceResponse } from '../resources/Deserializer';
import type { OAuthApplication } from '../resources/OAuthApplication';
import { AbstractAPI } from './AbstractApi';
import type { WithSign } from './util-types';
/** @generateWithEmptyComment */
export type CreateOAuthApplicationParams = {
    /**
     * A descriptive name for the OAuth application (e.g., "My Web App", "My Mobile App"). Maximum length: 256 characters.
     */
    name: string;
    /** An array of redirect URIs for the OAuth application. */
    redirectUris?: Array<string> | null | undefined;
    /** Scopes for the OAuth application that dictate the user payload of the OAuth user info endpoint. Available scopes are `profile`, `email`, `public_metadata`, `private_metadata`. Provide the requested scopes as a string, separated by spaces. */
    scopes?: string | null | undefined;
    /** Whether the OAuth application is public. If `true`, the Proof Key of Code Exchange (PKCE) flow can be used. */
    public?: boolean | null | undefined;
};
/** @generateWithEmptyComment */
export type UpdateOAuthApplicationParams = CreateOAuthApplicationParams & {
    /** The ID of the OAuth application to update. */
    oauthApplicationId: string;
};
/** @generateWithEmptyComment */
export type RevokeOAuthApplicationTokenParams = {
    /** The ID of the OAuth application for which to revoke the token. */
    oauthApplicationId: string;
    /** The opaque OAuth access token or refresh token to revoke. */
    token: string;
};
/** @generateWithEmptyComment */
export type GetOAuthApplicationListParams = ClerkPaginationRequest<{
    /**
     * Returns OAuth applications in a particular order. Prefix a value with `+` to sort in ascending order, or `-` to sort in descending order. Defaults to `-created_at`.
     */
    orderBy?: WithSign<'name' | 'created_at'>;
}>;
/** @generateWithEmptyComment */
export declare class OAuthApplicationsApi extends AbstractAPI {
    /**
     * Gets a list of OAuth applications for the instance. By default, the list is returned in descending order by creation date (newest first).
     * @param params - The parameters to get the OAuth applications with.
     * @returns A [`PaginatedResourceResponse`](https://clerk.com/docs/reference/backend/types/paginated-resource-response) object with a `data` property containing an array of [`OAuthApplication`](https://clerk.com/docs/reference/backend/types/backend-oauth-application) objects and a `totalCount` property containing the total number of OAuth applications.
     */
    list(params?: GetOAuthApplicationListParams): Promise<PaginatedResourceResponse<OAuthApplication[]>>;
    /**
     * Gets the given OAuth application.
     * @param oauthApplicationId - The ID of the OAuth application to get.
     * @returns The [`OAuthApplication`](https://clerk.com/docs/reference/backend/types/backend-oauth-application) object.
     */
    get(oauthApplicationId: string): Promise<OAuthApplication>;
    /**
     * Creates a new OAuth application.
     * @param params - The parameters to create the OAuth application with.
     * @returns The created [`OAuthApplication`](https://clerk.com/docs/reference/backend/types/backend-oauth-application) object.
     */
    create(params: CreateOAuthApplicationParams): Promise<OAuthApplication>;
    /**
     * Updates the given OAuth application.
     * @returns The updated [`OAuthApplication`](https://clerk.com/docs/reference/backend/types/backend-oauth-application) object.
     */
    update(params: UpdateOAuthApplicationParams): Promise<OAuthApplication>;
    /**
     * Deletes the given OAuth application.
     * @param oauthApplicationId - The ID of the OAuth application to delete.
     * @returns The [`DeletedObject`](https://clerk.com/docs/reference/backend/types/deleted-object) object.
     */
    delete(oauthApplicationId: string): Promise<DeletedObject>;
    /**
     * Rotates the secret of the given OAuth application. When the client secret is rotated, ensure that you update it in your authorized OAuth clients.
     * @param oauthApplicationId - The ID of the OAuth application to rotate the secret of.
     * @returns The [`OAuthApplication`](https://clerk.com/docs/reference/backend/types/backend-oauth-application) object.
     */
    rotateSecret(oauthApplicationId: string): Promise<OAuthApplication>;
    /**
     * Revokes both the [OAuth access token](!oauth-access-token) and refresh token for the associated grant for the given [`OAuthApplication`](/docs/reference/backend/types/backend-oauth-application). The request may specify either token.
     */
    revokeToken(params: RevokeOAuthApplicationTokenParams): Promise<void>;
}
//# sourceMappingURL=OAuthApplicationsApi.d.ts.map