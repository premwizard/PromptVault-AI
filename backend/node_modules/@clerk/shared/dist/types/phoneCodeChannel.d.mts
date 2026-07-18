//#region src/types/phoneCodeChannel.d.ts
interface PhoneCodeChannelData {
  channel: PhoneCodeChannel;
  name: string;
}
/** @inline */
type PhoneCodeSMSChannel = 'sms';
/** @inline */
type PhoneCodeWhatsAppChannel = 'whatsapp';
/** @inline */
type PhoneCodeChannel = PhoneCodeSMSChannel | PhoneCodeWhatsAppChannel;
/** @inline */
type PhoneCodeProvider = PhoneCodeChannel;
//#endregion
export { PhoneCodeChannel, PhoneCodeChannelData, PhoneCodeProvider, PhoneCodeSMSChannel, PhoneCodeWhatsAppChannel };