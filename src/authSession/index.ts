import { fetchDiscoveryAsync } from 'expo-auth-session';
const debug = require('debug')('expo-auth-cognito:auth-session');

export async function getOpenIdConfig(baseUrl: string) {
  const url = `${baseUrl}/.well-known/openid-configuration`
  debug(`Fetching OIDC discovery information from .well-known endpoint: ${url}`)

  const discovery = await fetchDiscoveryAsync(url)

  return discovery
}
