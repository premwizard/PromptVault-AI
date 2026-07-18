import { ClerkAPIResponseError } from "../../errors/clerkApiResponseError.mjs";
import { GetOAuthConsentInfoParams, OAuthConsentInfo } from "../../types/oauthApplication.mjs";
//#region src/react/hooks/useOAuthConsent.types.d.ts
/**
 * @interface
 */
type UseOAuthConsentParams = Pick<GetOAuthConsentInfoParams, 'oauthClientId' | 'scope' | 'redirectUri'> & {
  /**
   * If `true`, the previous data will be kept in the cache until new data is fetched.
   *
   * @default true
   */
  keepPreviousData?: boolean;
  /**
   * If `true`, a request will be triggered when the hook is mounted and the user is signed in.
   *
   * @default true
   */
  enabled?: boolean;
};
/**
 * @interface
 */
type UseOAuthConsentReturn = {
  /**
   * The OAuth consent screen metadata returned by Clerk, or `undefined` before the first successful fetch.
   */
  data: OAuthConsentInfo | undefined;
  /**
   * Any error that occurred during the data fetch, or `null` if no error occurred.
   */
  error: ClerkAPIResponseError | null;
  /**
   * Whether the initial consent metadata fetch is still in progress.
   */
  isLoading: boolean;
  /**
   * Whether any request is still in flight, including background updates.
   */
  isFetching: boolean;
};
//#endregion
export { UseOAuthConsentParams, UseOAuthConsentReturn };