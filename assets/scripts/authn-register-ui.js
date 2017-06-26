'use strict'
// UX for user registration.
const announceUI = require('./announce-ui.js')
const authnAPI = require('./authn-api')
const authnLogin = require('./authn-login-ui')
const authnUtilities = require('./authn-utilities-ui')
const getFormFields = require('../../lib/get-form-fields')
const msg = require('./messages.js')
const registerForm = require('../templates/registerForm.handlebars')
const store = require('./store')
// Extracts fields buried inside the registration form object
const extractFormFields = function (APIObject, user) {
  user.email = APIObject.credentials.email
  user.password = APIObject.credentials.password
  user.passwordConfirmation = APIObject.credentials.password_confirmation
  user.name = APIObject.credentials.name
  user.organization = APIObject.credentials.organization
}

const failure = function (response) {
  if (response.responseText.includes('has already been taken')) {
    // Presence of email object indicates duplicate email registration
    announceUI.post(msg.alreadyRegistered, 'announcement')
    // Try logging in after a pause
    setTimeout(function () { authnLogin.loginAPICall(store.user) }, 2500)
  } else {
    announceUI.post(msg.registrationFailed, 'announcement')
  }
}

// Submitted the register form
const onSubmit = function (e) {
  e.preventDefault()
  // Clear old error messages, if any.
  announceUI.clear('announcement')
  // Get the form's contents
  const credentialsAPIObject = getFormFields(e.target.form)
  // The API object is inconveniently structured; place contents in user.
  extractFormFields(credentialsAPIObject, store.user)
  // Validate essential credentials present in acceptable format
  // If ok, start registration over the API.
  // Otherwise wait for user to correct & resubmit form (or do something else)
  if (validateCredentials(store.user)) {
    // Heroku can be slow; indicate registering.
    announceUI.post(msg.registering)
    authnAPI.register(credentialsAPIObject)
      .then(success)
      .catch(failure)
  }
}

// Clicked the Register button
const onRequest = function () {
  // Clear announcement, response & matrix areas.
  announceUI.clear('all')
  $('#authn').html(registerForm)
  // Hide the register button but keep the space reserved on the screen
  $('#register-request').css('visibility', 'hidden')
}

const success = function (response) {
  announceUI.post(msg.registeredOK, 'announcement')
  // Log user in with cached & received credentials
  authnLogin.loginAPICall(store.user)
}

// Returns false if:
//    - email is absent
//    - password or passwordConfirmation absent
//    - password not same as passwordConfirmation
const validateCredentials = function (user) {
  let isEmailPresent = true
  // Check presence of email address
  if (user.email === '' || user.email === undefined) {
    announceUI.append(msg.noEmail)
    isEmailPresent = false
  }
  // True if password fields present+identical
  const isValid = authnUtilities.validateProposedPassword(user)
  return isEmailPresent && isValid
}

module.exports = {
  onSubmit,
  onRequest
}
