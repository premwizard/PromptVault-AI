import type { M2MTokenJSON } from './JSON';
type M2MJwtPayload = {
    sub: string;
    exp: number;
    iat: number;
    jti?: string;
    aud?: string[];
    scopes?: string;
    [key: string]: unknown;
};
/**
 * The Backend `M2MToken` object holds information about a [machine-to-machine token](https://clerk.com/docs/guides/development/machine-auth/m2m-tokens).
 */
export declare class M2MToken {
    /** The ID of the M2M token. */
    readonly id: string;
    /** The subject of the M2M token. */
    readonly subject: string;
    /** The scopes of the M2M token. */
    readonly scopes: string[];
    /** The claims of the M2M token. */
    readonly claims: Record<string, any> | null;
    /** Whether the M2M token has been revoked. */
    readonly revoked: boolean;
    /** The reason for revoking the M2M token. */
    readonly revocationReason: string | null;
    /** Whether the M2M token has expired. */
    readonly expired: boolean;
    /** The Unix timestamp (in milliseconds) when the M2M token expires. */
    readonly expiration: number | null;
    /** The Unix timestamp (in milliseconds) when the M2M token was created. */
    readonly createdAt: number;
    /** The Unix timestamp (in milliseconds) when the M2M token was last updated. */
    readonly updatedAt: number;
    /** The token string. */
    readonly token?: string | undefined;
    constructor(
    /** The ID of the M2M token. */
    id: string, 
    /** The subject of the M2M token. */
    subject: string, 
    /** The scopes of the M2M token. */
    scopes: string[], 
    /** The claims of the M2M token. */
    claims: Record<string, any> | null, 
    /** Whether the M2M token has been revoked. */
    revoked: boolean, 
    /** The reason for revoking the M2M token. */
    revocationReason: string | null, 
    /** Whether the M2M token has expired. */
    expired: boolean, 
    /** The Unix timestamp (in milliseconds) when the M2M token expires. */
    expiration: number | null, 
    /** The Unix timestamp (in milliseconds) when the M2M token was created. */
    createdAt: number, 
    /** The Unix timestamp (in milliseconds) when the M2M token was last updated. */
    updatedAt: number, 
    /** The token string. */
    token?: string | undefined);
    static fromJSON(data: M2MTokenJSON): M2MToken;
    static fromJwtPayload(payload: M2MJwtPayload, clockSkewInMs?: number): M2MToken;
}
export {};
//# sourceMappingURL=M2MToken.d.ts.map