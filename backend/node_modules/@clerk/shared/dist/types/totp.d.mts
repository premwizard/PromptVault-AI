import { ClerkResource } from "./resource.mjs";

//#region src/types/totp.d.ts
interface TOTPResource extends ClerkResource {
  id: string;
  secret?: string;
  uri?: string;
  verified: boolean;
  backupCodes?: string[];
  createdAt: Date | null;
  updatedAt: Date | null;
}
//#endregion
export { TOTPResource };