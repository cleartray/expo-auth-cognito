import {CognitoService} from '../../src/cognitoService'
import { it, expect } from '@jest/globals';

it('Verify Cognito OIDC config URL', async () => {
  const service = new CognitoService('eu-west-2', 'abcabcabc')
  const userPoolIrl = `https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_abcabcabc`
  expect(service.userPoolUrl).toBe(userPoolIrl)
  const oidcConfigUrl = `${userPoolIrl}/.well-known/openid-configuration`
  expect(service.oidcConfigUrl).toBe(oidcConfigUrl)
})

it ('Verify retrieved OIDC config from Cognito endpoint', async () => {
  const service = new CognitoService('eu-west-2', 'abcabcabc')
  expect(await service.oidcConfig).toBe({test: 'hello'})
})
