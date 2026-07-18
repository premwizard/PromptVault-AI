import { CnameTarget } from './CnameTarget';
import type { DomainJSON } from './JSON';
/** The `Domain` object represents a domain that is managed by the instance. */
export declare class Domain {
    /** The unique identifier of the domain. */
    readonly id: string;
    /** The name of the domain. */
    readonly name: string;
    /** Whether the domain is a satellite domain. */
    readonly isSatellite: boolean;
    /** The Frontend API URL for the domain. */
    readonly frontendApiUrl: string;
    /** The development origin for the domain. */
    readonly developmentOrigin: string;
    /** The CNAME targets for the domain. */
    readonly cnameTargets: CnameTarget[];
    /** The [Account Portal](https://clerk.com/docs/guides/account-portal/overview) URL for the domain. */
    readonly accountsPortalUrl?: string | null | undefined;
    /** The [proxy URL](https://clerk.com/docs/guides/dashboard/dns-domains/proxy-fapi) for the domain. */
    readonly proxyUrl?: string | null | undefined;
    constructor(
    /** The unique identifier of the domain. */
    id: string, 
    /** The name of the domain. */
    name: string, 
    /** Whether the domain is a satellite domain. */
    isSatellite: boolean, 
    /** The Frontend API URL for the domain. */
    frontendApiUrl: string, 
    /** The development origin for the domain. */
    developmentOrigin: string, 
    /** The CNAME targets for the domain. */
    cnameTargets: CnameTarget[], 
    /** The [Account Portal](https://clerk.com/docs/guides/account-portal/overview) URL for the domain. */
    accountsPortalUrl?: string | null | undefined, 
    /** The [proxy URL](https://clerk.com/docs/guides/dashboard/dns-domains/proxy-fapi) for the domain. */
    proxyUrl?: string | null | undefined);
    static fromJSON(data: DomainJSON): Domain;
}
//# sourceMappingURL=Domain.d.ts.map