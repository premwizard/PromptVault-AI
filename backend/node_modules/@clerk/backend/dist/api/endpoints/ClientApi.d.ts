import type { ClerkPaginationRequest } from '@clerk/shared/types';
import type { Client } from '../resources/Client';
import type { PaginatedResourceResponse } from '../resources/Deserializer';
import type { HandshakePayload } from '../resources/HandshakePayload';
import { AbstractAPI } from './AbstractApi';
type GetHandshakePayloadParams = {
    nonce: string;
};
/** @generateWithEmptyComment */
export declare class ClientAPI extends AbstractAPI {
    /**
     * @deprecated This method is deprecated and will be removed in a future version.
     */
    getClientList(params?: ClerkPaginationRequest): Promise<PaginatedResourceResponse<Client[]>>;
    /**
     * Gets the given [`Client`](https://clerk.com/docs/reference/backend/types/backend-client).
     * @param clientId - The ID of the client to get.
     */
    getClient(clientId: string): Promise<Client>;
    /**
     * Verifies the client in the given token.
     * @param token - The token to verify.
     * @returns The verified [`Client`](https://clerk.com/docs/reference/backend/types/backend-client).
     */
    verifyClient(token: string): Promise<Client>;
    /**
     * Retrieves the handshake payload for a given nonce. Used internally by Clerk's SDKs to resolve
     * session cookies during the handshake flow.
     *
     * @internal
     */
    getHandshakePayload(queryParams: GetHandshakePayloadParams): Promise<HandshakePayload>;
}
export {};
//# sourceMappingURL=ClientApi.d.ts.map