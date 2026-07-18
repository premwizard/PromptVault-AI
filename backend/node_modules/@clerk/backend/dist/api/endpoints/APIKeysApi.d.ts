import type { ClerkPaginationRequest } from '@clerk/shared/types';
import type { PaginatedResourceResponse } from '../../api/resources/Deserializer';
import type { APIKey } from '../resources/APIKey';
import type { DeletedObject } from '../resources/DeletedObject';
import { AbstractAPI } from './AbstractApi';
/** @generateWithEmptyComment */
export type GetAPIKeyListParams = ClerkPaginationRequest<{
    /** The user or Organization ID to query API keys by. */
    subject: string;
    /** Whether to include invalid API keys (revoked or expired). Defaults to `false`. */
    includeInvalid?: boolean;
}>;
/** @generateWithEmptyComment */
export type CreateAPIKeyParams = {
    /** A descriptive name for the API key (e.g., "Production API Key", "Development Key"). */
    name: string;
    /** The user or Organization ID to associate the API key with. */
    subject: string;
    /** The description of the API key. */
    description?: string | null;
    /** Custom claims to store additional information about the API key. */
    claims?: Record<string, any> | null;
    /** Scopes to limit the API key's access to specific resources. */
    scopes?: string[];
    /** The user ID of the user who created the API key. */
    createdBy?: string | null;
    /** The number of seconds until the API key expires. Defaults to `null` (never expires). */
    secondsUntilExpiration?: number | null;
};
/** @generateWithEmptyComment */
export type RevokeAPIKeyParams = {
    /** The ID of the API key to revoke. */
    apiKeyId: string;
    /** The reason for revoking the API key. Useful for your records. */
    revocationReason?: string | null;
};
/** @generateWithEmptyComment */
export type UpdateAPIKeyParams = {
    /** The ID of the API key to update. */
    apiKeyId: string;
    /** The user or Organization ID to associate the API key with. */
    subject: string;
    /** The description of the API key. */
    description?: string | null;
    /** Custom claims to store additional information about the API key. */
    claims?: Record<string, any> | null;
    /** Scopes to limit the API key's access to specific resources. */
    scopes?: string[];
    /** The number of seconds until the API key expires. Defaults to `null` (never expires). */
    secondsUntilExpiration?: number | null;
};
/** @generateWithEmptyComment */
export declare class APIKeysAPI extends AbstractAPI {
    /**
     * Gets a list of API keys for the given user or Organization. By default, the list is returned in descending order by creation date (newest first).
     * @returns A [`PaginatedResourceResponse`](https://clerk.com/docs/reference/backend/types/paginated-resource-response) object with a `data` property containing an array of [`APIKey`](https://clerk.com/docs/reference/backend/types/backend-api-key) objects and a `totalCount` property containing the total number of API keys for the user or Organization.
     */
    list(queryParams: GetAPIKeyListParams): Promise<PaginatedResourceResponse<APIKey[]>>;
    /**
     * Creates a new API key for the given user or Organization.
     * @returns The created [`APIKey`](https://clerk.com/docs/reference/backend/types/backend-api-key) object.
     */
    create(params: CreateAPIKeyParams): Promise<APIKey>;
    /**
     * Gets the given [`APIKey`](https://clerk.com/docs/reference/backend/types/backend-api-key) object.
     * @param apiKeyId - The ID of the API key to get.
     */
    get(apiKeyId: string): Promise<APIKey>;
    /**
     * Updates the given API key.
     * @returns The updated [`APIKey`](https://clerk.com/docs/reference/backend/types/backend-api-key) object.
     */
    update(params: UpdateAPIKeyParams): Promise<APIKey>;
    /**
     * Deletes the given API key.
     * @param apiKeyId - The ID of the API key to delete.
     * @returns The [`DeletedObject`](https://clerk.com/docs/reference/backend/types/deleted-object) object.
     */
    delete(apiKeyId: string): Promise<DeletedObject>;
    /**
     * Revokes the given API key. This will immediately invalidate the API key and prevent it from being used to authenticate any future requests.
     * @returns The revoked [`APIKey`](https://clerk.com/docs/reference/backend/types/backend-api-key) object.
     */
    revoke(params: RevokeAPIKeyParams): Promise<APIKey>;
    /**
     * Gets the secret of the given API key.
     * @param apiKeyId - The ID of the API key to get the secret of.
     */
    getSecret(apiKeyId: string): Promise<{
        secret: string;
    }>;
    /**
     * Verifies the given API key.
     * - If the API key is valid, the method returns the API key object with its properties.
     * - If the API key is invalid, revoked, or expired, the method will throw an error.
     * @param secret - The secret of the API key to verify.
     * @returns The verified [`APIKey`](https://clerk.com/docs/reference/backend/types/backend-api-key) object.
     */
    verify(secret: string): Promise<APIKey>;
}
//# sourceMappingURL=APIKeysApi.d.ts.map