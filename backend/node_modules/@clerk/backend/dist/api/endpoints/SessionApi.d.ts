import type { ClerkPaginationRequest, SessionStatus } from '@clerk/shared/types';
import type { Cookies } from '../resources/Cookies';
import type { PaginatedResourceResponse } from '../resources/Deserializer';
import type { Session } from '../resources/Session';
import type { Token } from '../resources/Token';
import { AbstractAPI } from './AbstractApi';
/** @generateWithEmptyComment */
export type SessionListParams = ClerkPaginationRequest<{
    /** The ID of the client to get sessions for. */
    clientId?: string;
    /** The ID of the user to get sessions for. */
    userId?: string;
    /** The status of the sessions to get. */
    status?: SessionStatus;
}>;
/** @inline */
export type RefreshTokenParams = {
    /** The expired token to refresh. */
    expired_token: string;
    /** The refresh token to refresh. */
    refresh_token: string;
    /** The origin of the request. */
    request_origin: string;
    /** The originating IP address of the request. */
    request_originating_ip?: string;
    /** The headers of the request. */
    request_headers?: Record<string, string[]>;
    /** Whether to use suffixed cookies. */
    suffixed_cookies?: boolean;
    /** The format of the token to refresh. */
    format?: 'token' | 'cookie';
};
/** @generateWithEmptyComment */
export type CreateSessionParams = {
    /** The ID of the user to create a session for. */
    userId: string;
};
/** @generateWithEmptyComment */
export declare class SessionAPI extends AbstractAPI {
    /**
     * Gets a list of sessions for either the specified client or user. Requires either `clientId` or `userId` to be provided. By default, the list is returned in descending order by creation date (newest first).
     * @returns A [`PaginatedResourceResponse`](https://clerk.com/docs/reference/backend/types/paginated-resource-response) object with a `data` property containing an array of [`Session`](https://clerk.com/docs/reference/backend/types/backend-session) objects and a `totalCount` property containing the total number of sessions.
     */
    getSessionList(params?: SessionListParams): Promise<PaginatedResourceResponse<Session[]>>;
    /**
     * Gets the given [`Session`](https://clerk.com/docs/reference/backend/types/backend-session).
     * @param sessionId - The ID of the session to get.
     */
    getSession(sessionId: string): Promise<Session>;
    /**
     * Creates a new session for the given user.
     * @returns The created [`Session`](https://clerk.com/docs/reference/backend/types/backend-session).
     */
    createSession(params: CreateSessionParams): Promise<Session>;
    /**
     * Revokes the given session. The user will be signed out from the client the session is associated with.
     * @param sessionId - The ID of the session to revoke.
     * @returns The revoked [`Session`](https://clerk.com/docs/reference/backend/types/backend-session).
     */
    revokeSession(sessionId: string): Promise<Session>;
    verifySession(sessionId: string, token: string): Promise<Session>;
    /**
     * Gets a session token or generates a JWT using a specified template that is defined in the [**JWT templates**](https://dashboard.clerk.com/~/jwt-templates) page in the Clerk Dashboard.
     *
     * @param sessionId - The ID of the session to get the token for.
     * @param template - The name of the JWT template configured in the Clerk Dashboard to generate a new token from.
     * @param expiresInSeconds - The expiration time for the token in seconds. If not provided, uses the default expiration.
     *
     * @returns The generated token.
     */
    getToken(sessionId: string, template?: string, expiresInSeconds?: number): Promise<Token>;
    /**
     * Refreshes the given session.
     * @param sessionId - The ID of the session to refresh.
     * @param params - The parameters to refresh the session.
     * @returns The refreshed token.
     */
    refreshSession(sessionId: string, params: RefreshTokenParams & {
        /** The format of the token to refresh. */
        format: 'token';
    }): Promise<Token>;
    refreshSession(sessionId: string, params: RefreshTokenParams & {
        format: 'cookie';
    }): Promise<Cookies>;
    refreshSession(sessionId: string, params: RefreshTokenParams): Promise<Token>;
}
//# sourceMappingURL=SessionApi.d.ts.map