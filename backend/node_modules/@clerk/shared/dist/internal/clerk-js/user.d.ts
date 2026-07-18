import { UserResource } from "../../types/user.js";
//#region src/internal/clerk-js/user.d.ts
type NameHelperParams = {
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
};
declare const getFullName: ({
  firstName,
  lastName,
  name
}: NameHelperParams) => string;
declare const getInitials: ({
  firstName,
  lastName,
  name
}: NameHelperParams) => string;
declare const getIdentifier: (user: Partial<UserResource>) => string;
//#endregion
export { getFullName, getIdentifier, getInitials };