const require_internal_clerk_js_errors = require('../internal/clerk-js/errors.js');

//#region src/react/utils.ts
function assertClerkSingletonExists(clerk) {
	if (!clerk) require_internal_clerk_js_errors.clerkCoreErrorNoClerkSingleton();
}

//#endregion
exports.assertClerkSingletonExists = assertClerkSingletonExists;