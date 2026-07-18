//#region src/moduleManager.d.ts
type ImportableModuleToTypeMap = {
  '@zxcvbn-ts/core': typeof import('@zxcvbn-ts/core');
  '@zxcvbn-ts/language-common': typeof import('@zxcvbn-ts/language-common');
  '@base-org/account': typeof import('@base-org/account');
  '@coinbase/wallet-sdk': typeof import('@coinbase/wallet-sdk');
  '@stripe/stripe-js': typeof import('@stripe/stripe-js');
};
type ImportableModule = keyof ImportableModuleToTypeMap;
interface ModuleManager {
  import: <T extends ImportableModule>(module: T) => Promise<ImportableModuleToTypeMap[T] | undefined>;
}
//#endregion
export { ImportableModule, ImportableModuleToTypeMap, ModuleManager };