import { jest } from '@jest/globals'
// Mock expo-secure-store methods that only function on native devices (ios/android)
jest.mock('expo-secure-store', () => {
  let mockStore: Record<string, string> = {};

  return {
    getItem: (key: string) => {
      return mockStore[key] || null
    },
    setItem: (key: string, value: string) => {
      mockStore[key] = value;
    },
    deleteItemAsync: (key: string) => {
      delete mockStore[key];
      return Promise.resolve();
    },
  };
});
