import { createEventBus } from "./eventBus.mjs";

//#region src/clerkEventBus.ts
const clerkEvents = { Status: "status" };
const createClerkEventBus = () => {
	return createEventBus();
};

//#endregion
export { clerkEvents, createClerkEventBus };
//# sourceMappingURL=clerkEventBus.mjs.map