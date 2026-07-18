const require_devCache = require('./devCache.js');

//#region src/keyless/resolveKeysWithKeylessFallback.ts
/**
* Resolves Clerk keys, falling back to keyless mode in development if configured keys are missing.
*
* @param configuredPublishableKey - The publishable key from options or environment
* @param configuredSecretKey - The secret key from options or environment
* @param keylessService - The keyless service instance (or null if unavailable)
* @param canUseKeyless - Whether keyless mode is enabled in the current environment
* @returns The resolved keys (either configured or from keyless mode)
*/
async function resolveKeysWithKeylessFallback(configuredPublishableKey, configuredSecretKey, keylessService, canUseKeyless) {
	let publishableKey = configuredPublishableKey;
	let secretKey = configuredSecretKey;
	let claimUrl;
	let apiKeysUrl;
	if (!canUseKeyless) return {
		publishableKey,
		secretKey,
		claimUrl,
		apiKeysUrl
	};
	if (!keylessService) return {
		publishableKey,
		secretKey,
		claimUrl,
		apiKeysUrl
	};
	try {
		const locallyStoredKeys = keylessService.readKeys();
		if (Boolean(configuredPublishableKey) && configuredPublishableKey === locallyStoredKeys?.publishableKey && locallyStoredKeys) {
			try {
				await require_devCache.clerkDevelopmentCache?.run(() => keylessService.completeOnboarding(), {
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
			const keylessApp = await keylessService.getOrCreateKeys();
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

//#endregion
exports.resolveKeysWithKeylessFallback = resolveKeysWithKeylessFallback;