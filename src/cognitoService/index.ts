const debug = require('debug')('expo-auth-cognito:CognitoService');

export type OidcConfig = {
  authorization_endpoint: string
  end_session_endpoint: string
  id_token_signing_alg_values_supported: string[]
  issuer: string
  jwks_uri: string
  response_types_supported: string[]
  revocation_endpoint: string
  scopes_supported: string[]
  subject_types_supported: string[]
  token_endpoint: string
  token_endpoint_auth_methods_supported: string[]
  userinfo_endpoint: string
}

export class CognitoService {
  region: string | undefined = undefined
  userPoolId: string | undefined = undefined
  userPoolUrl: string | undefined = undefined
  oidcConfigUrl: string | undefined = undefined
  oidcConfig: Promise<OidcConfig> | undefined = undefined

  constructor(
    region: string,
    userPoolId: string
  ) {
    this.region = region
    this.userPoolId = userPoolId
    this.userPoolUrl = this.getUserPoolUrl(region, userPoolId)
    this.oidcConfigUrl = this.getOidcConfigUrl(this.userPoolUrl)
    this.oidcConfig = this.getOidcConfig(this.oidcConfigUrl)
  }

  public getUserPoolUrl(region: string, userPoolId: string) {
    const hostName = `https://cognito-idp.${region}.amazonaws.com`
    const userPoolUrl = `${hostName}/${region}_${userPoolId}`
    debug(`Calculated user pool URL as ${userPoolUrl}`)
    return userPoolUrl
  }

  public getOidcConfigUrl(userPoolUrl: string) {
    const oidcConfigUrl = `${userPoolUrl}/.well-known/openid-configuration`
    debug(`Calculated OIDC URL as ${oidcConfigUrl}`)
    return oidcConfigUrl
  }

  public async getOidcConfig(oidcConfigUrl: string) {
    debug(`Fetching OIDC config from remote URL: ${oidcConfigUrl}`)

    try {
      const response = await fetch(oidcConfigUrl)
      debug(`Response: ${response}`)
      if (!response.ok) {
        debug(`Response not OK response: ${response}`)
        debug(`Response not OK status: ${response.status}`)
        debug(`Response not OK status text: ${response.statusText}`)
        return {nooo: 'error'}
      }
      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        debug(`Fetch failed: ${error.message}`)
        return {help: 'me'}
      }
    }


    // const oidcConfigResponse = await fetch(oidcConfigUrl)
    // try {
    //   debug(`HTTP Status code for GET OIDC config: ${oidcConfigResponse.status}`)
    //   const oidcConfig: OidcConfig = await oidcConfigResponse.json()
    //   debug(`Retrieved OIDC config: ${oidcConfig}`)
    //   return oidcConfig
    // } catch (error) {
    //   debug(`Error fetching GET OIDC config: ${error}`)
    //   return undefined
    // }
  }
}
