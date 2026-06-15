import {getOpenIdConfig} from '../../src/authSession'
import { it, expect } from '@jest/globals';
const wellKnown = require('../fixtures/well-known-openid-configuration.json')

it('Fetch well known OIDC config from remote endpoint', async () => {
  const config = await getOpenIdConfig('https://auth.example.com')
  expect(config).toBe(wellKnown)
})
