//#region src/types/elementIds.d.ts
type AlertId = 'danger' | 'warning' | 'info';
type FieldId = 'firstName' | 'lastName' | 'name' | 'slug' | 'emailAddress' | 'phoneNumber' | 'currentPassword' | 'newPassword' | 'signOutOfOtherSessions' | 'passkeyName' | 'password' | 'confirmPassword' | 'identifier' | 'username' | 'code' | 'role' | 'deleteConfirmation' | 'deleteOrganizationConfirmation' | 'enrollmentMode' | 'affiliationEmailAddress' | 'deleteExistingInvitationsSuggestions' | 'legalAccepted' | 'apiKeyDescription' | 'apiKeyExpirationDate' | 'apiKeyRevokeConfirmation' | 'apiKeySecret' | 'idpCertificate' | 'idpEntityId' | 'idpMetadata' | 'idpMetadataUrl' | 'idpSsoUrl' | 'acsUrl' | 'spEntityId' | 'web3WalletName' | 'domain';
type ProfileSectionId = 'profile' | 'username' | 'emailAddresses' | 'phoneNumbers' | 'connectedAccounts' | 'enterpriseAccounts' | 'web3Wallets' | 'password' | 'passkeys' | 'mfa' | 'danger' | 'activeDevices' | 'organizationProfile' | 'organizationDanger' | 'organizationDomains' | 'manageVerifiedDomains' | 'subscriptionsList' | 'paymentMethods' | 'sso' | 'ssoStatus' | 'enableSso' | 'ssoDomain' | 'ssoConfiguration' | 'configureAgain' | 'resetSso' | 'testSsoUrl' | 'testResults' | 'accountCredits';
type ProfilePageId = 'account' | 'security' | 'organizationGeneral' | 'organizationMembers' | 'organizationSecurity' | 'billing';
type UserPreviewId = 'userButton' | 'personalWorkspace';
type OrganizationPreviewId = 'organizationSwitcherTrigger' | 'organizationList' | 'organizationSwitcherListedOrganization' | 'organizationSwitcherActiveOrganization' | 'taskChooseOrganization';
type CardActionId = 'havingTrouble' | 'alternativeMethods' | 'signUp' | 'signIn' | 'usePasskey' | 'waitlist' | 'signOut';
type MenuId = 'invitation' | 'member' | ProfileSectionId;
type SelectId = 'countryCode' | 'role' | 'paymentMethod' | 'apiKeyExpiration';
//#endregion
export { AlertId, CardActionId, FieldId, MenuId, OrganizationPreviewId, ProfilePageId, ProfileSectionId, SelectId, UserPreviewId };