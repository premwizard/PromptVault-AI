import { Web3Strategy } from "./strategies.js";

//#region src/types/web3.d.ts
interface Web3ProviderData {
  provider: Web3Provider;
  strategy: Web3Strategy;
  name: string;
}
/** @inline */
type MetamaskWeb3Provider = 'metamask';
/** @inline */
type CoinbaseWalletWeb3Provider = 'coinbase_wallet';
/** @inline */
type OKXWalletWeb3Provider = 'okx_wallet';
/** @inline */
type BaseWeb3Provider = 'base';
/** @inline */
type SolanaWeb3Provider = 'solana';
/** @inline */
type Web3Provider = EthereumWeb3Provider | SolanaWeb3Provider;
/** @inline */
type EthereumWeb3Provider = MetamaskWeb3Provider | BaseWeb3Provider | CoinbaseWalletWeb3Provider | OKXWalletWeb3Provider;
//#endregion
export { BaseWeb3Provider, CoinbaseWalletWeb3Provider, EthereumWeb3Provider, MetamaskWeb3Provider, OKXWalletWeb3Provider, SolanaWeb3Provider, Web3Provider, Web3ProviderData };