import type { MachineScopeJSON } from './JSON';
/**
 * The Backend `MachineScope` object holds information about a machine scope.
 */
export declare class MachineScope {
    /** The ID of the machine that has access to the target machine. */
    readonly fromMachineId: string;
    /** The ID of the machine that is being accessed. */
    readonly toMachineId: string;
    /** The Unix timestamp when the machine scope was created. */
    readonly createdAt?: number | undefined;
    /** Whether the machine scope has been deleted. */
    readonly deleted?: boolean | undefined;
    constructor(
    /** The ID of the machine that has access to the target machine. */
    fromMachineId: string, 
    /** The ID of the machine that is being accessed. */
    toMachineId: string, 
    /** The Unix timestamp when the machine scope was created. */
    createdAt?: number | undefined, 
    /** Whether the machine scope has been deleted. */
    deleted?: boolean | undefined);
    static fromJSON(data: MachineScopeJSON): MachineScope;
}
//# sourceMappingURL=MachineScope.d.ts.map