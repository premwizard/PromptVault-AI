import { ClerkResource } from "./resource.mjs";
import { CommerceSettingsJSONSnapshot } from "./snapshots.mjs";
import { ClerkResourceJSON } from "./json.mjs";

//#region src/types/commerceSettings.d.ts
interface CommerceSettingsJSON extends ClerkResourceJSON {
  billing: {
    stripe_publishable_key: string | null;
    organization: {
      enabled: boolean;
      has_paid_plans: boolean;
    };
    user: {
      enabled: boolean;
      has_paid_plans: boolean;
    };
  };
}
interface CommerceSettingsResource extends ClerkResource {
  billing: {
    stripePublishableKey: string | null;
    organization: {
      enabled: boolean;
      hasPaidPlans: boolean;
    };
    user: {
      enabled: boolean;
      hasPaidPlans: boolean;
    };
  };
  __internal_toSnapshot: () => CommerceSettingsJSONSnapshot;
}
//#endregion
export { CommerceSettingsJSON, CommerceSettingsResource };