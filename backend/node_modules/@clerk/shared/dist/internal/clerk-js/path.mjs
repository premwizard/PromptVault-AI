//#region src/internal/clerk-js/path.ts
const SEPARATOR = "/";
const MULTIPLE_SEPARATOR_REGEX = /* @__PURE__ */ new RegExp("/{1,}", "g");
function joinPaths(a, b) {
	return [a, b].filter((p) => p).join(SEPARATOR).replace(MULTIPLE_SEPARATOR_REGEX, SEPARATOR);
}

//#endregion
export { joinPaths };
//# sourceMappingURL=path.mjs.map