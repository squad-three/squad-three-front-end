'use strict'

const authnDispatchUI = require('./authn-dispatch-ui')
const config = require('./config')
const setAPIOrigin = require('../../lib/set-api-origin')
const schroedinger = require('../templates/schroedinger.handlebars')
const store = require('./store')
const User = require('./user')

$(() => {
  setAPIOrigin(location, config)
  // Instantiate a new User in store.
  store.user = new User(false)
  // Insert application heading (done after the basic DOM loads to avoid
  //    jumping around on the screen at page load.
  $('#app-title').html('<h1>Achieve Your Bucket List</h1>')
  $('#Schrödinger').html(schroedinger)
  // Load initial page content: matrix form & login/register buttons
  authnDispatchUI.initUI()
  // other UI inits go here
})
