const require_devCache = require('./devCache.js');

//#region src/keyless/service.ts
const KEYLESS_SOURCE_FALLBACK = "javascript";
const KEYLESS_SOURCE_MAX_LENGTH = 36;
/**
* Creates metadata headers for the keyless service.
*/
function createMetadataHeaders(framework, frameworkVersion) {
	const headers = new Headers();
	if (framework) headers.set("Clerk-Framework", framework);
	if (frameworkVersion) headers.set("Clerk-Framework-Version", frameworkVersion);
	return headers;
}
function createSource(framework) {
	return (framework || KEYLESS_SOURCE_FALLBACK).toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, KEYLESS_SOURCE_MAX_LENGTH) || KEYLESS_SOURCE_FALLBACK;
}
/**
* Creates a keyless service that handles accountless application creation and storage.
* This provides a simple API for frameworks to integrate keyless mode.
*
* @param options - Configuration for the service including storage and API adapters
* @returns A keyless service instance
*
* @example
* ```ts
* import { createKeylessService } from '@clerk/shared/keyless';
*
* const keylessService = createKeylessService({
*   storage: createFileStorage(),
*   api: createKeylessAPI({ secretKey }),
*   framework: 'TanStack Start',
* });
*
* const keys = await keylessService.getOrCreateKeys(request);
* if (keys) {
*   console.log('Publishable Key:', keys.publishableKey);
* }
* ```
*/
function createKeylessService(options) {
	const { storage, api, framework, frameworkVersion } = options;
	let hasLoggedKeylessMessage = false;
	const source = createSource(framework);
	const safeParseConfig = () => {
		try {
			const data = storage.read();
			if (!data) return;
			return JSON.parse(data);
		} catch {
			return;
		}
	};
	return {
		async getOrCreateKeys() {
			const existingConfig = safeParseConfig();
			if (existingConfig?.publishableKey && existingConfig?.secretKey) return existingConfig;
			const headers = createMetadataHeaders(framework, frameworkVersion);
			const accountlessApplication = await api.createAccountlessApplication(headers, source);
			if (accountlessApplication) storage.write(JSON.stringify(accountlessApplication));
			return accountlessApplication;
		},
		readKeys() {
			return safeParseConfig();
		},
		removeKeys() {
			storage.remove();
		},
		async completeOnboarding() {
			const headers = createMetadataHeaders(framework, frameworkVersion);
			return api.completeOnboarding(headers, source);
		},
		logKeylessMessage(claimUrl) {
			if (!hasLoggedKeylessMessage) {
				hasLoggedKeylessMessage = true;
				console.log(`[Clerk]: Running in keyless mode. Claim your keys at: ${claimUrl}`);
			}
		},
		async resolveKeysWithKeylessFallback(configuredPublishableKey, configuredSecretKey) {
			let publishableKey = configuredPublishableKey;
			let secretKey = configuredSecretKey;
			let claimUrl;
			let apiKeysUrl;
			try {
				const locallyStoredKeys = safeParseConfig();
				if (Boolean(configuredPublishableKey) && configuredPublishableKey === locallyStoredKeys?.publishableKey && locallyStoredKeys) {
					try {
						await require_devCache.clerkDevelopmentCache?.run(() => this.completeOnboarding(), {
							cacheKey: `${locallyStoredKeys.publishableKey}_complete`,
							onSuccessStale: 1440 * 60 * 1e3
						});
					} catch {}
					require_devCache.clerkDevelopmentCache?.log({
						cacheKey: `${locallyStoredKeys.publishableKey}_claimed`,
						msg: require_devCache.createConfirmationMessage()
					});
					return {
						publishableKey,
						secretKey,
						claimUrl,
						apiKeysUrl
					};
				}
				if (!publishableKey && !secretKey) {
					const keylessApp = await this.getOrCreateKeys();
					if (keylessApp) {
						publishableKey = keylessApp.publishableKey;
						secretKey = keylessApp.secretKey;
						claimUrl = keylessApp.claimUrl;
						apiKeysUrl = keylessApp.apiKeysUrl;
						require_devCache.clerkDevelopmentCache?.log({
							cacheKey: keylessApp.publishableKey,
							msg: require_devCache.createKeylessModeMessage(keylessApp)
						});
					}
				}
			} catch {}
			return {
				publishableKey,
				secretKey,
				claimUrl,
				apiKeysUrl
			};
		}
	};
}

//#endregion
exports.createKeylessService = createKeylessService;