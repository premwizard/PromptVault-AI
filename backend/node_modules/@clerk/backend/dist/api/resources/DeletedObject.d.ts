import type { DeletedObjectJSON } from './JSON';
/**
 * The `DeletedObject` object represents an item that has been deleted from the database. It is used to represent the result of a delete operation.
 */
export declare class DeletedObject {
    /** The type of object that has been deleted. */
    readonly object: string;
    /** The unique identifier for the deleted object. */
    readonly id: string | null;
    /** The URL-friendly identifier for the deleted object. */
    readonly slug: string | null;
    /** Whether the object has been deleted. */
    readonly deleted: boolean;
    constructor(
    /** The type of object that has been deleted. */
    object: string, 
    /** The unique identifier for the deleted object. */
    id: string | null, 
    /** The URL-friendly identifier for the deleted object. */
    slug: string | null, 
    /** Whether the object has been deleted. */
    deleted: boolean);
    static fromJSON(data: DeletedObjectJSON): DeletedObject;
}
//# sourceMappingURL=DeletedObject.d.ts.map