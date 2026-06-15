import { it, expect } from '@jest/globals';
import {
  getSecureStoreItem,
  getSecureStoreItems,
  setSecureStoreItem,
  setSecureStoreItems,
  deleteSecureStoreItem,
  deleteSecureStoreItems
} from '../../src/secureStore'
import { Platform } from 'react-native';

it('Get existing secure store item on mobile device', () => {
  setSecureStoreItem('TEST_KEY', 'TEST_VALUE')
  const value = getSecureStoreItem('TEST_KEY')
  expect(value).toBe('TEST_VALUE')
  deleteSecureStoreItem('TEST_KEY')
  expect(getSecureStoreItem('TEST_KEY')).toBeUndefined()
})

it('Set multiple secure store items on mobile device', () => {
  const items = {
    TEST_KEY_1: 'TEST_VALUE_1',
    TEST_KEY_2: 'TEST_VALUE_2',
    TEST_KEY_3: 'TEST_VALUE_3',
  }
  const itemsAfterDelete = {
    TEST_KEY_1: undefined,
    TEST_KEY_2: undefined,
    TEST_KEY_3: undefined,
  }
  setSecureStoreItems(items)
  const values = getSecureStoreItems(Object.keys(items))
  expect(values).toEqual(items)
  deleteSecureStoreItems(Object.keys(items))
  const valuesAfterDelete = getSecureStoreItems(Object.keys(items))
  expect(valuesAfterDelete).toEqual(itemsAfterDelete)
})

it('Get non-existent secure store item on mobile device', () => {
  const value = getSecureStoreItem('NON_EXISTENT_KEY')
  expect(value).toBeUndefined()
})

it('Web should not use secure store', () => {
  Platform.OS = 'web'
  setSecureStoreItem('TEST_KEY', 'TEST_VALUE')
  const value = getSecureStoreItem('TEST_KEY')
  expect(value).toBeUndefined()

  setSecureStoreItems({WEB_KEY_1: 'WEB_VALUE_1', WEB_KEY_2: 'WEB_VALUE_2'})
  const values = getSecureStoreItems(['WEB_KEY_1', 'WEB_KEY_2'])
  expect(values).toBeUndefined()
})

it('Web should not delete from secure store', async () => {
  Platform.OS = 'ios'
  setSecureStoreItem('MOBILE_ONLY_KEY', 'MOBILE_ONLY_VALUE')

  Platform.OS = 'web'
  await deleteSecureStoreItem('MOBILE_ONLY_KEY')
  await deleteSecureStoreItems(['MOBILE_ONLY_KEY'])

  Platform.OS = 'ios'
  expect(getSecureStoreItem('MOBILE_ONLY_KEY')).toEqual('MOBILE_ONLY_VALUE')
})
