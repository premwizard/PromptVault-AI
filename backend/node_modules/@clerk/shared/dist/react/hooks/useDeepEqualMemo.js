const require_runtime = require('../../_virtual/_rolldown/runtime.js');
let react = require("react");
react = require_runtime.__toESM(react);
let dequal = require("dequal");

//#region src/react/hooks/useDeepEqualMemo.ts
const useDeepEqualMemoize = (value) => {
	const ref = react.default.useRef(value);
	if (!(0, dequal.dequal)(value, ref.current)) ref.current = value;
	return react.default.useMemo(() => ref.current, [ref.current]);
};
/**
* @internal
*/
const useDeepEqualMemo = (factory, dependencyArray) => {
	return react.default.useMemo(factory, useDeepEqualMemoize(dependencyArray));
};
/**
* @internal
*/
const isDeeplyEqual = dequal.dequal;

//#endregion
exports.isDeeplyEqual = isDeeplyEqual;
exports.useDeepEqualMemo = useDeepEqualMemo;