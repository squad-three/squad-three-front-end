'use strict'

const authnDispatchUI = require('./authn-dispatch-ui')
const config = require('./config')
const setAPIOrigin = require('../../lib/set-api-origin')
const store = require('./store')
const User = require('./user')

// require('datatables.net')
require('datatables.net-bs')
// require('datatables.net-editor')

$(() => {
  setAPIOrigin(location, config)
  // Instantiate a new User in store.
  store.user = new User(false)
  // Insert application heading (done after the basic DOM loads to avoid
  //    jumping around on the screen at page load.
  $('#app-title').html('<h1>Achieve Your Bucket List</h1>')
  // Load initial page content: matrix form & login/register buttons
  authnDispatchUI.initUI()
  // other UI inits go here
  $('#example').DataTable()
})
