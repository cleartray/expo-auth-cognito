export * from './authSession'
export * from './secureStore'

const debug = require('debug')('expo-auth-cognito:secure-store');

export class ExpoAuthSession {
  isLocalStorageChecked: boolean = false

  constructor(
  ) {
    this.checkLocalStorage()
  }

  checkLocalStorage() {
    debug('Checking local storage for existing user and auth data.')
    // Only check once
    if (this.isLocalStorageChecked) {
      debug('Local storage already checked, nothing to do.')
      return
    }

    // Retrieve all required applicable keys

  }
}
