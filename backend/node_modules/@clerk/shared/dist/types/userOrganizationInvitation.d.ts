import { ClerkResource } from "./resource.js";
import { OrganizationInvitationStatus } from "./organizationInvitation.js";
import { OrganizationCustomRoleKey } from "./organizationMembership.js";

//#region src/types/userOrganizationInvitation.d.ts
declare global {
  /**
   * If you want to provide custom types for the organizationInvitation.publicMetadata
   * object, simply redeclare this rule in the global namespace.
   * Every organizationInvitation object will use the provided type.
   */
  interface UserOrganizationInvitationPublicMetadata {
    [k: string]: unknown;
  }
  interface UserOrganizationInvitationPrivateMetadata {
    [k: string]: unknown;
  }
}
/**
 * The `OrganizationInvitation` object is the model around an organization invitation.
 *
 * @interface
 */
interface UserOrganizationInvitationResource extends ClerkResource {
  id: string;
  emailAddress: string;
  publicOrganizationData: {
    hasImage: boolean;
    imageUrl: string;
    name: string;
    id: string;
    slug: string | null;
  };
  publicMetadata: UserOrganizationInvitationPublicMetadata;
  role: OrganizationCustomRoleKey;
  status: OrganizationInvitationStatus;
  createdAt: Date;
  updatedAt: Date;
  accept: () => Promise<UserOrganizationInvitationResource>;
}
//#endregion
export { UserOrganizationInvitationResource };