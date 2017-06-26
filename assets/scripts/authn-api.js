'use strict'
// Contains all calls to the authentication API.
// See wiki for API call formats
const config = require('./config')
const store = require('./store')

// Change password API call
const changePassword = function (creds) {
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + store.user.id,
    method: 'PATCH',
    headers: {
      'Authorization': 'Token token=' + store.user.authNToken
    },
    data: {
      'passwords': {
        'old': store.user.oldPassword,
        'new': store.user.password
      }
    }
  })
}

// Invokes sign-in API to log in user
const logIn = function (creds) {
  // Duplicate password to meet API demand for password_confirmation
  // Remove submit: key:value pair
  const credentials = {
    email: creds.email,
    password: creds.password,
    password_confirmation: creds.password
  }
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data: {credentials: credentials}
  })
}

// Invokes sign-out API to log out user with existing credentials
const logOut = function () {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      'Authorization': 'Token token=' + store.user.authNToken
    }
  })
}

// Invokes sign-up API to register a new user
const register = function (credentials) {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data: credentials
  })
}

module.exports = {
  changePassword,
  logIn,
  logOut,
  register
}
