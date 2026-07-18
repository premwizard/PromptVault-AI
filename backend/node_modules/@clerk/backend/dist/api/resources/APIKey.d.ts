import type { APIKeyJSON } from './JSON';
/**
 * The Backend `APIKey` object holds information about an API key.
 */
export declare class APIKey {
    /** The unique identifier for the API key. */
    readonly id: string;
    /** The type of the API key. Currently always `'api_key'`. */
    readonly type: string;
    /** The API key's name. */
    readonly name: string;
    /** The user or organization ID that the API key is associated with. */
    readonly subject: string;
    /** An array of scopes that define what the API key can access. */
    readonly scopes: string[];
    /** Custom claims associated with the API key. */
    readonly claims: Record<string, any> | null;
    /** Whether the API key has been revoked. */
    readonly revoked: boolean;
    /** The reason for revoking the API key, if it has been revoked. */
    readonly revocationReason: string | null;
    /** Whether the API key has expired. */
    readonly expired: boolean;
    /** The Unix timestamp (in milliseconds) when the API key expires. `null` if the API key never expires. */
    readonly expiration: number | null;
    /** The user ID for the user creating the API key. */
    readonly createdBy: string | null;
    /** A description for the API key. */
    readonly description: string | null;
    /** The Unix timestamp (in milliseconds) when the API key was last used to authenticate a request. */
    readonly lastUsedAt: number | null;
    /** The Unix timestamp (in milliseconds) when the API key was created. */
    readonly createdAt: number;
    /** The Unix timestamp (in milliseconds) when the API key was last updated. */
    readonly updatedAt: number;
    /** The API key secret. */
    readonly secret?: string | undefined;
    constructor(
    /** The unique identifier for the API key. */
    id: string, 
    /** The type of the API key. Currently always `'api_key'`. */
    type: string, 
    /** The API key's name. */
    name: string, 
    /** The user or organization ID that the API key is associated with. */
    subject: string, 
    /** An array of scopes that define what the API key can access. */
    scopes: string[], 
    /** Custom claims associated with the API key. */
    claims: Record<string, any> | null, 
    /** Whether the API key has been revoked. */
    revoked: boolean, 
    /** The reason for revoking the API key, if it has been revoked. */
    revocationReason: string | null, 
    /** Whether the API key has expired. */
    expired: boolean, 
    /** The Unix timestamp (in milliseconds) when the API key expires. `null` if the API key never expires. */
    expiration: number | null, 
    /** The user ID for the user creating the API key. */
    createdBy: string | null, 
    /** A description for the API key. */
    description: string | null, 
    /** The Unix timestamp (in milliseconds) when the API key was last used to authenticate a request. */
    lastUsedAt: number | null, 
    /** The Unix timestamp (in milliseconds) when the API key was created. */
    createdAt: number, 
    /** The Unix timestamp (in milliseconds) when the API key was last updated. */
    updatedAt: number, 
    /** The API key secret. */
    secret?: string | undefined);
    static fromJSON(data: APIKeyJSON): APIKey;
}
//# sourceMappingURL=APIKey.d.ts.map