import { Autocomplete } from "./types/utils.js";
import { UserResource } from "./types/user.js";
import { SignedInSessionResource } from "./types/session.js";
import { OrganizationResource } from "./types/organization.js";
import { OrganizationSystemPermissionKey } from "./types/organizationMembership.js";
import { ActClaim, JwtPayload } from "./types/jwtv2.js";
import { Resources } from "./types/clerk.js";
import { InitialState } from "./types/ssr.js";
//#region src/deriveState.d.ts
type DeriveStateReturnType = ReturnType<typeof deriveFromSsrInitialState>;
/**
 * Derives authentication state based on the current rendering context (SSR or client-side).
 */
declare const deriveState: (clerkOperational: boolean, state: Resources, initialState: InitialState | undefined) => DeriveStateReturnType;
declare const deriveFromSsrInitialState: (initialState: InitialState) => ReturnType<typeof deriveFromClientSideState>;
declare const deriveFromClientSideState: (state: Resources) => {
  userId: string | null | undefined;
  user: UserResource | null | undefined;
  sessionId: string | null | undefined;
  session: SignedInSessionResource | null | undefined;
  sessionStatus: "active" | "pending" | undefined;
  sessionClaims: JwtPayload | null | undefined;
  organization: OrganizationResource | null | undefined;
  orgId: string | null | undefined;
  orgRole: string | null | undefined;
  orgSlug: string | null | undefined;
  orgPermissions: Autocomplete<OrganizationSystemPermissionKey>[] | null | undefined;
  actor: ActClaim | null | undefined;
  factorVerificationAge: [number, number] | null;
};
//#endregion
export { DeriveStateReturnType, deriveFromClientSideState, deriveFromSsrInitialState, deriveState };