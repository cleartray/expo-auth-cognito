/**
 * OAuth Address
 */
export interface OAuthAddress {
  formatted: string | null
  streetAddress: string | null
  locality: string | null
  region: string | null
  postalCode: string | null
  country: string | null
}

/**
 * OAuth User
 */
export interface OAuthUser {
  sub: string
  name: string | null
  givenName: string | null
  familyName: string | null
  middleName: string | null
  nickname: string | null
  preferredUsername: string | null
  profile: string | null
  picture: string | null
  website: string | null
  email: string
  emailVerified: boolean | null
  gender: string | null
  birthdate: string | null
  zoneinfo: string | null
  locale: string | null
  phoneNumber: string | null
  phoneNumberVerified: boolean | null
  address: Address | null
  updatedAt: string | null
}
