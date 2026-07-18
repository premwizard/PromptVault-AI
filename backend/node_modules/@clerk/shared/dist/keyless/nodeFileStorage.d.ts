import { KeylessStorage } from "./service.js";

//#region src/keyless/nodeFileStorage.d.ts
interface NodeFileStorageOptions {
  /**
   * Function that returns the current working directory.
   * Defaults to process.cwd().
   */
  cwd?: () => string;
  /**
   * The framework name for the README message.
   *
   * @example '@clerk/nextjs'
   */
  frameworkPackageName?: string;
}
interface FileSystemAdapter {
  existsSync: (path: string) => boolean;
  readFileSync: (path: string, options: {
    encoding: BufferEncoding;
  }) => string;
  writeFileSync: (path: string, data: string, options: {
    encoding: BufferEncoding;
    mode?: number;
  }) => void;
  appendFileSync: (path: string, data: string) => void;
  mkdirSync: (path: string, options: {
    recursive: boolean;
  }) => void;
  rmSync: (path: string, options: {
    force?: boolean;
    recursive?: boolean;
  }) => void;
}
interface PathAdapter {
  join: (...paths: string[]) => string;
}
/**
 * Creates a file-based storage adapter for keyless mode.
 * This is used by Node.js-based frameworks (Next.js, TanStack Start, etc.)
 * to persist keyless configuration to the file system.
 *
 * @param fs - Node.js fs module or compatible adapter
 * @param path - Node.js path module or compatible adapter
 * @param options - Configuration options
 * @returns A KeylessStorage implementation
 */
declare function createNodeFileStorage(fs: FileSystemAdapter, path: PathAdapter, options?: NodeFileStorageOptions): KeylessStorage;
//#endregion
export { FileSystemAdapter, NodeFileStorageOptions, PathAdapter, createNodeFileStorage };