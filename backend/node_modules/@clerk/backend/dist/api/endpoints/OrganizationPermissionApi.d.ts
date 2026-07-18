import type { ClerkPaginationRequest } from '@clerk/shared/types';
import type { DeletedObject } from '../resources/DeletedObject';
import type { PaginatedResourceResponse } from '../resources/Deserializer';
import type { Permission } from '../resources/Permission';
import { AbstractAPI } from './AbstractApi';
import type { WithSign } from './util-types';
type GetOrganizationPermissionListParams = ClerkPaginationRequest<{
    /**
     * Returns organization permissions with ID, name, or key that match the given query.
     * Uses exact match for permission ID and partial match for name and key.
     */
    query?: string;
    /**
     * Allows to return organization permissions in a particular order.
     * At the moment, you can order the returned permissions by their `created_at`, `name`, or `key`.
     */
    orderBy?: WithSign<'created_at' | 'name' | 'key'>;
}>;
type CreateOrganizationPermissionParams = {
    /**
     * The name of the permission.
     */
    name: string;
    /**
     * The key of the permission. Must have the format `org:feature:action`, for example `org:billing:manage`.
     * Cannot begin with `org:sys_` as that prefix is reserved for system permissions.
     */
    key: string;
    /**
     * A description of the permission.
     */
    description?: string;
};
type UpdateOrganizationPermissionParams = {
    permissionId: string;
} & Partial<CreateOrganizationPermissionParams>;
export declare class OrganizationPermissionAPI extends AbstractAPI {
    getOrganizationPermissionList(params?: GetOrganizationPermissionListParams): Promise<PaginatedResourceResponse<Permission[]>>;
    getOrganizationPermission(permissionId: string): Promise<Permission>;
    createOrganizationPermission(params: CreateOrganizationPermissionParams): Promise<Permission>;
    updateOrganizationPermission(params: UpdateOrganizationPermissionParams): Promise<Permission>;
    deleteOrganizationPermission(permissionId: string): Promise<DeletedObject>;
}
export {};
//# sourceMappingURL=OrganizationPermissionApi.d.ts.map