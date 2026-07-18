import { InstanceType } from "./instance.mjs";

//#region src/types/key.d.ts
type PublishableKey = {
  frontendApi: string;
  instanceType: InstanceType;
};
//#endregion
export { PublishableKey };