import type { TestingTokenJSON } from './JSON';
/** The Backend `TestingToken` object holds information about a [Testing Token](https://clerk.com/docs/guides/development/testing/overview#testing-tokens). */
export declare class TestingToken {
    /** The token string. */
    readonly token: string;
    /** The Unix timestamp when the token expires. */
    readonly expiresAt: number;
    constructor(
    /** The token string. */
    token: string, 
    /** The Unix timestamp when the token expires. */
    expiresAt: number);
    static fromJSON(data: TestingTokenJSON): TestingToken;
}
//# sourceMappingURL=TestingToken.d.ts.map