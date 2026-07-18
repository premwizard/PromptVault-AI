import { Clerk, ClerkStatus } from "../types/clerk.mjs";
import { InitialState } from "../types/ssr.mjs";
import React from "react";

//#region src/react/ClerkContextProvider.d.ts
type ClerkContextProps = {
  clerk: Clerk;
  clerkStatus?: ClerkStatus;
  children: React.ReactNode;
  initialState?: InitialState | Promise<InitialState>;
};
declare function ClerkContextProvider(props: ClerkContextProps): JSX.Element | null;
//#endregion
export { ClerkContextProvider };