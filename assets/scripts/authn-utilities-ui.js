'use strict'
// Short utility functions used by other authn-UI modules.
const announceUI = require('./announce-ui')
const getMatrixTemplate = require('../templates/getMatrix.handlebars')
const loggedInForm = require('../templates/loggedInForm.handlebars')
const logInRegisterButtons = require('../templates/logInRegisterButtons.handlebars')
const msg = require('./messages.js')

// Display logged-in condition & matrix request form
const postLoggedInUserWorkingView = function () {
  announceUI.clear('announcement')
  $('#authn').html(loggedInForm) // Load authn area.
  announceUI.post(msg.userInfo, 'logged-in-user') // Add user name
  $('#matrix-request').html(getMatrixTemplate())
}

// Display log-in/register buttons & matrix request form.
const postPublicUserWorkingView = function () {
  announceUI.clear('announcement')
  $('#authn').html(logInRegisterButtons())
  $('#matrix-request').html(getMatrixTemplate())
}

// Examines proposed password & passwordConfirmation in store.user
// Tests for presence & suitability
// Return true if all tests passed; else display user message(s) & return false.
const validateProposedPassword = function (user) {
  let isPasswordOK = true
  // Both fields must be present
  if (user.password === '' ||
      user.password === undefined ||
      user.passwordConfirmation === '' ||
      user.passwordConfirmation === undefined) {
    announceUI.append(msg.noPassword)
    isPasswordOK = false
  } else {
    // Both fields must be equal
    if (user.password !== user.passwordConfirmation) {
      announceUI.append(msg.unequalPassword)
      isPasswordOK = false
    }
  }
  return isPasswordOK
}

module.exports = {
  postLoggedInUserWorkingView,
  postPublicUserWorkingView,
  validateProposedPassword
}
