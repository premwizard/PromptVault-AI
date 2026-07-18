import { UseOAuthConsentParams, UseOAuthConsentReturn } from "./useOAuthConsent.types.js";

//#region src/react/hooks/useOAuthConsent.d.ts
/**
 * The `useOAuthConsent()` hook loads OAuth application consent metadata for the **signed-in** user
 * (`GET /me/oauth/consent/{oauthClientId}`). Ensure the user is authenticated before relying on this hook
 * (for example, redirect to sign-in on your custom consent route).
 *
 * @example
 * ```tsx
 * import { useOAuthConsent } from '@clerk/react/internal'
 *
 * const { data, isLoading, error } = useOAuthConsent({
 *   oauthClientId: clientIdFromProps,
 *   scope: scopeFromProps,
 * })
 * ```
 */
declare function useOAuthConsent(params: UseOAuthConsentParams): UseOAuthConsentReturn;
//#endregion
export { useOAuthConsent };