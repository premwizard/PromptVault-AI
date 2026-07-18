const require_method_called = require('../../telemetry/events/method-called.js');
const require_contexts = require('../contexts.js');
const require_useSessionBase = require('./base/useSessionBase.js');

//#region src/react/hooks/useSession.ts
const hookName = `useSession`;
/**
* The `useSession()` hook provides access to the current user's [`Session`](https://clerk.com/docs/reference/objects/session) object, as well as helpers for setting the active session.
*
* @unionReturnHeadings
* ["Loading", "Signed out", "Signed in"]
*
* @function
*
* @param [options] - An object containing options for the `useSession()` hook.
* @example
* ### Access the `Session` object
*
* The following example uses the `useSession()` hook to access the `Session` object, which has the `lastActiveAt` property. The `lastActiveAt` property is a `Date` object used to show the time the session was last active.
*
* <Tabs items='React,Next.js'>
* <Tab>
*
* ```tsx {{ filename: 'src/Home.tsx' }}
* import { useSession } from '@clerk/react'
*
* export default function Home() {
*   const { isLoaded, session, isSignedIn } = useSession()
*
*   if (!isLoaded) {
*     // Handle loading state
*     return null
*   }
*   if (!isSignedIn) {
*     // Handle signed out state
*     return null
*   }
*
*   return (
*     <div>
*       <p>This session has been active since {session.lastActiveAt.toLocaleString()}</p>
*     </div>
*   )
* }
* ```
*
* </Tab>
* <Tab>
*
* ```tsx {{ filename: 'app/page.tsx' }}
* 'use client';
*
* import { useSession } from '@clerk/nextjs';
*
* export default function HomePage() {
*   const { isLoaded, session, isSignedIn } = useSession();
*
*   if (!isLoaded) {
*     // Handle loading state
*     return null;
*   }
*   if (!isSignedIn) {
*     // Handle signed out state
*     return null;
*   }
*
*   return (
*     <div>
*       <p>This session has been active since {session.lastActiveAt.toLocaleString()}</p>
*     </div>
*   );
* }
* ```
*
* </Tab>
* </Tabs>
*/
const useSession = () => {
	require_contexts.useAssertWrappedByClerkProvider(hookName);
	const session = require_useSessionBase.useSessionBase();
	const clerk = require_contexts.useClerkInstanceContext();
	clerk.telemetry?.record(require_method_called.eventMethodCalled(hookName));
	if (session === void 0) return {
		isLoaded: false,
		isSignedIn: void 0,
		session: void 0
	};
	if (session === null) return {
		isLoaded: true,
		isSignedIn: false,
		session: null
	};
	return {
		isLoaded: true,
		isSignedIn: clerk.isSignedIn,
		session
	};
};

//#endregion
exports.useSession = useSession;