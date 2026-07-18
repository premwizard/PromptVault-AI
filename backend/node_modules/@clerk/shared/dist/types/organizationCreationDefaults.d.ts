import { ClerkResource } from "./resource.js";
import { ClerkResourceJSON } from "./json.js";

//#region src/types/organizationCreationDefaults.d.ts
/**
 * The type of advisory returned when computing the defaults for creating an Organization.
 *
 * @inline
 */
type OrganizationCreationAdvisoryType = 'organization_already_exists';
/**
 * The severity of an advisory returned when computing the defaults for creating an Organization.
 *
 * @inline
 */
type OrganizationCreationAdvisorySeverity = 'warning';
interface OrganizationCreationDefaultsJSON extends ClerkResourceJSON {
  advisory: {
    code: OrganizationCreationAdvisoryType;
    severity: OrganizationCreationAdvisorySeverity;
    meta: Record<string, string>;
  } | null;
  form: {
    name: string;
    slug: string;
    logo: string | null;
    blur_hash: string | null;
  };
}
/**
 * The `OrganizationCreationDefaults` object holds the suggested default values to use when creating an Organization, along with an advisory surfacing a potential issue with the suggested defaults.
 *
 * @interface
 */
interface OrganizationCreationDefaultsResource extends ClerkResource {
  /**
   * An advisory surfacing a potential issue with the suggested defaults, or `null` if there is none.
   */
  advisory: {
    /**
     * The code identifying the advisory.
     */
    code: OrganizationCreationAdvisoryType;
    /**
     * The severity of the advisory.
     */
    severity: OrganizationCreationAdvisorySeverity;
    /**
     * Additional metadata providing context about the advisory.
     */
    meta: Record<string, string>;
  } | null;
  /**
   * The suggested default values to pre-fill the Organization creation form with.
   */
  form: {
    /**
     * The suggested Organization name.
     */
    name: string;
    /**
     * The suggested URL-friendly identifier for the Organization.
     */
    slug: string;
    /**
     * The suggested logo URL, or `null` if there is none.
     */
    logo: string | null;
    /**
     * The blur hash of the suggested logo, used to render a placeholder while the image loads, or `null` if there is none.
     */
    blurHash: string | null;
  };
}
//#endregion
export { OrganizationCreationAdvisorySeverity, OrganizationCreationAdvisoryType, OrganizationCreationDefaultsJSON, OrganizationCreationDefaultsResource };