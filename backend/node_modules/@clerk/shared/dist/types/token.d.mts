import { ClerkResource } from "./resource.mjs";
import { TokenJSONSnapshot } from "./snapshots.mjs";
import { JWT } from "./jwt.mjs";

//#region src/types/token.d.ts
interface TokenResource extends ClerkResource {
  jwt?: JWT;
  getRawString: () => string;
  __internal_toSnapshot: () => TokenJSONSnapshot;
}
//#endregion
export { TokenResource };