import { Platform } from "react-native";
import { getItem, setItem } from "expo-secure-store"

const debug = require('debug')('expo-auth-cognito:secure-store');

/**
 * Synchronous function to retrieve value from secure store
 * @param key
 * @returns
 */
export function setSecureStoreValue(key: string, value: string): void {

  debug(`Setting secure store value for ${key}`)
  if (['android', 'ios'].includes(Platform.OS)) {
    debug(`Mobile device detected`)
    setItem(key, value)
  } else {
    debug('Non-mobile platform detected, skipping setting secure store value.')
  }
}


/**
 * Synchronous function to retrieve value from secure store
 * @param key
 * @returns
 */
export function getSecureStoreValue(key: string): string | undefined {

  debug(`Fetching secure store value for ${key}`)

  if (['android', 'ios'].includes(Platform.OS)) {
    debug(`Mobile device detected`)
    const value = getItem(key)
    debug(`Retrieved value ${value} for key ${key}`)
    return value || undefined
  } else {
    debug('Non-mobile platform detected, skipping secure store value retrieval.')
  }

  return undefined
}
