import type { DeletedObject, PhoneNumber } from '../resources';
import { AbstractAPI } from './AbstractApi';
/** @generateWithEmptyComment */
export type CreatePhoneNumberParams = {
    /** The ID of the user to create the phone number for. */
    userId: string;
    /** The phone number to assign to the specified user. Must be in [E.164 format](https://en.wikipedia.org/wiki/E.164). */
    phoneNumber: string;
    /** Whether the phone number should be verified. Defaults to `false`. */
    verified?: boolean;
    /** Whether the phone number should be the primary phone number. Defaults to `false`, unless it is the first phone number added to the user. */
    primary?: boolean;
    /** Whether the phone number should be reserved for [multi-factor authentication](https://clerk.com/docs/guides/configure/auth-strategies/sign-up-sign-in-options#multi-factor-authentication). The phone number must also be verified. If there are no other reserved [second factors](!second-factor-verification), the phone number will be set as the default second factor. Defaults to `false`. */
    reservedForSecondFactor?: boolean;
};
/** @inline */
export type UpdatePhoneNumberParams = {
    /** Whether the phone number should be verified. Defaults to `false`. */
    verified?: boolean;
    /** Whether the phone number should be the primary phone number. Defaults to `false`, unless it is the first phone number added to the user. */
    primary?: boolean;
    /** Whether the phone number should be reserved for [multi-factor authentication](https://clerk.com/docs/guides/configure/auth-strategies/sign-up-sign-in-options#multi-factor-authentication). The phone number must also be verified. If there are no other reserved [second factors](!second-factor-verification), the phone number will be set as the default second factor. Defaults to `false`. */
    reservedForSecondFactor?: boolean;
};
/** @generateWithEmptyComment */
export declare class PhoneNumberAPI extends AbstractAPI {
    /**
     * Gets the given [`PhoneNumber`](https://clerk.com/docs/reference/backend/types/backend-phone-number).
     * @param phoneNumberId - The ID of the phone number to get.
     */
    getPhoneNumber(phoneNumberId: string): Promise<PhoneNumber>;
    /**
     * Creates a new phone number for the given user.
     * @returns The created [`PhoneNumber`](https://clerk.com/docs/reference/backend/types/backend-phone-number) object.
     */
    createPhoneNumber(params: CreatePhoneNumberParams): Promise<PhoneNumber>;
    /**
     * Updates the given phone number.
     * @param phoneNumberId - The ID of the phone number to update.
     * @param params - The parameters to update the phone number.
     * @returns The updated [`PhoneNumber`](https://clerk.com/docs/reference/backend/types/backend-phone-number) object.
     */
    updatePhoneNumber(phoneNumberId: string, params?: UpdatePhoneNumberParams): Promise<PhoneNumber>;
    /**
     * Deletes the given phone number.
     * @param phoneNumberId - The ID of the phone number to delete.
     * @returns The [`DeletedObject`](https://clerk.com/docs/reference/backend/types/deleted-object) object.
     */
    deletePhoneNumber(phoneNumberId: string): Promise<DeletedObject>;
}
//# sourceMappingURL=PhoneNumberApi.d.ts.map