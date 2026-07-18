import { ClerkResource } from "./resource.js";
import { PermissionResource } from "./permission.js";

//#region src/types/role.d.ts
interface RoleResource extends ClerkResource {
  id: string;
  key: string;
  name: string;
  description: string;
  permissions: PermissionResource[];
  createdAt: Date;
  updatedAt: Date;
}
//#endregion
export { RoleResource };