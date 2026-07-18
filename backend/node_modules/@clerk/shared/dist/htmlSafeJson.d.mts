//#region src/htmlSafeJson.d.ts
/**
 * `JSON.stringify` that is safe to embed directly inside an HTML `<script>` element.
 *
 * `JSON.stringify` leaves `<`, `>` and `/` untouched, so a `</script>` substring in any
 * string value would break out of the surrounding script block (XSS). Escaping those
 * characters to their `\uXXXX` forms keeps the value byte-identical after `JSON.parse`
 * while preventing the HTML parser from terminating the element early.
 */
declare function htmlSafeJson(value: unknown): string;
//#endregion
export { htmlSafeJson };