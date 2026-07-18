const require_getEnvVariable = require('../getEnvVariable.js');

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
	return automatedEnvironmentVariables.some((name) => isTruthyEnvValue(require_getEnvVariable.getEnvVariable(name)));
};

//#endregion
Object.defineProperty(exports, 'automatedEnvironmentVariables', {
  enumerable: true,
  get: function () {
    return automatedEnvironmentVariables;
  }
});
Object.defineProperty(exports, 'isAutomatedEnvironment', {
  enumerable: true,
  get: function () {
    return isAutomatedEnvironment;
  }
});
Object.defineProperty(exports, 'isDevelopmentEnvironment', {
  enumerable: true,
  get: function () {
    return isDevelopmentEnvironment;
  }
});
Object.defineProperty(exports, 'isProductionEnvironment', {
  enumerable: true,
  get: function () {
    return isProductionEnvironment;
  }
});
Object.defineProperty(exports, 'isTestEnvironment', {
  enumerable: true,
  get: function () {
    return isTestEnvironment;
  }
});
//# sourceMappingURL=runtimeEnvironment-DVXDje4R.js.map