const require_authorization_errors = require('../../authorization-errors.js');
const require_authorization = require('../../authorization.js');
const require_clerkApiResponseError = require('../../errors/clerkApiResponseError.js');
const require_clerkRuntimeError = require('../../errors/clerkRuntimeError.js');
require('../../error.js');
const require_method_called = require('../../telemetry/events/method-called.js');
require('../../telemetry.js');
const require_useClerk = require('./useClerk.js');
const require_useSafeLayoutEffect = require('./useSafeLayoutEffect.js');
const require_createDeferredPromise = require('../../utils/createDeferredPromise.js');
let react = require("react");

//#region src/react/hooks/useReverification.ts
const CLERK_API_REVERIFICATION_ERROR_CODE = "session_reverification_required";
/**
*
*/
async function resolveResult(result) {
	try {
		const r = await result;
		if (r instanceof Response) return r.json();
		return r;
	} catch (e) {
		if (require_clerkApiResponseError.isClerkAPIResponseError(e) && e.errors.find(({ code }) => code === CLERK_API_REVERIFICATION_ERROR_CODE)) return require_authorization_errors.reverificationError();
		throw e;
	}
}
/**
*
*/
function createReverificationHandler(params) {
	/**
	*
	*/
	function assertReverification(fetcher) {
		return (async (...args) => {
			let result = await resolveResult(fetcher(...args));
			if (require_authorization_errors.isReverificationHint(result)) {
				/**
				* Create a promise
				*/
				const resolvers = require_createDeferredPromise.createDeferredPromise();
				const isValidMetadata = require_authorization.validateReverificationConfig(result.clerk_error.metadata?.reverification);
				const level = isValidMetadata ? isValidMetadata().level : void 0;
				const cancel = () => {
					resolvers.reject(new require_clerkRuntimeError.ClerkRuntimeError("User cancelled attempted verification", { code: "reverification_cancelled" }));
				};
				const complete = () => {
					resolvers.resolve(true);
				};
				if (params.onNeedsReverification === void 0)
 /**
				* On success resolve the pending promise
				* On cancel reject the pending promise
				*/
				params.openUIComponent?.({
					level,
					afterVerification: complete,
					afterVerificationCancelled: cancel
				});
				else params.onNeedsReverification({
					cancel,
					complete,
					level
				});
				/**
				* Wait until the promise from above have been resolved or rejected
				*/
				await resolvers.promise;
				/**
				* After the promise resolved successfully try the original request one more time
				*/
				result = await resolveResult(fetcher(...args));
			}
			return result;
		});
	}
	return assertReverification;
}
/**
* > [!WARNING]
* >
* > Depending on the SDK you're using, this feature requires `@clerk/nextjs@6.12.7` or later, `@clerk/react@5.25.1` or later, and `@clerk/clerk-js@5.57.1` or later.
*
* The `useReverification()` hook is used to handle a session's reverification flow. If a request requires reverification, a modal will display, prompting the user to verify their credentials. Upon successful verification, the original request will automatically retry.
*
* @function
*
* @returns The `useReverification()` hook returns an array with the "enhanced" fetcher.
*
* @example
* ### Handle cancellation of the reverification process
*
* The following example demonstrates how to handle scenarios where a user cancels the reverification flow, such as closing the modal, which might result in `myData` being `null`.
*
* In the following example, `myFetcher` would be a function in your backend that fetches data from the route that requires reverification. See the [guide on how to require reverification](https://clerk.com/docs/guides/secure/reverification) for more information.
*
* ```tsx {{ filename: 'src/components/MyButton.tsx' }}
* import { useReverification } from '@clerk/react'
* import { isReverificationCancelledError } from '@clerk/react/error'
*
* type MyData = {
*   balance: number
* }
*
* export function MyButton() {
*   const fetchMyData = () => fetch('/api/balance').then(res=> res.json() as Promise<MyData>)
*   const enhancedFetcher = useReverification(fetchMyData);
*
*   const handleClick = async () => {
*     try {
*       const myData = await enhancedFetcher()
*       //     ^ is types as `MyData`
*     } catch (e) {
*       // Handle error returned from the fetcher here
*
*       // You can also handle cancellation with the following
*       if (isReverificationCancelledError(err)) {
*         // Handle the cancellation error here
*       }
*     }
*   }
*
*   return <button onClick={handleClick}>Update User</button>
* }
* ```
*/
const useReverification = (fetcher, options) => {
	const { __internal_openReverification, telemetry } = require_useClerk.useClerk();
	const fetcherRef = (0, react.useRef)(fetcher);
	const optionsRef = (0, react.useRef)(options);
	telemetry?.record(require_method_called.eventMethodCalled("useReverification", { onNeedsReverification: Boolean(options?.onNeedsReverification) }));
	require_useSafeLayoutEffect.useSafeLayoutEffect(() => {
		fetcherRef.current = fetcher;
		optionsRef.current = options;
	});
	return (0, react.useCallback)((...args) => {
		return createReverificationHandler({
			openUIComponent: __internal_openReverification,
			telemetry,
			...optionsRef.current
		})(fetcherRef.current)(...args);
	}, [__internal_openReverification, telemetry]);
};

//#endregion
exports.useReverification = useReverification;