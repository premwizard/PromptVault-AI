import type { ClerkPaginationRequest } from '@clerk/shared/types';
import type { DeletedObject } from '../resources/DeletedObject';
import type { PaginatedResourceResponse } from '../resources/Deserializer';
import type { Role } from '../resources/Role';
import { AbstractAPI } from './AbstractApi';
import type { WithSign } from './util-types';
type GetOrganizationRoleListParams = ClerkPaginationRequest<{
    /**
     * Returns organization roles with ID, name, or key that match the given query.
     * Uses exact match for organization role ID and partial match for name and key.
     */
    query?: string;
    /**
     * Allows to return organization roles in a particular order.
     * At the moment, you can order the returned organization roles by their `created_at`, `name`, or `key`.
     */
    orderBy?: WithSign<'created_at' | 'name' | 'key'>;
}>;
type CreateOrganizationRoleParams = {
    /**
     * The name of the new organization role.
     */
    name: string;
    /**
     * A unique key for the organization role. Must start with `org:` and contain only lowercase
     * alphanumeric characters and underscores.
     */
    key: string;
    /**
     * Optional description for the role.
     */
    description?: string | null;
    /**
     * Array of permission IDs to assign to the role.
     */
    permissions?: string[] | null;
    /**
     * Whether this role should be included in the initial role set.
     */
    includeInInitialRoleSet?: boolean | null;
};
type UpdateOrganizationRoleParams = {
    organizationRoleId: string;
    /**
     * The new name for the organization role.
     */
    name?: string | null;
    /**
     * A unique key for the organization role. Must start with `org:` and contain only lowercase
     * alphanumeric characters and underscores.
     */
    key?: string | null;
    /**
     * Optional description for the role.
     */
    description?: string | null;
    /**
     * Array of permission IDs to assign to the role. If provided, this will replace the existing permissions.
     */
    permissions?: string[] | null;
};
type OrganizationRolePermissionParams = {
    organizationRoleId: string;
    permissionId: string;
};
export declare class OrganizationRoleAPI extends AbstractAPI {
    getOrganizationRoleList(params?: GetOrganizationRoleListParams): Promise<PaginatedResourceResponse<Role[]>>;
    getOrganizationRole(organizationRoleId: string): Promise<Role>;
    createOrganizationRole(params: CreateOrganizationRoleParams): Promise<Role>;
    updateOrganizationRole(params: UpdateOrganizationRoleParams): Promise<Role>;
    deleteOrganizationRole(organizationRoleId: string): Promise<DeletedObject>;
    assignPermissionToOrganizationRole(params: OrganizationRolePermissionParams): Promise<Role>;
    removePermissionFromOrganizationRole(params: OrganizationRolePermissionParams): Promise<Role>;
}
export {};
//# sourceMappingURL=OrganizationRoleApi.d.ts.map