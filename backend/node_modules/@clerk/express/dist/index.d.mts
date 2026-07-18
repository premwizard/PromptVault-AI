import { i as ExpressRequestWithAuth, n as ClerkMiddlewareOptions, r as ClerkMiddlewareOptionsCallback, t as AuthenticateRequestParams } from "./types-CRXNc42W.mjs";
import { ClerkClient } from "@clerk/backend";
import { GetAuthFn, RequestState } from "@clerk/backend/internal";
import { Request, RequestHandler } from "express";
export * from "@clerk/backend";

//#region src/clerkClient.d.ts
declare const clerkClient: ClerkClient;
//#endregion
//#region src/clerkMiddleware.d.ts
/**
 * Middleware that integrates Clerk authentication into your Express application.
 * It checks the request's cookies and headers for a session JWT and, if found,
 * attaches the Auth object to the request object under the `auth` key.
 *
 * Accepts either a static options object or a callback that receives the request
 * and returns options. The callback form is useful for multi-domain setups where
 * the publishable key differs per domain.
 *
 * @example
 * app.use(clerkMiddleware(options));
 *
 * @example
 * const clerkClient = createClerkClient({ ... });
 * app.use(clerkMiddleware({ clerkClient }));
 *
 * @example
 * app.use(clerkMiddleware());
 *
 * @example
 * // Dynamic keys per domain
 * app.use(clerkMiddleware((req) => ({
 *   publishableKey: req.hostname === 'example.com' ? PK_A : PK_B,
 * })));
 */
declare const clerkMiddleware: (options?: ClerkMiddlewareOptions | ClerkMiddlewareOptionsCallback) => RequestHandler;
//#endregion
//#region src/getAuth.d.ts
/**
 * Retrieves the Clerk AuthObject using the current request object.
 *
 * @param {GetAuthOptions} options - Optional configuration for retrieving auth object.
 * @returns {AuthObject} Object with information about the request state and claims.
 * @throws {Error} `clerkMiddleware` or `requireAuth` is required to be set in the middleware chain before this util is used.
 */
declare const getAuth: GetAuthFn<Request>;
//#endregion
//#region src/requireAuth.d.ts
/**
 * Middleware to require authentication for user requests.
 * Redirects unauthenticated requests to the sign-in url.
 *
 * @deprecated Use `clerkMiddleware()` with `getAuth()` instead.
 * `requireAuth` will be removed in the next major version.
 *
 * @example
 * // Before (deprecated)
 * import { requireAuth } from '@clerk/express'
 * router.get('/path', requireAuth(), getHandler)
 *
 * @example
 * // After (recommended)
 * import { clerkMiddleware, getAuth } from '@clerk/express'
 *
 * app.use(clerkMiddleware())
 *
 * app.get('/api/protected', (req, res) => {
 *   const { userId } = getAuth(req);
 *   if (!userId) {
 *     return res.status(401).json({ error: 'Unauthorized' });
 *   }
 *   // handle authenticated request
 * })
 */
declare const requireAuth: (options?: ClerkMiddlewareOptions) => RequestHandler;
//#endregion
//#region src/authenticateRequest.d.ts
/**
 * @internal
 * Authenticates an Express request by wrapping clerkClient.authenticateRequest and
 * converts the express request object into a standard web request object
 *
 * @param opts - Configuration options for request authentication
 * @param opts.clerkClient - The Clerk client instance to use for authentication
 * @param opts.request - The Express request object to authenticate
 * @param opts.options - Optional middleware configuration options
 */
declare const authenticateRequest: (opts: AuthenticateRequestParams) => Promise<RequestState<"session_token">>;
//#endregion
export { type ClerkMiddlewareOptions, type ClerkMiddlewareOptionsCallback, type ExpressRequestWithAuth, authenticateRequest, clerkClient, clerkMiddleware, getAuth, requireAuth };
//# sourceMappingURL=index.d.mts.map