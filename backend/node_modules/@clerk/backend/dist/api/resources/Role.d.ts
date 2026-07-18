import type { RoleJSON } from './JSON';
import { Permission } from './Permission';
/**
 * The Backend `Role` object represents an Organization [Role](https://clerk.com/docs/guides/organizations/control-access/roles-and-permissions) that can be assigned to Organization members.
 */
export declare class Role {
    /** The unique identifier for the Role. */
    readonly id: string;
    /** The name of the Role. */
    readonly name: string;
    /** The unique key of the Role, in the format `org:role`. */
    readonly key: string;
    /** A description of the Role. */
    readonly description: string | null;
    /** The [Permissions](https://clerk.com/docs/guides/organizations/control-access/roles-and-permissions) assigned to the Role. */
    readonly permissions: Permission[];
    /** Whether this Role is eligible to be an Organization creator Role. */
    readonly isCreatorEligible: boolean;
    /** The Unix timestamp when the Role was first created. */
    readonly createdAt: number;
    /** The Unix timestamp when the Role was last updated. */
    readonly updatedAt: number;
    constructor(
    /** The unique identifier for the Role. */
    id: string, 
    /** The name of the Role. */
    name: string, 
    /** The unique key of the Role, in the format `org:role`. */
    key: string, 
    /** A description of the Role. */
    description: string | null, 
    /** The [Permissions](https://clerk.com/docs/guides/organizations/control-access/roles-and-permissions) assigned to the Role. */
    permissions: Permission[], 
    /** Whether this Role is eligible to be an Organization creator Role. */
    isCreatorEligible: boolean, 
    /** The Unix timestamp when the Role was first created. */
    createdAt: number, 
    /** The Unix timestamp when the Role was last updated. */
    updatedAt: number);
    static fromJSON(data: RoleJSON): Role;
}
//# sourceMappingURL=Role.d.ts.map