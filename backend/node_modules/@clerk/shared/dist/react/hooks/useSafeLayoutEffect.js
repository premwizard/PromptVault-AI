const require_runtime = require('../../_virtual/_rolldown/runtime.js');
let react = require("react");
react = require_runtime.__toESM(react);

//#region src/react/hooks/useSafeLayoutEffect.tsx
/**
* @internal
*/
const useSafeLayoutEffect = typeof window !== "undefined" ? react.default.useLayoutEffect : react.default.useEffect;

//#endregion
exports.useSafeLayoutEffect = useSafeLayoutEffect;