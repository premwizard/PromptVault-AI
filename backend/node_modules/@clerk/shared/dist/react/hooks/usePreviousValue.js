let react = require("react");

//#region src/react/hooks/usePreviousValue.ts
/**
* A hook that retains the previous value of a primitive type.
* It uses a ref to prevent causing unnecessary re-renders.
*
* @internal
*
* @example
* ```
* Render 1: value = 'A' → returns null
* Render 2: value = 'B' → returns 'A'
* Render 3: value = 'B' → returns 'A'
* Render 4: value = 'B' → returns 'A'
* Render 5: value = 'C' → returns 'B'
* ```
*/
function usePreviousValue(value) {
	const currentRef = (0, react.useRef)(value);
	const previousRef = (0, react.useRef)(null);
	if (currentRef.current !== value) {
		previousRef.current = currentRef.current;
		currentRef.current = value;
	}
	return previousRef.current;
}

//#endregion
exports.usePreviousValue = usePreviousValue;