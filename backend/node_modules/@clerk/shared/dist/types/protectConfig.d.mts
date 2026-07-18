import { ClerkResource } from "./resource.mjs";
import { ProtectConfigJSONSnapshot } from "./snapshots.mjs";

//#region src/types/protectConfig.d.ts
interface ProtectLoader {
  rollout?: number;
  target: 'head' | 'body' | `#${string}`;
  type: string;
  attributes?: Record<string, string | number | boolean>;
  textContent?: string;
}
interface ProtectConfigJSON {
  object: 'protect_config';
  id: string;
  loaders?: ProtectLoader[];
}
interface ProtectConfigResource extends ClerkResource {
  id: string;
  loaders?: ProtectLoader[];
  __internal_toSnapshot: () => ProtectConfigJSONSnapshot;
}
//#endregion
export { ProtectConfigJSON, ProtectConfigResource, ProtectLoader };