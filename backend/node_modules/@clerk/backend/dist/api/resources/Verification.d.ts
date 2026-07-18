import type { VerificationStatus } from '@clerk/shared/types';
import type { OrganizationDomainVerificationJSON, VerificationJSON } from './JSON';
/**
 * The Backend `Verification` object describes the state of the verification process of a sign-in or sign-up attempt.
 */
export declare class Verification {
    /**
     * The state of the verification.
     *
     * <ul>
     *  <li>`unverified`: The verification has not been verified yet.</li>
     *  <li>`verified`: The verification has been verified.</li>
     *  <li>`transferable`: The verification is transferable to between sign-in and sign-up flows.</li>
     *  <li>`failed`: The verification has failed.</li>
     *  <li>`expired`: The verification has expired.</li>
     * </ul>
     */
    readonly status: VerificationStatus;
    /** The strategy pertaining to the parent sign-up or sign-in attempt. */
    readonly strategy: string;
    /** The redirect URL for an external verification. */
    readonly externalVerificationRedirectURL: URL | null;
    /** The number of attempts related to the verification. */
    readonly attempts: number | null;
    /** The Unix timestamp when the verification will expire. */
    readonly expireAt: number | null;
    /** The [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) pertaining to the verification. */
    readonly nonce: string | null;
    /** The message that will be presented to the user's Web3 wallet for signing during authentication. This follows the [Sign-In with Ethereum (SIWE) protocol format](https://docs.login.xyz/general-information/siwe-overview/eip-4361#example-message-to-be-signed), which typically includes details like the requesting service, wallet address, terms acceptance, nonce, timestamp, and any additional resources. */
    readonly message: string | null;
    constructor(
    /**
     * The state of the verification.
     *
     * <ul>
     *  <li>`unverified`: The verification has not been verified yet.</li>
     *  <li>`verified`: The verification has been verified.</li>
     *  <li>`transferable`: The verification is transferable to between sign-in and sign-up flows.</li>
     *  <li>`failed`: The verification has failed.</li>
     *  <li>`expired`: The verification has expired.</li>
     * </ul>
     */
    status: VerificationStatus, 
    /** The strategy pertaining to the parent sign-up or sign-in attempt. */
    strategy: string, 
    /** The redirect URL for an external verification. */
    externalVerificationRedirectURL?: URL | null, 
    /** The number of attempts related to the verification. */
    attempts?: number | null, 
    /** The Unix timestamp when the verification will expire. */
    expireAt?: number | null, 
    /** The [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) pertaining to the verification. */
    nonce?: string | null, 
    /** The message that will be presented to the user's Web3 wallet for signing during authentication. This follows the [Sign-In with Ethereum (SIWE) protocol format](https://docs.login.xyz/general-information/siwe-overview/eip-4361#example-message-to-be-signed), which typically includes details like the requesting service, wallet address, terms acceptance, nonce, timestamp, and any additional resources. */
    message?: string | null);
    static fromJSON(data: VerificationJSON): Verification;
}
/** @inline */
export declare class OrganizationDomainVerification {
    /** The current status of the verification. */
    readonly status: string;
    /** The strategy used to verify the domain. */
    readonly strategy: string;
    /** The number of verification attempts that have been made. */
    readonly attempts: number | null;
    /** The Unix timestamp when the current verification attempt expires. */
    readonly expireAt: number | null;
    constructor(
    /** The current status of the verification. */
    status: string, 
    /** The strategy used to verify the domain. */
    strategy: string, 
    /** The number of verification attempts that have been made. */
    attempts?: number | null, 
    /** The Unix timestamp when the current verification attempt expires. */
    expireAt?: number | null);
    static fromJSON(data: OrganizationDomainVerificationJSON): OrganizationDomainVerification;
}
//# sourceMappingURL=Verification.d.ts.map