import { getEnvVariable } from "../getEnvVariable.mjs";

//#region src/utils/runtimeEnvironment.ts
const automatedEnvironmentVariables = [
	"CI",
	"CONTINUOUS_INTEGRATION",
	"GITHUB_ACTIONS",
	"GITLAB_CI",
	"CIRCLECI",
	"TRAVIS",
	"BUILDKITE",
	"BITBUCKET_BUILD_NUMBER",
	"APPVEYOR",
	"CODEBUILD_BUILD_ID",
	"TF_BUILD",
	"TEAMCITY_VERSION",
	"JENKINS_URL",
	"HUDSON_URL",
	"BAMBOO_BUILDKEY",
	"CF_PAGES"
];
const isTruthyEnvValue = (value) => {
	if (typeof value !== "string" || !value) return false;
	return ![
		"0",
		"false",
		"off",
		"no"
	].includes(value.toLowerCase());
};
const isDevelopmentEnvironment = () => {
	try {
		return process.env.NODE_ENV === "development";
	} catch {}
	return false;
};
const isTestEnvironment = () => {
	try {
		return process.env.NODE_ENV === "test";
	} catch {}
	return false;
};
const isProductionEnvironment = () => {
	try {
		return process.env.NODE_ENV === "production";
	} catch {}
	return false;
};
const isAutomatedEnvironment = () => {
	return automatedEnvironmentVariables.some((name) => isTruthyEnvValue(getEnvVariable(name)));
};

//#endregion
export { isTestEnvironment as a, isProductionEnvironment as i, isAutomatedEnvironment as n, isDevelopmentEnvironment as r, automatedEnvironmentVariables as t };
//# sourceMappingURL=runtimeEnvironment-CTVGzENl.mjs.map