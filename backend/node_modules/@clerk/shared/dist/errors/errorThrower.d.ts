//#region src/errors/errorThrower.d.ts
declare const DefaultMessages: Readonly<{
  InvalidProxyUrlErrorMessage: "The proxyUrl passed to Clerk is invalid. The expected value for proxyUrl is an absolute URL or a relative path with a leading '/'. (key={{url}})";
  InvalidPublishableKeyErrorMessage: "The publishableKey passed to Clerk is invalid. You can get your Publishable key at https://dashboard.clerk.com/last-active?path=api-keys. (key={{key}})";
  MissingPublishableKeyErrorMessage: "Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.";
  MissingSecretKeyErrorMessage: "Missing secretKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.";
  MissingClerkProvider: "{{source}} can only be used within the <ClerkProvider /> component. Learn more: https://clerk.com/docs/components/clerk-provider";
}>;
type MessageKeys = keyof typeof DefaultMessages;
type Messages = Record<MessageKeys, string>;
type CustomMessages = Partial<Messages>;
type ErrorThrowerOptions = {
  packageName: string;
  customMessages?: CustomMessages;
};
interface ErrorThrower {
  setPackageName(options: ErrorThrowerOptions): ErrorThrower;
  setMessages(options: ErrorThrowerOptions): ErrorThrower;
  throwInvalidPublishableKeyError(params: {
    key?: string;
  }): never;
  throwInvalidProxyUrl(params: {
    url?: string;
  }): never;
  throwMissingPublishableKeyError(): never;
  throwMissingSecretKeyError(): never;
  throwMissingClerkProviderError(params: {
    source?: string;
  }): never;
  throw(message: string): never;
}
/**
 * Builds an error thrower.
 *
 * @internal
 */
declare function buildErrorThrower({
  packageName,
  customMessages
}: ErrorThrowerOptions): ErrorThrower;
//#endregion
export { ErrorThrower, ErrorThrowerOptions, buildErrorThrower };