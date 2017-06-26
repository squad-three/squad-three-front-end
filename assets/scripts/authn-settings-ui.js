'use strict'
// UX for settings changes.
const announceUI = require('./announce-ui.js')
const authnAPI = require('./authn-api')
const authnUtilities = require('./authn-utilities-ui')
const getFormFields = require('../../lib/get-form-fields')
const msg = require('./messages.js')
const changeSettings = require('../templates/changeSettings.handlebars')
const store = require('./store')

// Extracts fields buried inside the registration form object
const extractFormFields = function (APIObject, user) {
  user.oldPassword = APIObject.credentials.old
  user.password = APIObject.credentials.new
  user.passwordConfirmation = APIObject.credentials.new_confirmation
}

const failure = function (response) {
  announceUI.post(msg.passwordChangeFailed, 'announcement')
  // Pause for 3 seconds to let user see message, then post working view
  setTimeout(authnUtilities.postLoggedInUserWorkingView, 2500)
}

// Clicked the Settings icon
const onRequest = function () {
  // Clear announcement, response & matrix areas.
  announceUI.clear('all')
  // Display settings change form
  $('#authn').html(changeSettings)
  announceUI.post(msg.userInfo, 'logged-in-user')
  // Hide the settings icon but keep the space reserved on the screen
  $('#change-settings-request').css('visibility', 'hidden')
}

// Submit the password change request
const onPasswordSubmit = function (e) {
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
    // Heroku can be slow; indicate changing password.
    announceUI.post(msg.changingPassword)
    authnAPI.changePassword(credentialsAPIObject)
      .then(success)
      .catch(failure)
  }
}

const success = function (response) {
  announceUI.post(msg.passwordChanged, 'announcement')
  // Pause for 3 seconds to let user see message, then post working view
  setTimeout(authnUtilities.postLoggedInUserWorkingView, 2500)
}

// Returns false if:
//    - email is absent
//    - password or passwordConfirmation absent
//    - password not same as passwordConfirmation
const validateCredentials = function (user) {
  let isOldPasswordPresent = true
  // Check presence of old password
  if (user.oldPassword === '' || user.oldPassword === undefined) {
    announceUI.append(msg.noOldPassword)
    isOldPasswordPresent = false
  }
  // True if password fields present+identical
  const isValid = authnUtilities.validateProposedPassword(user)
  return isOldPasswordPresent && isValid
}

module.exports = {
  onRequest,
  onPasswordSubmit
}
