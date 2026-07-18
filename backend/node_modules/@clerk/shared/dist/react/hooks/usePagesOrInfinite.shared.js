let react = require("react");

//#region src/react/hooks/usePagesOrInfinite.shared.ts
/**
* A hook that safely merges user-provided pagination options with default values.
* It caches initial pagination values (page and size) until component unmount to prevent unwanted rerenders.
*
* @internal
*
* @example
* ```typescript
* // Example 1: With user-provided options
* const userOptions = { initialPage: 2, pageSize: 20, infinite: true };
* const defaults = { initialPage: 1, pageSize: 10, infinite: false };
* useWithSafeValues(userOptions, defaults);
* // Returns { initialPage: 2, pageSize: 20, infinite: true }
*
* // Example 2: With boolean true (use defaults)
* const params = true;
* const defaults = { initialPage: 1, pageSize: 10, infinite: false };
* useWithSafeValues(params, defaults);
* // Returns { initialPage: 1, pageSize: 10, infinite: false }
*
* // Example 3: With undefined options (fallback to defaults)
* const params = undefined;
* const defaults = { initialPage: 1, pageSize: 10, infinite: false };
* useWithSafeValues(params, defaults);
* // Returns { initialPage: 1, pageSize: 10, infinite: false }
* ```
*/
const useWithSafeValues = (params, defaultValues) => {
	const shouldUseDefaults = typeof params === "boolean" && params;
	const initialPageRef = (0, react.useRef)(shouldUseDefaults ? defaultValues.initialPage : params?.initialPage ?? defaultValues.initialPage);
	const pageSizeRef = (0, react.useRef)(shouldUseDefaults ? defaultValues.pageSize : params?.pageSize ?? defaultValues.pageSize);
	const newObj = {};
	for (const key of Object.keys(defaultValues)) newObj[key] = shouldUseDefaults ? defaultValues[key] : params?.[key] ?? defaultValues[key];
	return {
		...newObj,
		initialPage: initialPageRef.current,
		pageSize: pageSizeRef.current
	};
};
/**
* Calculates the offset count for pagination based on initial page and page size.
* This represents the number of items to skip before the first page.
*
* @param initialPage - The starting page number (1-based)
* @param pageSize - The number of items per page
* @returns The number of items to offset
*
* @example
* ```typescript
* calculateOffsetCount(1, 10); // Returns 0 (no offset for first page)
* calculateOffsetCount(2, 10); // Returns 10 (skip first 10 items)
* calculateOffsetCount(3, 20); // Returns 40 (skip first 40 items)
* ```
*/
function calculateOffsetCount(initialPage, pageSize) {
	return (initialPage - 1) * pageSize;
}
/**
* Calculates the total number of pages based on total count, offset, and page size.
*
* @param totalCount - The total number of items
* @param offsetCount - The number of items to offset (from calculateOffsetCount)
* @param pageSize - The number of items per page
* @returns The total number of pages
*
* @example
* ```typescript
* calculatePageCount(100, 0, 10);  // Returns 10
* calculatePageCount(95, 0, 10);   // Returns 10 (rounds up)
* calculatePageCount(100, 20, 10); // Returns 8 (100 - 20 = 80 items, 8 pages)
* ```
*/
function calculatePageCount(totalCount, offsetCount, pageSize) {
	return Math.ceil((totalCount - offsetCount) / pageSize);
}
/**
* Determines if there is a next page available in non-infinite pagination mode.
*
* @param totalCount - The total number of items
* @param offsetCount - The number of items to offset
* @param currentPage - The current page number (1-based)
* @param pageSize - The number of items per page
* @returns True if there are more items beyond the current page
*
* @example
* ```typescript
* calculateHasNextPage(100, 0, 1, 10);  // Returns true (page 1 of 10)
* calculateHasNextPage(100, 0, 10, 10); // Returns false (last page)
* calculateHasNextPage(25, 0, 2, 10);   // Returns true (page 2, 5 more items)
* calculateHasNextPage(20, 0, 2, 10);   // Returns false (exactly 2 pages)
* ```
*/
function calculateHasNextPage(totalCount, offsetCount, currentPage, pageSize) {
	return totalCount - offsetCount > currentPage * pageSize;
}
/**
* Determines if there is a previous page available in non-infinite pagination mode.
*
* @param currentPage - The current page number (1-based)
* @param pageSize - The number of items per page
* @param offsetCount - The number of items to offset
* @returns True if there are pages before the current page
*
* @example
* ```typescript
* calculateHasPreviousPage(1, 10, 0);  // Returns false (first page)
* calculateHasPreviousPage(2, 10, 0);  // Returns true (can go back to page 1)
* calculateHasPreviousPage(1, 10, 10); // Returns false (first page with offset)
* ```
*/
function calculateHasPreviousPage(currentPage, pageSize, offsetCount) {
	return (currentPage - 1) * pageSize > offsetCount;
}

//#endregion
exports.calculateHasNextPage = calculateHasNextPage;
exports.calculateHasPreviousPage = calculateHasPreviousPage;
exports.calculateOffsetCount = calculateOffsetCount;
exports.calculatePageCount = calculatePageCount;
exports.useWithSafeValues = useWithSafeValues;