import { jest } from '@jest/globals'
import * as ExpoAuthSession from 'expo-auth-session';

// Mock expo-auth-session methods that make remote calls
jest.mock('expo-auth-session', () => {
  const expoAuthSession = jest.requireActual('expo-auth-session') as typeof ExpoAuthSession
  const wellKnown = require('../fixtures/well-known-openid-configuration.json')

  return {
    ...expoAuthSession,
    fetchDiscoveryAsync: jest.fn(() => Promise.resolve(wellKnown)),
    makeRedirectUri: jest.fn(() => 'exp://localhost:19000'),
  };
});
