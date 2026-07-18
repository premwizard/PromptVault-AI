import { ClerkResource } from "./resource.mjs";
import { IdentificationLinkJSONSnapshot } from "./snapshots.mjs";

//#region src/types/identificationLink.d.ts
interface IdentificationLinkResource extends ClerkResource {
  id: string;
  type: string;
  __internal_toSnapshot(): IdentificationLinkJSONSnapshot;
}
//#endregion
export { IdentificationLinkResource };