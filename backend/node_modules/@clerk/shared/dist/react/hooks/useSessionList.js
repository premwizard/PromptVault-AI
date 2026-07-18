const require_method_called = require('../../telemetry/events/method-called.js');
const require_contexts = require('../contexts.js');
const require_useClientBase = require('./base/useClientBase.js');

//#region src/react/hooks/useSessionList.ts
const hookName = "useSessionList";
/**
* The `useSessionList()` hook returns an array of [`Session`](https://clerk.com/docs/reference/objects/session) objects that have been registered on the client device.
*
* @unionReturnHeadings
* ["Initialization", "Loaded"]
*
* @function
*
* @example
* ### Get a list of sessions
*
* The following example uses `useSessionList()` to get a list of sessions that have been registered on the client device. The `sessions` property is used to show the number of times the user has visited the page.
*
* <Tabs items='React,Next.js'>
* <Tab>
*
* ```tsx {{ filename: 'src/Home.tsx' }}
* import { useSessionList } from '@clerk/react'
*
* export default function Home() {
*   const { isLoaded, sessions } = useSessionList()
*
*   if (!isLoaded) {
*     // Handle loading state
*     return null
*   }
*
*   return (
*     <div>
*       <p>Welcome back. You've been here {sessions.length} times before.</p>
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
* import { useSessionList } from '@clerk/nextjs';
*
* export default function HomePage() {
*   const { isLoaded, sessions } = useSessionList();
*
*   if (!isLoaded) {
*     // Handle loading state
*     return null;
*   }
*
*   return (
*     <div>
*       <p>Welcome back. You've been here {sessions.length} times before.</p>
*     </div>
*   );
* }
* ```
*
* </Tab>
* </Tabs>
*/
const useSessionList = () => {
	require_contexts.useAssertWrappedByClerkProvider(hookName);
	const isomorphicClerk = require_contexts.useClerkInstanceContext();
	const client = require_useClientBase.useClientBase();
	require_contexts.useClerkInstanceContext().telemetry?.record(require_method_called.eventMethodCalled(hookName));
	if (!client) return {
		isLoaded: false,
		sessions: void 0,
		setActive: void 0
	};
	return {
		isLoaded: true,
		sessions: client.sessions,
		setActive: isomorphicClerk.setActive
	};
};

//#endregion
exports.useSessionList = useSessionList;