import type { MachineJSON } from './JSON';
/**
 * The Backend `Machine` object holds information about a machine.
 */
export declare class Machine {
    /** The unique identifier for the machine. */
    readonly id: string;
    /** The name of the machine. */
    readonly name: string;
    /** The ID of the instance the machine belongs to. */
    readonly instanceId: string;
    /** The Unix timestamp when the machine was created. */
    readonly createdAt: number;
    /** The Unix timestamp when the machine was last updated. */
    readonly updatedAt: number;
    /** The machines that the current machine has access to. */
    readonly scopedMachines: Machine[];
    /** The default time-to-live (TTL) in seconds for tokens created by this machine. */
    readonly defaultTokenTtl: number;
    /** The secret key for the machine. */
    readonly secretKey?: string | undefined;
    constructor(
    /** The unique identifier for the machine. */
    id: string, 
    /** The name of the machine. */
    name: string, 
    /** The ID of the instance the machine belongs to. */
    instanceId: string, 
    /** The Unix timestamp when the machine was created. */
    createdAt: number, 
    /** The Unix timestamp when the machine was last updated. */
    updatedAt: number, 
    /** The machines that the current machine has access to. */
    scopedMachines: Machine[], 
    /** The default time-to-live (TTL) in seconds for tokens created by this machine. */
    defaultTokenTtl: number, 
    /** The secret key for the machine. */
    secretKey?: string | undefined);
    static fromJSON(data: MachineJSON): Machine;
}
//# sourceMappingURL=Machine.d.ts.map