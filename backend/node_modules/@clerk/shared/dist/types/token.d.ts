import { ClerkResource } from "./resource.js";
import { TokenJSONSnapshot } from "./snapshots.js";
import { JWT } from "./jwt.js";

//#region src/types/token.d.ts
interface TokenResource extends ClerkResource {
  jwt?: JWT;
  getRawString: () => string;
  __internal_toSnapshot: () => TokenJSONSnapshot;
}
//#endregion
export { TokenResource };