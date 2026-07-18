import { Clerk, ClerkStatus } from "../types/clerk.js";
import { InitialState } from "../types/ssr.js";
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