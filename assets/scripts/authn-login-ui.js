'use strict'
// UX for user registration.

const announceUI = require('./announce-ui')
const authnAPI = require('./authn-api')
const authnUtilitiesUI = require('./authn-utilities-ui')
const getFormFields = require('../../lib/get-form-fields')
const msg = require('./messages.js')
const loginForm = require('../templates/loginForm.handlebars')
const store = require('./store')

const loginAPICall = function (credentials) {
  authnAPI.logIn(credentials)
  .then(success)
  .catch(failure)
}

const failure = function (response) {
  // if statusText = 'Unauthorized', inform user of bad email/password.
  if (response.statusText.includes('Unauthorized') ||
      response.responseText.includess('Not Authorized') ||
      response.statusText.includes('Not Found')) {
    announceUI.post(msg.badEmailPassword, 'announcement')
  } else {
    announceUI.post(msg.loginFailUnknownCause, 'announcement')
  }
}

const success = function (response) {
  // Load logged-in name/org, settings, log-out and settings buttons
  store.user.setLogInStatus(true,
    response.user.email,
    null,
    response.user.id,
    response.user.token)
  announceUI.clear('announcement') // Clears announcement area.
  authnUtilitiesUI.postTable()
}

// Clicked the Log-in button
const onRequest = function () {
  // Clear announcement. Since not logged in, bucket area should be empty.
  announceUI.clear('announcement')
  $('#authn').html(loginForm)
  // Hide the log-in button but keep the space reserved on the screen
  $('#log-in-request').css('visibility', 'hidden')
}

// Clicked log-in form submit button
const onSubmit = function (e) {
  e.preventDefault()
  // Clear old error messages, if any.
  announceUI.post(msg.loggingIn, 'announcement')
  loginAPICall(getFormFields(e.target.form))
}

module.exports = {
  loginAPICall,
  onRequest,
  onSubmit
}
