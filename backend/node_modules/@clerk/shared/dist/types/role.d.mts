import { ClerkResource } from "./resource.mjs";
import { PermissionResource } from "./permission.mjs";

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