import type { SignInTokenJSON } from './JSON';
/**
 * The Backend `SignInToken` object holds information about a sign-in token.
 */
export declare class SignInToken {
    /** The unique identifier for the token. */
    readonly id: string;
    /** The ID of the user the token is for. */
    readonly userId: string;
    /** The token itself. */
    readonly token: string;
    /** The status of the token. */
    readonly status: string;
    /** The URL the token is for. */
    readonly url: string;
    /** The Unix timestamp when the token was created. */
    readonly createdAt: number;
    /** The Unix timestamp when the token was last updated. */
    readonly updatedAt: number;
    constructor(
    /** The unique identifier for the token. */
    id: string, 
    /** The ID of the user the token is for. */
    userId: string, 
    /** The token itself. */
    token: string, 
    /** The status of the token. */
    status: string, 
    /** The URL the token is for. */
    url: string, 
    /** The Unix timestamp when the token was created. */
    createdAt: number, 
    /** The Unix timestamp when the token was last updated. */
    updatedAt: number);
    static fromJSON(data: SignInTokenJSON): SignInToken;
}
//# sourceMappingURL=SignInTokens.d.ts.map