Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_logger = require('../../logger.js');
const require_internal_clerk_js_queryParams = require('./queryParams.js');
const require_internal_clerk_js_url = require('./url.js');

//#region src/internal/clerk-js/sessionTasks.ts
/**
* @internal
*/
const INTERNAL_SESSION_TASK_ROUTE_BY_KEY = {
	"choose-organization": "choose-organization",
	"reset-password": "reset-password",
	"setup-mfa": "setup-mfa"
};
/**
* @internal
*/
const getTaskEndpoint = (task) => `/tasks/${INTERNAL_SESSION_TASK_ROUTE_BY_KEY[task.key]}`;
/**
* @internal
*/
function buildTaskUrl(task, opts) {
	const params = require_internal_clerk_js_queryParams.forwardClerkQueryParams();
	return require_internal_clerk_js_url.buildURL({
		base: opts.base,
		hashPath: getTaskEndpoint(task),
		searchParams: params
	}, { stringify: true });
}
/**
* @internal
*/
function navigateIfTaskExists(session, { navigate, baseUrl }) {
	const currentTask = session.currentTask;
	if (!currentTask) return;
	return navigate(buildTaskUrl(currentTask, { base: baseUrl }));
}
function warnMissingPendingTaskHandlers(options) {
	const taskOptions = ["taskUrls", "navigate"];
	if (Object.keys(options).some((option) => taskOptions.includes(option))) return;
	require_logger.logger.warnOnce(`Clerk: Session has pending tasks but no handling is configured. To handle pending tasks, provide either "taskUrls" for navigation to custom URLs or "navigate" for programmatic navigation. Without these options, users may get stuck on incomplete flows.`);
}

//#endregion
exports.INTERNAL_SESSION_TASK_ROUTE_BY_KEY = INTERNAL_SESSION_TASK_ROUTE_BY_KEY;
exports.buildTaskUrl = buildTaskUrl;
exports.getTaskEndpoint = getTaskEndpoint;
exports.navigateIfTaskExists = navigateIfTaskExists;
exports.warnMissingPendingTaskHandlers = warnMissingPendingTaskHandlers;
//# sourceMappingURL=sessionTasks.js.map