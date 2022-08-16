import { AccountInfo } from '@azure/msal-common'

/**
 * ProfileInfo
 * response type received from Client API call to get userInfo
 */
export type ProfileInfo = {
  businessPhones: string[]
  displayName: string
  givenName: string
  id: string
  jobTitle?: string | null
  mail?: string | null
  mobilePhone: string | null
  officeLocation: string | null
  preferredLanguage: string | null
  surname: string
  userPrincipalName: string
}

/**
 * UserInfo
 * Object type containing microsoft login info and profile info
 */
export type UserInfo = {
  account: AccountInfo | undefined
  profile: ProfileInfo | undefined
}
