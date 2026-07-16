import { getSecureStoreItems } from "../secureStore";
import { Platform } from "react-native";

const debug = require('debug')('expo-auth-cognito:auth-session');

export async function getOpenIdConfig(baseUrl: string) {
  const url = `${baseUrl}/.well-known/openid-configuration`
  debug(`Fetching OIDC discovery information from .well-known endpoint: ${url}`)

  const response = (await fetch(url)).json()
  //  const discovery = await fetchDiscoveryAsync(url)

  return response
}

const userLocalKeys = [
  'AUTH_USER_SUB',
  'AUTH_USER_EMAIL',
]

export function getLocalUser()  {

  let user = undefined
  if (['ios', 'android'].includes(Platform.OS)) {
    debug('Mobile device detected, fetching local user from secure store')
    const user = getSecureStoreItems(userLocalKeys)
  }

  return user
}
