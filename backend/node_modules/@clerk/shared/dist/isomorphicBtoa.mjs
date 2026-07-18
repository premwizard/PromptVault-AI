//#region src/isomorphicBtoa.ts
const isomorphicBtoa = (data) => {
	if (typeof btoa !== "undefined" && typeof btoa === "function") return btoa(data);
	else if (typeof globalThis.Buffer !== "undefined") return globalThis.Buffer.from(data).toString("base64");
	return data;
};

//#endregion
export { isomorphicBtoa };
//# sourceMappingURL=isomorphicBtoa.mjs.map