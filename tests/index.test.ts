import { it, expect } from '@jest/globals';
import { fn } from '../src'

it('fn', () => {
  expect(fn()).toBe('Hello')
})
