import { PhoneCodeChannelData } from "./types/phoneCodeChannel.mjs";
//#region src/alternativePhoneCode.d.ts
declare const ALTERNATIVE_PHONE_CODE_PROVIDERS: PhoneCodeChannelData[];
declare const getAlternativePhoneCodeProviderData: (channel?: string) => PhoneCodeChannelData | null;
//#endregion
export { ALTERNATIVE_PHONE_CODE_PROVIDERS, getAlternativePhoneCodeProviderData };