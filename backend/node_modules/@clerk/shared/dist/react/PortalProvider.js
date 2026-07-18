'use client';

const require_runtime = require('../_virtual/_rolldown/runtime.js');
const require_createContextAndHook = require('./hooks/createContextAndHook.js');
let react = require("react");
react = require_runtime.__toESM(react);

//#region src/react/PortalProvider.tsx
const [PortalContext, , usePortalContextWithoutGuarantee] = require_createContextAndHook.createContextAndHook("PortalProvider");
/**
* UNSAFE_PortalProvider allows you to specify a custom container for Clerk floating UI elements
* (popovers, modals, tooltips, etc.) that use portals.
*
* Only components within this provider will be affected. Components outside the provider
* will continue to use the default document.body for portals.
*
* This is particularly useful when using Clerk components inside external UI libraries
* like Radix Dialog or React Aria Components, where portaled elements need to render
* within the dialog's container to remain interactable.
*
* @example
* ```tsx
* function Example() {
*   const containerRef = useRef(null);
*   return (
*     <RadixDialog ref={containerRef}>
*       <UNSAFE_PortalProvider getContainer={() => containerRef.current}>
*         <UserButton />
*       </UNSAFE_PortalProvider>
*     </RadixDialog>
*   );
* }
* ```
*/
const UNSAFE_PortalProvider = ({ children, getContainer }) => {
	const contextValue = react.default.useMemo(() => ({ value: { getContainer } }), [getContainer]);
	return /* @__PURE__ */ react.default.createElement(PortalContext.Provider, { value: contextValue }, children);
};
UNSAFE_PortalProvider.displayName = "UNSAFE_PortalProvider";
/**
* Hook to get the current portal root container.
* Returns the getContainer function from context if inside a PortalProvider,
* otherwise returns a function that returns null (default behavior).
*/
const usePortalRoot = () => {
	const contextValue = usePortalContextWithoutGuarantee();
	if (contextValue && "getContainer" in contextValue && contextValue.getContainer) return contextValue.getContainer;
	return () => null;
};

//#endregion
exports.UNSAFE_PortalProvider = UNSAFE_PortalProvider;
exports.usePortalRoot = usePortalRoot;