import type { Jwt, JwtPayload } from '@clerk/shared/types';
import type { VerifyJwtOptions } from './verifyJwt';
export type { VerifyJwtOptions } from './verifyJwt';
export type { SignJwtOptions } from './signJwt';
export declare const verifyJwt: (token: string, options: VerifyJwtOptions) => Promise<JwtPayload>;
export declare const decodeJwt: (token: string) => Jwt;
export declare const signJwt: (payload: Record<string, unknown>, key: string | JsonWebKey, options: import("./signJwt").SignJwtOptions) => Promise<string>;
export declare const hasValidSignature: (jwt: Jwt, key: JsonWebKey | string) => Promise<boolean>;
//# sourceMappingURL=index.d.ts.map