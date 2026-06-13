import { it, expect, jest } from '@jest/globals';
import { getSecureStoreValue, setSecureStoreValue } from '../../src/secureStore'
import { Platform } from 'react-native';

// Mock expo-secure-store methods that only function on native devices (ios/android)
jest.mock('expo-secure-store', () => {
  const mockStore: { [key: string]: string } = {};

  return {
    getItem: (key: string) => {
      // debug('Getting mocked item')
      return mockStore[key] || null
    },
    setItem: (key: string, value: string) => {
      // debug('Setting mocked item')
      mockStore[key] = value;
    },
    deleteItemAsync: (key: string) => {
      delete mockStore[key];
      return Promise.resolve();
    },
  };
});

it('get existing secure store value on mobile device', () => {

  setSecureStoreValue('TEST_KEY', 'TEST_VALUE')
  const value = getSecureStoreValue('TEST_KEY')
  expect(value).toBe('TEST_VALUE')
})

it('get non-existent secure store value on mobile device', () => {
  const value = getSecureStoreValue('NON_EXISTENT_KEY')
  expect(value).toBe(undefined)
})

it('web should not use secure store', () => {
  Platform.OS = 'web'
  setSecureStoreValue('TEST_KEY', 'TEST_VALUE')
  const value = getSecureStoreValue('TEST_KEY')
  expect(value).toBe(undefined)
})
