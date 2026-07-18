import { DeletedObjectResource } from "./deletedObject.mjs";
import { ClerkResource } from "./resource.mjs";
import { SnakeToCamel } from "./utils.mjs";
import { PasskeyVerificationResource } from "./verification.mjs";
import { PasskeyJSONSnapshot } from "./snapshots.mjs";
import { PasskeyJSON } from "./json.mjs";

//#region src/types/passkey.d.ts
type UpdatePasskeyJSON = Pick<PasskeyJSON, 'name'>;
type UpdatePasskeyParams = Partial<SnakeToCamel<UpdatePasskeyJSON>>;
interface PasskeyResource extends ClerkResource {
  id: string;
  name: string | null;
  verification: PasskeyVerificationResource | null;
  lastUsedAt: Date | null;
  updatedAt: Date;
  createdAt: Date;
  update: (params: UpdatePasskeyParams) => Promise<PasskeyResource>;
  delete: () => Promise<DeletedObjectResource>;
  __internal_toSnapshot: () => PasskeyJSONSnapshot;
}
type PublicKeyCredentialCreationOptionsWithoutExtensions = Omit<Required<PublicKeyCredentialCreationOptions>, 'extensions'>;
type PublicKeyCredentialRequestOptionsWithoutExtensions = Omit<Required<PublicKeyCredentialRequestOptions>, 'extensions'>;
type PublicKeyCredentialWithAuthenticatorAttestationResponse = Omit<PublicKeyCredential, 'response' | 'getClientExtensionResults'> & {
  response: Omit<AuthenticatorAttestationResponse, 'getAuthenticatorData' | 'getPublicKey' | 'getPublicKeyAlgorithm'>;
};
type PublicKeyCredentialWithAuthenticatorAssertionResponse = Omit<PublicKeyCredential, 'response' | 'getClientExtensionResults'> & {
  response: AuthenticatorAssertionResponse;
};
type CredentialReturn<T> = {
  publicKeyCredential: T;
  error: null;
} | {
  publicKeyCredential: null;
  error: Error;
};
//#endregion
export { CredentialReturn, PasskeyResource, PublicKeyCredentialCreationOptionsWithoutExtensions, PublicKeyCredentialRequestOptionsWithoutExtensions, PublicKeyCredentialWithAuthenticatorAssertionResponse, PublicKeyCredentialWithAuthenticatorAttestationResponse, UpdatePasskeyParams };