import { version } from "react";

//#region src/inert.ts
const major = parseInt(version, 10);
const isModernReact = major >= 19 || major === 0;
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
function inertProps(active) {
	if (!active) return {};
	return { inert: isModernReact ? true : "" };
}

//#endregion
export { inertProps };
//# sourceMappingURL=inert.mjs.map