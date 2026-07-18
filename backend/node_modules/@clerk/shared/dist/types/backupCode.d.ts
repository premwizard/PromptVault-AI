import { ClerkResource } from "./resource.js";

//#region src/types/backupCode.d.ts
interface BackupCodeResource extends ClerkResource {
  id: string;
  codes: string[];
  createdAt: Date | null;
  updatedAt: Date | null;
}
//#endregion
export { BackupCodeResource };