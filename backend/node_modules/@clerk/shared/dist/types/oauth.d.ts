import { OAuthStrategy } from "./strategies.js";

//#region src/types/oauth.d.ts
type OAuthScope = string;
interface OAuthProviderData {
  provider: OAuthProvider;
  strategy: OAuthStrategy;
  name: string;
  docsUrl?: string;
}
/** @inline */
type FacebookOauthProvider = 'facebook';
/** @inline */
type GoogleOauthProvider = 'google';
/** @inline */
type HubspotOauthProvider = 'hubspot';
/** @inline */
type GithubOauthProvider = 'github';
/** @inline */
type TiktokOauthProvider = 'tiktok';
/** @inline */
type GitlabOauthProvider = 'gitlab';
/** @inline */
type DiscordOauthProvider = 'discord';
/** @inline */
type TwitterOauthProvider = 'twitter';
/** @inline */
type TwitchOauthProvider = 'twitch';
/** @inline */
type LinkedinOauthProvider = 'linkedin';
/** @inline */
type LinkedinOIDCOauthProvider = 'linkedin_oidc';
/** @inline */
type DropboxOauthProvider = 'dropbox';
/** @inline */
type AtlassianOauthProvider = 'atlassian';
/** @inline */
type BitbucketOauthProvider = 'bitbucket';
/** @inline */
type MicrosoftOauthProvider = 'microsoft';
/** @inline */
type NotionOauthProvider = 'notion';
/** @inline */
type AppleOauthProvider = 'apple';
/** @inline */
type LineOauthProvider = 'line';
/** @inline */
type InstagramOauthProvider = 'instagram';
/** @inline */
type CoinbaseOauthProvider = 'coinbase';
/** @inline */
type SpotifyOauthProvider = 'spotify';
/** @inline */
type XeroOauthProvider = 'xero';
/** @inline */
type BoxOauthProvider = 'box';
/** @inline */
type SlackOauthProvider = 'slack';
/** @inline */
type LinearOauthProvider = 'linear';
/** @inline */
type XOauthProvider = 'x';
/** @inline */
type EnstallOauthProvider = 'enstall';
/** @inline */
type HuggingfaceOAuthProvider = 'huggingface';
/** @inline */
type VercelOauthProvider = 'vercel';
/** @inline */
type CustomOauthProvider = `custom_${string}`;
/** Represents the available OAuth providers. */
type OAuthProvider = FacebookOauthProvider | GoogleOauthProvider | HubspotOauthProvider | GithubOauthProvider | TiktokOauthProvider | GitlabOauthProvider | DiscordOauthProvider | TwitterOauthProvider | TwitchOauthProvider | LinkedinOauthProvider | LinkedinOIDCOauthProvider | DropboxOauthProvider | AtlassianOauthProvider | BitbucketOauthProvider | MicrosoftOauthProvider | NotionOauthProvider | AppleOauthProvider | LineOauthProvider | InstagramOauthProvider | CoinbaseOauthProvider | SpotifyOauthProvider | XeroOauthProvider | BoxOauthProvider | SlackOauthProvider | LinearOauthProvider | XOauthProvider | EnstallOauthProvider | HuggingfaceOAuthProvider | VercelOauthProvider | CustomOauthProvider;
//#endregion
export { AppleOauthProvider, AtlassianOauthProvider, BitbucketOauthProvider, BoxOauthProvider, CoinbaseOauthProvider, CustomOauthProvider, DiscordOauthProvider, DropboxOauthProvider, EnstallOauthProvider, FacebookOauthProvider, GithubOauthProvider, GitlabOauthProvider, GoogleOauthProvider, HubspotOauthProvider, HuggingfaceOAuthProvider, InstagramOauthProvider, LineOauthProvider, LinearOauthProvider, LinkedinOIDCOauthProvider, LinkedinOauthProvider, MicrosoftOauthProvider, NotionOauthProvider, OAuthProvider, OAuthProviderData, OAuthScope, SlackOauthProvider, SpotifyOauthProvider, TiktokOauthProvider, TwitchOauthProvider, TwitterOauthProvider, VercelOauthProvider, XOauthProvider, XeroOauthProvider };