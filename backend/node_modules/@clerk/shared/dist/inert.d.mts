//#region src/inert.d.ts
/**
 * Returns props to spread onto an element to apply (or omit) the `inert` attribute
 * correctly across React 18 and 19.
 *
 * Typed as `Record<string, unknown>` on purpose: React 18's types reject `inert` and
 * React 19's type it as `boolean`, so an untyped spread sidesteps both type-level shapes
 * regardless of which `@types/react` a consumer compiles against.
 *
 * @param active - Whether the element should be inert.
 */
declare function inertProps(active: boolean): Record<string, unknown>;
//#endregion
export { inertProps };