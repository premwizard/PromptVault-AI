import { ClerkResource } from "./resource.js";

//#region src/types/image.d.ts
/** Represents information about an image. */
interface ImageResource extends ClerkResource {
  /**
   * The unique identifier of the image.
   */
  id?: string;
  /**
   * The name of the image.
   */
  name: string | null;
  /**
   * The public URL of the image.
   */
  publicUrl: string | null;
}
//#endregion
export { ImageResource };