import type { JwtPayload } from '@clerk/shared/types';
import type { IdPOAuthAccessTokenJSON } from './JSON';
export declare class IdPOAuthAccessToken {
    readonly id: string;
    readonly clientId: string;
    readonly type: string;
    readonly subject: string;
    readonly scopes: string[];
    readonly revoked: boolean;
    readonly revocationReason: string | null;
    readonly expired: boolean;
    /** The Unix timestamp (in milliseconds) when the access token expires. */
    readonly expiration: number | null;
    /** The Unix timestamp (in milliseconds) when the access token was created. */
    readonly createdAt: number;
    /** The Unix timestamp (in milliseconds) when the access token was last updated. */
    readonly updatedAt: number;
    constructor(id: string, clientId: string, type: string, subject: string, scopes: string[], revoked: boolean, revocationReason: string | null, expired: boolean, 
    /** The Unix timestamp (in milliseconds) when the access token expires. */
    expiration: number | null, 
    /** The Unix timestamp (in milliseconds) when the access token was created. */
    createdAt: number, 
    /** The Unix timestamp (in milliseconds) when the access token was last updated. */
    updatedAt: number);
    static fromJSON(data: IdPOAuthAccessTokenJSON): IdPOAuthAccessToken;
    /**
     * Creates an IdPOAuthAccessToken from a JWT payload.
     * Maps standard JWT claims and OAuth-specific fields to token properties.
     */
    static fromJwtPayload(payload: JwtPayload, clockSkewInMs?: number): IdPOAuthAccessToken;
}
//# sourceMappingURL=IdPOAuthAccessToken.d.ts.map