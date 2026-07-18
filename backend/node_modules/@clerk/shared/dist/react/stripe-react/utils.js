let react = require("react");

//#region src/react/stripe-react/utils.ts
const usePrevious = (value) => {
	const ref = (0, react.useRef)(value);
	(0, react.useEffect)(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
};
const useAttachEvent = (element, event, cb) => {
	const cbDefined = !!cb;
	const cbRef = (0, react.useRef)(cb);
	(0, react.useEffect)(() => {
		cbRef.current = cb;
	}, [cb]);
	(0, react.useEffect)(() => {
		if (!cbDefined || !element) return () => {};
		const decoratedCb = (...args) => {
			if (cbRef.current) cbRef.current(...args);
		};
		element.on(event, decoratedCb);
		return () => {
			element.off(event, decoratedCb);
		};
	}, [
		cbDefined,
		event,
		element,
		cbRef
	]);
};

//#endregion
exports.useAttachEvent = useAttachEvent;
exports.usePrevious = usePrevious;