import { ClerkResource } from "./resource.mjs";
import { Web3Provider } from "./web3.mjs";
import { Web3Strategy } from "./strategies.mjs";
import { VerificationResource } from "./verification.mjs";
import { Web3WalletJSONSnapshot } from "./snapshots.mjs";

//#region src/types/web3Wallet.d.ts
type PrepareWeb3WalletVerificationParams = {
  strategy: Web3Strategy;
};
type AttemptWeb3WalletVerificationParams = {
  signature: string;
  strategy?: Web3Strategy;
};
interface Web3WalletResource extends ClerkResource {
  id: string;
  web3Wallet: string;
  verification: VerificationResource;
  toString: () => string;
  prepareVerification: (params: PrepareWeb3WalletVerificationParams) => Promise<Web3WalletResource>;
  attemptVerification: (params: AttemptWeb3WalletVerificationParams) => Promise<Web3WalletResource>;
  destroy: () => Promise<void>;
  create: () => Promise<Web3WalletResource>;
  __internal_toSnapshot: () => Web3WalletJSONSnapshot;
}
type GenerateSignature = (opts: GenerateSignatureParams) => Promise<string>;
interface AuthenticateWithWeb3Params {
  identifier: string;
  generateSignature: GenerateSignature;
  strategy?: Web3Strategy;
  walletName?: string;
}
interface GenerateSignatureParams {
  identifier: string;
  nonce: string;
  provider: Web3Provider;
  walletName?: string;
}
//#endregion
export { AttemptWeb3WalletVerificationParams, AuthenticateWithWeb3Params, GenerateSignature, GenerateSignatureParams, PrepareWeb3WalletVerificationParams, Web3WalletResource };