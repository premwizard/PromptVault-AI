import type { DeletedObject, EmailAddress } from '../resources';
import { AbstractAPI } from './AbstractApi';
/** @generateWithEmptyComment */
export type CreateEmailAddressParams = {
    /** The ID of the user to create the email address for. */
    userId: string;
    /** The email address to create. */
    emailAddress: string;
    /** Whether the email address should be verified. Defaults to `false`. */
    verified?: boolean;
    /** Whether the email address should be the primary email address. Defaults to `false`, unless it is the first email address added to the user. */
    primary?: boolean;
};
/** @inline */
export type UpdateEmailAddressParams = {
    /** Whether the email address should be verified. Defaults to `false`. */
    verified?: boolean;
    /** Whether the email address should be the primary email address. Defaults to `false`, unless it is the first email address added to the user. */
    primary?: boolean;
};
/** @generateWithEmptyComment */
export declare class EmailAddressAPI extends AbstractAPI {
    /**
     * Gets the given [`EmailAddress`](https://clerk.com/docs/reference/backend/types/backend-email-address).
     * @param emailAddressId - The ID of the email address to get.
     */
    getEmailAddress(emailAddressId: string): Promise<EmailAddress>;
    /**
     * Creates a new email address for the given user.
     * @returns The created [`EmailAddress`](https://clerk.com/docs/reference/backend/types/backend-email-address) object.
     */
    createEmailAddress(params: CreateEmailAddressParams): Promise<EmailAddress>;
    /**
     * Updates the given email address.
     * @param emailAddressId - The ID of the email address to update.
     * @param params - The parameters to update the email address.
     * @returns The updated [`EmailAddress`](https://clerk.com/docs/reference/backend/types/backend-email-address) object.
     */
    updateEmailAddress(emailAddressId: string, params?: UpdateEmailAddressParams): Promise<EmailAddress>;
    /**
     * Deletes the given email address.
     * @param emailAddressId - The ID of the email address to delete.
     * @returns The [`DeletedObject`](https://clerk.com/docs/reference/backend/types/deleted-object) object.
     */
    deleteEmailAddress(emailAddressId: string): Promise<DeletedObject>;
}
//# sourceMappingURL=EmailAddressApi.d.ts.map