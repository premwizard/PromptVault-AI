//#region src/types/deletedObject.d.ts
/**
 * The `DeletedObjectResource` type represents an item that has been deleted from the database.
 */
interface DeletedObjectResource {
  /**
   * The type of object that has been deleted.
   */
  object: string;
  /**
   * The unique identifier for the deleted object.
   */
  id?: string;
  /**
   * The URL-friendly identifier for the deleted object.
   */
  slug?: string;
  /**
   * Whether the object has been deleted.
   */
  deleted: boolean;
}
//#endregion
export { DeletedObjectResource };