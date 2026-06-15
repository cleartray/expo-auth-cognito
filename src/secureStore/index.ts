import { Platform } from "react-native";
import { getItem, setItem, deleteItemAsync } from "expo-secure-store"

const debug = require('debug')('expo-auth-cognito:secure-store');

/**
 * Synchronous function to set value in secure store
 * @param key
 * @param value
 */
export function setSecureStoreItem(key: string, value: string): void {
  if (!['android', 'ios'].includes(Platform.OS)) {
    debug('Non-mobile platform detected, skipping setting secure store value.')
    return
  }
  debug(`Mobile device detected, setting value for key ${key}.`)
  setItem(key, value)
}

/**
 * Set multiple values in secure store
 * @param items
 */
export function setSecureStoreItems(items: Record<string, string>): void {
  if (!['android', 'ios'].includes(Platform.OS)) {
    debug('Non-mobile platform detected, skipping setting multiple secure store value.')
    return
  }

  for (const [key, value] of Object.entries(items)) {
    setSecureStoreItem(key, value)
  }
}

/**
 * Synchronous function to retrieve value from secure store
 * @param key
 * @returns
 */
export function getSecureStoreItem(key: string): string | undefined {
  if (!['android', 'ios'].includes(Platform.OS)) {
    debug('Non-mobile platform detected, skipping secure store value retrieval.')
    return
  }
  debug(`Mobile device detected, retrieving value for key ${key}`)
  const value = getItem(key)
  debug(`Retrieved value ${value} for key ${key}`)
  return value || undefined
}

/**
 * Synchronous function to retrieve value from secure store
 * @param keys
 * @returns
 */
export function getSecureStoreItems(keys: string[]): Record<string, string | undefined> | undefined{
  if (!['android', 'ios'].includes(Platform.OS)) {
    debug('Non-mobile platform detected, skipping secure store value retrieval.')
    return
  }

  debug(`Mobile device detected, retrieving values for multiple keys`)
  const output: Record<string, string | undefined> = {}
  keys.forEach(key => {
    output[key] = getSecureStoreItem(key)
  })
  debug(`Retrieved multiple values`)
  return output
}

/**
 * Asynchronous function to delete value from secure store.
 * Expo secure store does not present a synchronous function for deleting.
 * @param key
 * @returns
 */
export async function deleteSecureStoreItem(key: string): Promise<void> {
  if (!['android', 'ios'].includes(Platform.OS)) {
    debug('Non-mobile platform detected, skipping secure store item deletion.')
    return
  }
  debug(`Mobile device detected, deleting key ${key}`)
  await deleteItemAsync(key)
  debug(`Deleted key ${key}`)
}

/**
 * Asynchronous function to delete items from secure store.
 * @param key
 * @returns
 */
export async function deleteSecureStoreItems(keys: string[]): Promise<void> {
  if (!['android', 'ios'].includes(Platform.OS)) {
    debug('Non-mobile platform detected, skipping secure store item deletions.')
    return
  }

  keys.forEach(async key => {
    await deleteSecureStoreItem(key)
  })
}
