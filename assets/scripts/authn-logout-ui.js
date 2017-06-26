'use strict'
// UX for user log-out.

const announceUI = require('./announce-ui')
const authnAPI = require('./authn-api')
const logInRegisterButtons = require('../templates/logInRegisterButtons.handlebars')
const msg = require('./messages')
const store = require('./store')

// Server returns failure to log-out
const failure = function (response) {
  // Even if server can't log out user, treat him as logged out.
  success()
}

// Clicked the Log-in button
const onRequest = function () {
  // Clear matrix search results, as they may show ownership database
  announceUI.clear('response')
  // Remove the log-out & change-settings buttons
  announceUI.clear('authn')
  // Tell user he is being logged out.
  announceUI.post(msg.loggingOut, 'announcement')
  authnAPI.logOut()
  .then(success)
  .catch(failure)
}

const success = function (response) {
  // Log out the user locally.
  store.user.setLogInStatus(false)
  // Clear old announcements
  announceUI.clear('announcement')
  // Display log-in/register buttons.
  $('#authn').html(logInRegisterButtons())
}

module.exports = {
  onRequest
}
