import { ClerkResource } from "./resource.js";
import { IdentificationLinkJSONSnapshot } from "./snapshots.js";

//#region src/types/identificationLink.d.ts
interface IdentificationLinkResource extends ClerkResource {
  id: string;
  type: string;
  __internal_toSnapshot(): IdentificationLinkJSONSnapshot;
}
//#endregion
export { IdentificationLinkResource };