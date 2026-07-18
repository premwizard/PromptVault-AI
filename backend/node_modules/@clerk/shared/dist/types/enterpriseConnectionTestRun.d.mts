import { ClerkPaginationParams } from "./pagination.mjs";
import { ClerkResource } from "./resource.mjs";
import { ClerkResourceJSON } from "./json.mjs";

//#region src/types/enterpriseConnectionTestRun.d.ts
interface EnterpriseConnectionTestRunInitJSON {
  url: string;
}
interface EnterpriseConnectionTestRunInitResource {
  url: string;
}
type EnterpriseConnectionTestRunStatus = 'pending' | 'success' | 'failed';
interface EnterpriseConnectionTestRunParsedUserInfoJSON {
  email_address?: string;
  first_name?: string;
  last_name?: string;
  user_id?: string;
}
interface EnterpriseConnectionTestRunLogJSON {
  level?: string;
  code?: string;
  short_message?: string;
  message?: string;
}
interface EnterpriseConnectionTestRunSamlPayloadJSON {
  saml_request?: string;
  saml_response?: string;
  relay_state?: string;
}
interface EnterpriseConnectionTestRunOauthPayloadJSON {
  id_token?: string;
  access_token?: string;
  user_info?: string;
}
interface EnterpriseConnectionTestRunJSON extends ClerkResourceJSON {
  object: 'enterprise_connection_test_run';
  status: string;
  connection_type: 'saml' | 'oauth';
  parsed_user_info?: EnterpriseConnectionTestRunParsedUserInfoJSON | null;
  logs?: EnterpriseConnectionTestRunLogJSON[];
  saml?: EnterpriseConnectionTestRunSamlPayloadJSON | null;
  oauth?: EnterpriseConnectionTestRunOauthPayloadJSON | null;
  created_at: number;
}
type EnterpriseConnectionTestRunJSONSnapshot = EnterpriseConnectionTestRunJSON;
interface EnterpriseConnectionTestRunParsedUserInfoResource {
  emailAddress?: string;
  firstName?: string;
  lastName?: string;
  userId?: string;
}
interface EnterpriseConnectionTestRunLogResource {
  level?: string;
  code?: string;
  shortMessage?: string;
  message?: string;
}
interface EnterpriseConnectionTestRunSamlPayloadResource {
  samlRequest?: string;
  samlResponse?: string;
  relayState?: string;
}
interface EnterpriseConnectionTestRunOauthPayloadResource {
  idToken?: string;
  accessToken?: string;
  userInfo?: string;
}
interface EnterpriseConnectionTestRunResource extends ClerkResource {
  id: string;
  status: string;
  connectionType: 'saml' | 'oauth';
  parsedUserInfo: EnterpriseConnectionTestRunParsedUserInfoResource | null;
  logs: EnterpriseConnectionTestRunLogResource[];
  saml: EnterpriseConnectionTestRunSamlPayloadResource | null;
  oauth: EnterpriseConnectionTestRunOauthPayloadResource | null;
  createdAt: Date | null;
  __internal_toSnapshot: () => EnterpriseConnectionTestRunJSONSnapshot;
}
type EnterpriseConnectionTestRunsPaginatedJSON = {
  data: EnterpriseConnectionTestRunJSON[];
  total_count: number;
};
type GetEnterpriseConnectionTestRunsParams = ClerkPaginationParams<{
  status?: EnterpriseConnectionTestRunStatus[];
}>;
//#endregion
export { EnterpriseConnectionTestRunInitJSON, EnterpriseConnectionTestRunInitResource, EnterpriseConnectionTestRunJSON, EnterpriseConnectionTestRunJSONSnapshot, EnterpriseConnectionTestRunLogJSON, EnterpriseConnectionTestRunLogResource, EnterpriseConnectionTestRunOauthPayloadJSON, EnterpriseConnectionTestRunOauthPayloadResource, EnterpriseConnectionTestRunParsedUserInfoJSON, EnterpriseConnectionTestRunParsedUserInfoResource, EnterpriseConnectionTestRunResource, EnterpriseConnectionTestRunSamlPayloadJSON, EnterpriseConnectionTestRunSamlPayloadResource, EnterpriseConnectionTestRunStatus, EnterpriseConnectionTestRunsPaginatedJSON, GetEnterpriseConnectionTestRunsParams };