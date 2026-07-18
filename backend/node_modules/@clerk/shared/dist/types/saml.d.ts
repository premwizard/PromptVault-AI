//#region src/types/saml.d.ts
type SamlIdpSlug = 'saml_okta' | 'saml_google' | 'saml_microsoft' | 'saml_custom';
type SamlIdp = {
  name: string;
  logo: string;
};
type SamlIdpMap = Record<SamlIdpSlug, SamlIdp>;
//#endregion
export { SamlIdp, SamlIdpMap, SamlIdpSlug };