import { ClerkResource } from "./resource.mjs";

//#region src/types/permission.d.ts
interface PermissionResource extends ClerkResource {
  id: string;
  key: string;
  name: string;
  type: 'system' | 'user';
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
//#endregion
export { PermissionResource };