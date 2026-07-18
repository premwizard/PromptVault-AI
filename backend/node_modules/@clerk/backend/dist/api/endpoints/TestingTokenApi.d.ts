import type { TestingToken } from '../resources/TestingToken';
import { AbstractAPI } from './AbstractApi';
/** @generateWithEmptyComment */
export declare class TestingTokenAPI extends AbstractAPI {
    /**
     * Creates a [Testing Token](https://clerk.com/docs/guides/development/testing/overview#testing-tokens) for the instance.
     * @returns The created [`TestingToken`](https://clerk.com/docs/reference/backend/types/backend-testing-token) object.
     */
    createTestingToken(): Promise<TestingToken>;
}
//# sourceMappingURL=TestingTokenApi.d.ts.map