import type { IdentificationLinkJSON } from './JSON';
/**
 * The `IdentificationLink` object contains information about any identifications that might be linked to the identifier (email address, phone number, etc.).
 */
export declare class IdentificationLink {
    /** The unique identifier for the identification link. */
    readonly id: string;
    /** The type of the identification link, e.g., `"email_address"`, `"phone_number"`, etc. */
    readonly type: string;
    constructor(
    /** The unique identifier for the identification link. */
    id: string, 
    /** The type of the identification link, e.g., `"email_address"`, `"phone_number"`, etc. */
    type: string);
    static fromJSON(data: IdentificationLinkJSON): IdentificationLink;
}
//# sourceMappingURL=IdentificationLink.d.ts.map