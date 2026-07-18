import { UseOrganizationCreationDefaultsParams, UseOrganizationCreationDefaultsReturn } from "./useOrganizationCreationDefaults.types.mjs";

//#region src/react/hooks/useOrganizationCreationDefaults.d.ts
/**
 * The `useOrganizationCreationDefaults()` hook retrieves the organization creation defaults for the current user.
 *
 * @example
 * ### Basic usage
 *
 * ```tsx
 * import { useOrganizationCreationDefaults } from '@clerk/clerk-react'
 *
 * export default function CreateOrganizationForm() {
 *   const { data, isLoading } = useOrganizationCreationDefaults()
 *
 *   if (isLoading) return <div>Loading...</div>
 *
 *   return (
 *     <form>
 *       <input defaultValue={data?.form.name} placeholder="Organization name" />
 *       <input defaultValue={data?.form.slug} placeholder="Slug" />
 *       <button type="submit">Create</button>
 *     </form>
 *   )
 * }
 * ```
 */
declare function useOrganizationCreationDefaults(params?: UseOrganizationCreationDefaultsParams): UseOrganizationCreationDefaultsReturn;
//#endregion
export { useOrganizationCreationDefaults };