'use strict'
const store = require('./store')

// messages in English for now
const alreadyRegistered = 'This email address is already registered. Attempting to log you in…'
const badEmailPassword = 'This email or password was not recognized. Please try again, or re-register.'
const changingPassword = 'Changing your password…'
const loginFailUnknownCause = 'Sorry! Logging in failed mysteriously ☹️ — try again, or try later.'
const loggingIn = 'Logging you in…'
const loggingOut = 'Logging you out…'
const noEmail = 'Please enter your email address.'
const noOldPassword = 'Please enter your current password.'
const noPassword = 'Please enter your new password twice identically.'
const passwordChanged = 'Password changed successfully.'
const passwordChangeFailed = 'Sorry! Registration failed mysteriously ☹️ — please try again later.'
const registeredOK = 'Registered successfully! Please log in.'
const registering = 'Registering you…'
const registrationFailed = 'Sorry! Registration failed mysteriously ☹️ — try again or log-in with a different account.'
const unequalPassword = 'Your new password entries are not identical; please re-enter both.'

module.exports = {
  alreadyRegistered,
  badEmailPassword,
  changingPassword,
  loginFailUnknownCause,
  loggingIn,
  loggingOut,
  noEmail,
  noOldPassword,
  noPassword,
  passwordChanged,
  passwordChangeFailed,
  registeredOK,
  registering,
  registrationFailed,
  unequalPassword
}
