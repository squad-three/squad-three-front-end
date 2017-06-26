'use strict'
// Dispatcher for events in the authn authentication section of the DOM.

const authnLoginUI = require('./authn-login-ui')
const authnLogoutUI = require('./authn-logout-ui')
const authnRegisterUI = require('./authn-register-ui')
const authnSettingsUI = require('./authn-settings-ui')
const authnUtilitiesUI = require('./authn-utilities-ui')
const logInRegisterButtons = require('../templates/logInRegisterButtons.handlebars')
// const matrixGetUI = require('./matrix-get-ui')

// Initialize authentication section of DOM
// Invoked by index.js at page load.
const initUI = function () {
  // Load the register & log-in buttons into DOM
  $('#authn').html(logInRegisterButtons())
  // Add delegating click dispatcher to this section of DOM
  $('#authn').on('click', onClick)
}

// Dispatch clicks
const onClick = function (e) {
  e.preventDefault()
  switch (e.target.id) {
    case 'cancel-request':
      authnUtilitiesUI.postPublicUserWorkingView()
      break
    case 'change-password-submit':
      authnSettingsUI.onPasswordSubmit(e)
      break
    case 'change-settings-cancel':
      authnUtilitiesUI.postLoggedInUserWorkingView()
      break
    case 'change-settings-request':
      authnSettingsUI.onRequest()
      break
    case 'log-in-request':
      authnLoginUI.onRequest()
      break
    case 'log-in-submit':
      authnLoginUI.onSubmit(e)
      break
    case 'log-out-request':
      authnLogoutUI.onRequest()
      break
    case 'register-request':
      authnRegisterUI.onRequest()
      break
    case 'register-submit':
      authnRegisterUI.onSubmit(e)
  }
}

module.exports = { initUI }
