const require_runtimeEnvironment = require('./runtimeEnvironment.js');

//#region src/utils/logErrorInDevMode.ts
const logErrorInDevMode = (message) => {
	if (require_runtimeEnvironment.isDevelopmentEnvironment()) console.error(`Clerk: ${message}`);
};

//#endregion
exports.logErrorInDevMode = logErrorInDevMode;