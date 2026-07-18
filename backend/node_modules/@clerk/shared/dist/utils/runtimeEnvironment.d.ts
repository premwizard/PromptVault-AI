//#region src/utils/runtimeEnvironment.d.ts
declare const automatedEnvironmentVariables: readonly ["CI", "CONTINUOUS_INTEGRATION", "GITHUB_ACTIONS", "GITLAB_CI", "CIRCLECI", "TRAVIS", "BUILDKITE", "BITBUCKET_BUILD_NUMBER", "APPVEYOR", "CODEBUILD_BUILD_ID", "TF_BUILD", "TEAMCITY_VERSION", "JENKINS_URL", "HUDSON_URL", "BAMBOO_BUILDKEY", "CF_PAGES"];
declare const isDevelopmentEnvironment: () => boolean;
declare const isTestEnvironment: () => boolean;
declare const isProductionEnvironment: () => boolean;
declare const isAutomatedEnvironment: () => boolean;
//#endregion
export { automatedEnvironmentVariables, isAutomatedEnvironment, isDevelopmentEnvironment, isProductionEnvironment, isTestEnvironment };