import { OAuthProvider, OAuthProviderData } from "./oauth.mjs";
import { Web3Provider, Web3ProviderData } from "./web3.mjs";
import { OAuthStrategy, Web3Strategy } from "./strategies.mjs";
import { SamlIdpMap } from "./saml.mjs";

//#region src/types/runtime-values.d.ts
/**
 * @deprecated Use `import { WEB3_PROVIDERS } from "@clerk/shared/web3"` instead.
 *
 * @hidden
 */
declare const WEB3_PROVIDERS: Web3ProviderData[];
/**
 * @deprecated This utility will be dropped in the next major release.
 *
 * @hidden
 */
declare function getWeb3ProviderData(params: {
  provider?: Web3Provider;
  strategy?: Web3Strategy;
}): Web3ProviderData | undefined | null;
/**
 * @deprecated Use `import { OAUTH_PROVIDERS } from "@clerk/shared/oauth"` instead.
 *
 * @hidden
 */
declare const OAUTH_PROVIDERS: OAuthProviderData[];
/**
 * @deprecated This utility will be dropped in the next major release.
 *
 * @hidden
 */
declare function getOAuthProviderData(params: {
  provider?: OAuthProvider;
  strategy?: OAuthStrategy;
}): OAuthProviderData | undefined | null;
/**
 * @deprecated This utility will be dropped in the next major release.
 *
 * @hidden
 */
declare function sortedOAuthProviders(sortingArray: OAuthStrategy[]): OAuthProviderData[];
/**
 * @deprecated Use `import { SAML_IDPS } from "@clerk/shared/saml"` instead.
 *
 * @hidden
 */
declare const SAML_IDPS: SamlIdpMap;
//#endregion
export { OAUTH_PROVIDERS, SAML_IDPS, WEB3_PROVIDERS, getOAuthProviderData, getWeb3ProviderData, sortedOAuthProviders };