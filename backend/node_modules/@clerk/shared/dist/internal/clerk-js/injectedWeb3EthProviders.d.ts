import { MetamaskWeb3Provider, OKXWalletWeb3Provider } from "../../types/web3.js";
//#region src/internal/clerk-js/injectedWeb3EthProviders.d.ts
type InjectedWeb3EthProvider = MetamaskWeb3Provider | OKXWalletWeb3Provider;
declare class InjectedWeb3EthProviders {
  #private;
  private constructor();
  static getInstance(): InjectedWeb3EthProviders;
  get: (provider: InjectedWeb3EthProvider) => any;
}
declare const getInjectedWeb3EthProviders: () => InjectedWeb3EthProviders;
//#endregion
export { getInjectedWeb3EthProviders };