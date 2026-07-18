import { ClerkHostRouter } from "../types/router.mjs";
import { ClerkRouter } from "./router.mjs";
import React from "react";

//#region src/router/react.d.ts
declare const ClerkHostRouterContext: React.Context<ClerkHostRouter | null>;
declare const ClerkRouterContext: React.Context<ClerkRouter | null>;
/**
 *
 */
declare function useClerkHostRouter(): ClerkHostRouter;
/**
 *
 */
declare function useClerkRouter(): ClerkRouter;
/**
 * Construct a Clerk Router using the provided host router. The router instance is accessible using `useClerkRouter()`.
 */
declare function Router({
  basePath,
  children,
  router
}: {
  children: React.ReactNode;
  basePath?: string;
  router?: ClerkHostRouter;
}): React.JSX.Element;
type RouteProps = {
  path?: string;
  index?: boolean;
};
/**
 * Used to conditionally render its children based on whether or not the current path matches the provided path.
 */
declare function Route({
  path,
  children,
  index
}: RouteProps & {
  children: React.ReactNode;
}): React.ReactNode;
//#endregion
export { ClerkHostRouterContext, ClerkRouterContext, Route, Router, useClerkHostRouter, useClerkRouter };