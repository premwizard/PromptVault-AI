import type { ClerkPaginationRequest, OrganizationEnrollmentMode } from '@clerk/shared/types';
import type { Organization, OrganizationDomain, OrganizationInvitation, OrganizationInvitationStatus, OrganizationMembership } from '../resources';
import type { PaginatedResourceResponse } from '../resources/Deserializer';
import type { OrganizationMembershipRole } from '../resources/Enums';
import { AbstractAPI } from './AbstractApi';
import type { WithSign } from './util-types';
/** @inline */
export type MetadataParams<TPublic = OrganizationPublicMetadata, TPrivate = OrganizationPrivateMetadata> = {
    /** Metadata that can be read from the Frontend API and [Backend API](https://clerk.com/docs/reference/backend-api){{ target: '_blank' }}, but can be set only from the Backend API. */
    publicMetadata?: TPublic;
    /** Metadata that can be read and set only from the [Backend API](https://clerk.com/docs/reference/backend-api){{ target: '_blank' }}. */
    privateMetadata?: TPrivate;
};
/** @generateWithEmptyComment */
export type GetOrganizationListParams = ClerkPaginationRequest<{
    /** Whether to include the number of members in the Organization. */
    includeMembersCount?: boolean;
    /** Filters Organizations by ID, name, or slug. Uses exact match for ID and partial match for name and slug. */
    query?: string;
    /** Filters Organizations in a particular order. Prefix a value with `+` to sort in ascending order, or `-` to sort in descending order. Defaults to `-created_at`. */
    orderBy?: WithSign<'name' | 'created_at' | 'members_count'>;
    /** Filters Organizations by ID. Accepts up to 100 Organization IDs. */
    organizationId?: string[];
}>;
/** @generateWithEmptyComment */
export type CreateParams = {
    /** The name of the Organization. */
    name: string;
    /** The slug of the Organization. */
    slug?: string;
    /** The ID of the user creating the Organization. The user will become an [admin](https://clerk.com/docs/guides/organizations/control-access/roles-and-permissions#default-roles) for the Organization. */
    createdBy?: string;
    /** The maximum number of memberships allowed in the Organization. `0` means unlimited. */
    maxAllowedMemberships?: number;
} & MetadataParams;
/** @generateWithEmptyComment */
export type GetOrganizationParams = ({
    /** The ID of the Organization to get. */
    organizationId: string;
} | {
    /** The slug of the Organization to get. */
    slug: string;
}) & {
    /** Whether to include the number of members in the Organization. */
    includeMembersCount?: boolean;
};
/** @inline */
export type UpdateParams = {
    /** The name to update the Organization with. */
    name?: string;
    /** The slug to update the Organization with. */
    slug?: string;
    /** Whether the Organization allows admins to delete users. */
    adminDeleteEnabled?: boolean;
    /** The maximum number of memberships allowed in the Organization. `0` means unlimited. */
    maxAllowedMemberships?: number;
    /**
     * @deprecated Updating metadata via [`updateOrganization()`](https://clerk.com/docs/reference/backend/organization/update-organization) is deprecated. Use [`updateOrganizationMetadata()`](https://clerk.com/docs/reference/backend/organization/update-organization-metadata) for partial updates (deep merge) or [`replaceOrganizationMetadata()`](https://clerk.com/docs/reference/backend/organization/replace-organization-metadata) for full replacement.
     */
    publicMetadata?: OrganizationPublicMetadata;
    /**
     * @deprecated Updating metadata via [`updateOrganization()`](https://clerk.com/docs/reference/backend/organization/update-organization) is deprecated. Use [`updateOrganizationMetadata()`](https://clerk.com/docs/reference/backend/organization/update-organization-metadata) for partial updates (deep merge) or [`replaceOrganizationMetadata()`](https://clerk.com/docs/reference/backend/organization/replace-organization-metadata) for full replacement.
     */
    privateMetadata?: OrganizationPrivateMetadata;
};
/** @inline */
export type UpdateLogoParams = {
    /** The file to upload as the logo. */
    file: Blob | File;
    /** The ID of the user uploading the logo. */
    uploaderUserId?: string;
};
/** @inline */
export type UpdateMetadataParams = MetadataParams;
/** @generateWithEmptyComment */
export type GetOrganizationMembershipListParams = ClerkPaginationRequest<{
    /** The ID of the Organization to get the list of memberships for. */
    organizationId: string;
    /**
     * Filters Organization memberships in a particular order. Prefix a value with `+` to sort in ascending order, or `-` to sort in descending order. Defaults to `-created_at`.
     */
    orderBy?: WithSign<'phone_number' | 'email_address' | 'created_at' | 'first_name' | 'last_name' | 'username'>;
    /**
     * Filters Organization memberships by user ID. Accepts up to 100 user IDs.
     */
    userId?: string[];
    /** Filters Organization memberships by email address. Accepts up to 100 email addresses. */
    emailAddress?: string[];
    /** Filters Organization memberships by phone number. Accepts up to 100 phone numbers. */
    phoneNumber?: string[];
    /** Filters Organization memberships by username. Accepts up to 100 usernames. */
    username?: string[];
    /** Filters Organization memberships by web3 wallet address. Accepts up to 100 web3 wallet addresses. */
    web3Wallet?: string[];
    /** Filters Organization memberships by Role. Accepts up to 100 Roles. */
    role?: OrganizationMembershipRole[];
    /**
     * Filters Organization memberships matching the given query across email addresses, phone numbers, usernames, Web3 wallet addresses, user IDs, first names, and last names. Partial matches supported. For example, `query=hello` will match a user with the email `HELLO@example.com`.
     */
    query?: string;
    /**
     * Filters Organization memberships by email address. Accepts up to 100 email addresses. Partial matches supported. For example, `emailAddressQuery=ello` will match a user with the email `HELLO@example.com`.
     */
    emailAddressQuery?: string;
    /**
     * Filters Organization memberships by phone number. Accepts up to 100 phone numbers. Partial matches supported. For example, `phoneNumberQuery=555` will match a user with the phone number `+1555xxxxxxx`.
     */
    phoneNumberQuery?: string;
    /**
     * Filters Organization memberships by username. Accepts up to 100 usernames. Partial matches supported. For example, `usernameQuery=CoolUser` will match a user with the username `SomeCoolUser`.
     */
    usernameQuery?: string;
    /** Filters Organization memberships by name. Accepts up to 100 names. Partial matches supported. For example, `nameQuery=John Doe` will match a user with the name `John Doe`. */
    nameQuery?: string;
    /**
     * Filters Organization memberships by last session activity before the given date (with millisecond precision). For example, use `1700690400000` to get users whose last session activity was before 2023-11-23.
     */
    lastActiveAtBefore?: number;
    /**
     * Filters Organization memberships by last session activity after the given date (with millisecond precision). For example, use `1700690400000` to get users whose last session activity was after 2023-11-23.
     */
    lastActiveAtAfter?: number;
    /**
     * Filters Organization memberships by creation date before the given date (with millisecond precision). For example, use `1730160000000` to get users who have been created before 2024-10-29.
     */
    createdAtBefore?: number;
    /**
     * Filters Organization memberships by creation date after the given date (with millisecond precision). For example, use `1730160000000` to get users who have been created after 2024-10-29.
     */
    createdAtAfter?: number;
}>;
/** @generateWithEmptyComment */
export type GetInstanceOrganizationMembershipListParams = ClerkPaginationRequest<{
    /**
     * Filters Organization memberships in a particular order. Prefix a value with `+` to sort in ascending order, or `-` to sort in descending order. Defaults to `-created_at`.
     */
    orderBy?: WithSign<'phone_number' | 'email_address' | 'created_at' | 'first_name' | 'last_name' | 'username'>;
}>;
/** @generateWithEmptyComment */
export type CreateOrganizationMembershipParams = {
    /** The ID of the Organization the user is being added to. */
    organizationId: string;
    /** The ID of the user to be added to the Organization. */
    userId: string;
    /** The [Role](https://clerk.com/docs/guides/organizations/control-access/roles-and-permissions) to assign to the user. */
    role: OrganizationMembershipRole;
};
/** @generateWithEmptyComment */
export type UpdateOrganizationMembershipParams = CreateOrganizationMembershipParams;
/** @generateWithEmptyComment */
export type UpdateOrganizationMembershipMetadataParams = {
    /** The ID of the Organization the membership belongs to. */
    organizationId: string;
    /** The ID of the user the membership belongs to. */
    userId: string;
} & MetadataParams<OrganizationMembershipPublicMetadata>;
/** @generateWithEmptyComment */
export type DeleteOrganizationMembershipParams = {
    /** The ID of the Organization to remove the user from. */
    organizationId: string;
    /** The ID of the user to remove from the Organization. */
    userId: string;
};
/** @generateWithEmptyComment */
export type CreateOrganizationInvitationParams = {
    /** The ID of the Organization the user is being invited to. */
    organizationId: string;
    /** The email address of the user being invited. */
    emailAddress: string;
    /** The [Role](https://clerk.com/docs/guides/organizations/control-access/roles-and-permissions) to assign to the user. */
    role: OrganizationMembershipRole;
    /** The number of days until the invitation expires. Defaults to `30`. */
    expiresInDays?: number;
    /** The ID of the user creating the invitation. */
    inviterUserId?: string;
    /** Metadata that can be read and set only from the [Backend API](https://clerk.com/docs/reference/backend-api){{ target: '_blank' }}. */
    privateMetadata?: OrganizationInvitationPrivateMetadata;
    /** Metadata that can be read from the Frontend API and [Backend API](https://clerk.com/docs/reference/backend-api){{ target: '_blank' }}, but can be set only from the Backend API. */
    publicMetadata?: OrganizationInvitationPublicMetadata;
    /** The full URL or path where the user will land after accepting the invitation. */
    redirectUrl?: string;
};
/** @inline */
export type CreateBulkOrganizationInvitationParams = Array<Omit<CreateOrganizationInvitationParams, 'organizationId'>>;
/** @generateWithEmptyComment */
export type GetOrganizationInvitationListParams = ClerkPaginationRequest<{
    /** The ID of the Organization to get the list of invitations for. */
    organizationId: string;
    /** Filters Organization invitations by status. Accepts up to 100 statuses. */
    status?: OrganizationInvitationStatus[];
}>;
/** @generateWithEmptyComment */
export type GetOrganizationInvitationParams = {
    /** The ID of the Organization to get the invitation for. */
    organizationId: string;
    /** The ID of the Organization invitation to get. */
    invitationId: string;
};
/** @generateWithEmptyComment */
export type RevokeOrganizationInvitationParams = {
    /** The ID of the Organization to revoke the invitation from. */
    organizationId: string;
    /** The ID of the Organization invitation to revoke. */
    invitationId: string;
    /** The ID of the user revoking the invitation. */
    requestingUserId?: string;
};
/** @generateWithEmptyComment */
export type GetOrganizationDomainListParams = {
    /** The ID of the Organization to get the list of domains for. */
    organizationId: string;
    /** Maximum number of items returned per request. Must be an integer greater than zero and less than `501`. Can be used for paginating the results together with offset. Defaults to `10`. */
    limit?: number;
    /** Skip the first `offset` items when paginating. Needs to be an integer greater or equal to zero. To be used in conjunction with `limit`. Defaults to `0`. */
    offset?: number;
};
/** @generateWithEmptyComment */
export type CreateOrganizationDomainParams = {
    /** The ID of the Organization to create the domain for. */
    organizationId: string;
    /** The name of the domain. */
    name: string;
    /** The enrollment mode that determines how matching users are added to the Organization.
     *
     * <ul>
     *  <li>`manual_invitation`: No automatic enrollment. Users with a matching email domain are not given any [invitation](https://clerk.com/docs/guides/organizations/add-members/verified-domains#automatic-invitations) or [suggestion](https://clerk.com/docs/guides/organizations/add-members/verified-domains#automatic-suggestions); an [admin](https://clerk.com/docs/guides/organizations/control-access/roles-and-permissions#default-roles) must invite them manually.</li>
     *  <li>`automatic_invitation`: Users with a matching email domain automatically receive a pending [invitation](https://clerk.com/docs/reference/types/organization-invitation) (assigned the Organization's default role) which they can accept to join.</li>
     *  <li>`automatic_suggestion`: Users with a matching email domain automatically receive a [suggestion](https://clerk.com/docs/guides/organizations/add-members/verified-domains#automatic-suggestions) to join, which they can request.</li>
     * </ul>
     */
    enrollmentMode: OrganizationEnrollmentMode;
    /** Whether the domain is verified. Defaults to `true`. */
    verified?: boolean;
};
/** @generateWithEmptyComment */
export type UpdateOrganizationDomainParams = {
    /** The ID of the Organization to update the domain for. */
    organizationId: string;
    /** The ID of the domain to update. */
    domainId: string;
} & Partial<CreateOrganizationDomainParams>;
/** @generateWithEmptyComment */
export type DeleteOrganizationDomainParams = {
    /** The ID of the Organization to delete the domain for. */
    organizationId: string;
    /** The ID of the domain to delete. */
    domainId: string;
};
/** @generateWithEmptyComment */
export declare class OrganizationAPI extends AbstractAPI {
    /**
     * Gets the list of Organizations for the instance. By default, the list is returned in descending order by creation date (newest first).
     * @returns A [`PaginatedResourceResponse`](https://clerk.com/docs/reference/backend/types/paginated-resource-response) object with a `data` property containing an array of [`Organization`](https://clerk.com/docs/reference/backend/types/backend-organization) objects and a `totalCount` property containing the total number of Organizations for the instance.
     */
    getOrganizationList(params?: GetOrganizationListParams): Promise<PaginatedResourceResponse<Organization[]>>;
    /** Creates an [`Organization`](https://clerk.com/docs/reference/backend/types/backend-organization). */
    createOrganization(params: CreateParams): Promise<Organization>;
    /** Gets an [Organization](https://clerk.com/docs/reference/backend/types/backend-organization). */
    getOrganization(params: GetOrganizationParams): Promise<Organization>;
    /**
     * Updates an [Organization](https://clerk.com/docs/reference/backend/types/backend-organization).
     * @param organizationId - The ID of the Organization to update.
     * @param params - The parameters to update the Organization with.
     * @returns The updated [Organization](https://clerk.com/docs/reference/backend/types/backend-organization).
     */
    updateOrganization(organizationId: string, params: UpdateParams): Promise<Organization>;
    /**
     * Updates the logo of the given Organization.
     * @param organizationId - The ID of the Organization to update the logo for.
     * @param params - The parameters to update the logo with.
     * @returns The updated [`Organization`](https://clerk.com/docs/reference/backend/types/backend-organization).
     */
    updateOrganizationLogo(organizationId: string, params: UpdateLogoParams): Promise<Organization>;
    /**
     * Deletes the logo of the given Organization.
     * @param organizationId - The ID of the Organization to delete the logo for.
     * @returns The deleted [`Organization`](https://clerk.com/docs/reference/backend/types/backend-organization).
     */
    deleteOrganizationLogo(organizationId: string): Promise<Organization>;
    /**
     * Updates the metadata for the given Organization, by merging existing values with the provided parameters.
     *
     * A "deep" merge will be performed - "deep" means that any nested JSON objects will be merged as well. You can remove metadata keys at any level by setting their value to `null`.
     *
     * @param organizationId - The ID of the Organization to update the metadata for.
     * @param params - The parameters to update the metadata with.
     * @returns The updated [`Organization`](https://clerk.com/docs/reference/backend/types/backend-organization).
     *
     * > [!TIP]
     * > If you want to fully replace the existing metadata instead of merging, use [`replaceOrganizationMetadata()`](https://clerk.com/docs/reference/backend/organization/replace-organization-metadata).
     */
    updateOrganizationMetadata(organizationId: string, params: UpdateMetadataParams): Promise<Organization>;
    /**
     * Replaces the metadata associated with the specified Organization. Unlike [`updateOrganizationMetadata()`](/docs/reference/backend/organization/update-organization-metadata), which deep-merges into the existing metadata, this method uses replace semantics: when a metadata field is provided, its previous value is overwritten in full with no merging at any level.
     *
     * The distinction is at two layers:
     * - **Top-level field omission preserves the existing value.** Each top-level field (`publicMetadata`, `privateMetadata`) is handled independently. If you don't include a field in the request, the stored value for that field is left untouched.
     * - **The value inside a provided field is replaced in full.** When you do include a field, its previous content is discarded — any nested keys present before but absent in the new value are dropped. There is no merge.
     *
     * For the provided field, you can also send:
     * - `{}` (empty object) to clear the field.
     * - `null` to overwrite the field with a JSON `null` value. Prefer `{}` unless you specifically need a stored `null`.
     * @param organizationId - The ID of the Organization to replace the metadata for.
     * @param params - The metadata to replace.
     * @returns The updated [`Organization`](https://clerk.com/docs/reference/backend/types/backend-organization).
     */
    replaceOrganizationMetadata(organizationId: string, params: MetadataParams): Promise<Organization>;
    /**
     * Deletes the given Organization.
     * @param organizationId - The ID of the Organization to delete.
     * @returns The deleted [`Organization`](https://clerk.com/docs/reference/backend/types/backend-organization).
     */
    deleteOrganization(organizationId: string): Promise<Organization>;
    /**
     * Gets the list of Organization memberships for the specified Organization. By default, the list is returned in descending order by creation date (newest first).
     *
     * @returns A [`PaginatedResourceResponse`](https://clerk.com/docs/reference/backend/types/paginated-resource-response) object with a `data` property containing an array of [`OrganizationMembership`](https://clerk.com/docs/reference/backend/types/backend-organization-membership) objects and a `totalCount` property containing the total number of Organization memberships for the Organization.
     *
     * > [!TIP]
     * > To get the list of Organization memberships **for your instance**, use [`getInstanceOrganizationMembershipList()`](/docs/reference/backend/organization/get-instance-organization-membership-list).
     */
    getOrganizationMembershipList(params: GetOrganizationMembershipListParams): Promise<PaginatedResourceResponse<OrganizationMembership[]>>;
    /**
     * Gets the list of Organization memberships for the instance. By default, the list is returned in descending order by creation date (newest first).
     *
     * @returns A [`PaginatedResourceResponse`](https://clerk.com/docs/reference/backend/types/paginated-resource-response) object with a `data` property containing an array of [`OrganizationMembership`](https://clerk.com/docs/reference/backend/types/backend-organization-membership) objects and a `totalCount` property containing the total number of Organization memberships for the instance.
     *
     * > [!TIP]
     * > To get the list of Organization memberships **for a specific Organization**, use [`getOrganizationMembershipList()`](/docs/reference/backend/organization/get-organization-membership-list).
     */
    getInstanceOrganizationMembershipList(params: GetInstanceOrganizationMembershipListParams): Promise<PaginatedResourceResponse<OrganizationMembership[]>>;
    /**
     * Creates a membership to an Organization for a user directly (circumventing the need for an invitation).
     * @returns The newly created [`OrganizationMembership`](https://clerk.com/docs/reference/backend/types/backend-organization-membership) object.
     */
    createOrganizationMembership(params: CreateOrganizationMembershipParams): Promise<OrganizationMembership>;
    /**
     * Updates a user's [`OrganizationMembership`](https://clerk.com/docs/reference/backend/types/backend-organization-membership).
     * @returns The updated [`OrganizationMembership`](https://clerk.com/docs/reference/backend/types/backend-organization-membership) object.
     */
    updateOrganizationMembership(params: UpdateOrganizationMembershipParams): Promise<OrganizationMembership>;
    /**
     * Updates the metadata for the given Organization membership, by merging existing values with the provided parameters.
     *
     * A "deep" merge will be performed - "deep" means that any nested JSON objects will be merged as well. You can remove metadata keys at any level by setting their value to `null`.
     *
     * @returns The updated [`OrganizationMembership`](https://clerk.com/docs/reference/backend/types/backend-organization-membership).
     */
    updateOrganizationMembershipMetadata(params: UpdateOrganizationMembershipMetadataParams): Promise<OrganizationMembership>;
    /**
     * Removes a user from the given Organization.
     * @param organizationId - The ID of the Organization to remove the user from.
     * @param userId - The ID of the user to remove from the Organization.
     * @returns The deleted [`OrganizationMembership`](https://clerk.com/docs/reference/backend/types/backend-organization-membership).
     */
    deleteOrganizationMembership(params: DeleteOrganizationMembershipParams): Promise<OrganizationMembership>;
    /**
     * Gets the list of Organization invitations for the specified Organization.
     * @returns A [`PaginatedResourceResponse`](https://clerk.com/docs/reference/backend/types/paginated-resource-response) object with a `data` property containing an array of [`OrganizationInvitation`](https://clerk.com/docs/reference/backend/types/backend-organization-invitation) objects and a `totalCount` property containing the total number of Organization invitations for the Organization.
     */
    getOrganizationInvitationList(params: GetOrganizationInvitationListParams): Promise<PaginatedResourceResponse<OrganizationInvitation[]>>;
    /**
     * Creates an invitation for a user to join an Organization.
     * @returns The newly created [`OrganizationInvitation`](https://clerk.com/docs/reference/backend/types/backend-organization-invitation) object.
     */
    createOrganizationInvitation(params: CreateOrganizationInvitationParams): Promise<OrganizationInvitation>;
    /** Creates multiple invitations for users to join an Organization.
     * @param organizationId - The ID of the Organization to create the invitations for.
     * @param params - The parameters to create the invitations with.
     * @returns A [`PaginatedResourceResponse`](https://clerk.com/docs/reference/backend/types/paginated-resource-response) object with a `data` property containing an array of [`OrganizationInvitation`](https://clerk.com/docs/reference/backend/types/backend-organization-invitation) objects and a `totalCount` property containing the total number of Organization invitations.
     */
    createOrganizationInvitationBulk(organizationId: string, params: CreateBulkOrganizationInvitationParams): Promise<PaginatedResourceResponse<OrganizationInvitation[]>>;
    /** Gets an [`OrganizationInvitation`](https://clerk.com/docs/reference/backend/types/backend-organization-invitation). */
    getOrganizationInvitation(params: GetOrganizationInvitationParams): Promise<OrganizationInvitation>;
    /**
     * Revokes an invitation from a user for the given Organization.
     * @returns The revoked [`OrganizationInvitation`](https://clerk.com/docs/reference/backend/types/backend-organization-invitation).
     */
    revokeOrganizationInvitation(params: RevokeOrganizationInvitationParams): Promise<OrganizationInvitation>;
    /**
     * Gets the list of [Verified Domains](https://clerk.com/docs/guides/organizations/add-members/verified-domains) for the given Organization. By default, the list is returned in descending order by creation date (newest first).
     * @returns A [`PaginatedResourceResponse`](https://clerk.com/docs/reference/backend/types/paginated-resource-response) object with a `data` property containing an array of [`OrganizationDomain`](https://clerk.com/docs/reference/backend/types/backend-organization-domain) objects and a `totalCount` property containing the total number of Verified Domains for the Organization.
     */
    getOrganizationDomainList(params: GetOrganizationDomainListParams): Promise<PaginatedResourceResponse<OrganizationDomain[]>>;
    /**
     * Creates a new [Verified Domain](https://clerk.com/docs/guides/organizations/add-members/verified-domains) for the given Organization. By default, the domain is verified, but can be optionally set to unverified.
     * @returns The newly created [`OrganizationDomain`](https://clerk.com/docs/reference/backend/types/backend-organization-domain) object.
     */
    createOrganizationDomain(params: CreateOrganizationDomainParams): Promise<OrganizationDomain>;
    /**
     * Updates a [Verified Domain](https://clerk.com/docs/guides/organizations/add-members/verified-domains) for the given Organization.
     * @returns The updated [`OrganizationDomain`](https://clerk.com/docs/reference/backend/types/backend-organization-domain) object.
     */
    updateOrganizationDomain(params: UpdateOrganizationDomainParams): Promise<OrganizationDomain>;
    /**
     * Deletes a [Verified Domain](https://clerk.com/docs/guides/organizations/add-members/verified-domains) for the given Organization.
     * @returns The deleted [`OrganizationDomain`](https://clerk.com/docs/reference/backend/types/backend-organization-domain) object.
     */
    deleteOrganizationDomain(params: DeleteOrganizationDomainParams): Promise<OrganizationDomain>;
}
//# sourceMappingURL=OrganizationApi.d.ts.map