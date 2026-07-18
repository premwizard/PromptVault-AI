import type { AccountlessApplication } from '../resources/AccountlessApplication';
import { AbstractAPI } from './AbstractApi';
type AccountlessApplicationParams = {
    requestHeaders?: Headers;
    source?: string;
};
export declare class AccountlessApplicationAPI extends AbstractAPI {
    createAccountlessApplication(params?: AccountlessApplicationParams): Promise<AccountlessApplication>;
    completeAccountlessApplicationOnboarding(params?: AccountlessApplicationParams): Promise<AccountlessApplication>;
}
export {};
//# sourceMappingURL=AccountlessApplicationsAPI.d.ts.map