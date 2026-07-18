import type { PermissionJSON } from './JSON';
/**
 * The Backend `Permission` object represents an organization permission that can be assigned to organization roles.
 */
export declare class Permission {
    /** The unique identifier for the permission. */
    readonly id: string;
    /** The name of the permission. */
    readonly name: string;
    /** The unique key of the permission, in the format `org:feature:action`. */
    readonly key: string;
    /** A description of the permission. */
    readonly description: string;
    /** The Unix timestamp when the permission was first created. */
    readonly createdAt: number;
    /** The Unix timestamp when the permission was last updated. */
    readonly updatedAt: number;
    constructor(
    /** The unique identifier for the permission. */
    id: string, 
    /** The name of the permission. */
    name: string, 
    /** The unique key of the permission, in the format `org:feature:action`. */
    key: string, 
    /** A description of the permission. */
    description: string, 
    /** The Unix timestamp when the permission was first created. */
    createdAt: number, 
    /** The Unix timestamp when the permission was last updated. */
    updatedAt: number);
    static fromJSON(data: PermissionJSON): Permission;
}
//# sourceMappingURL=Permission.d.ts.map