'use strict'
// Utilities to manage the response area
const store = require('./store')
// msg is the message to be displayed
// loc is the ID of where to display the message...
//    if loc absent, display is in the announcements window

const append = function (msg, loc) {
  if (arguments.length === 1) loc = 'announcement'
  // Erase & insert the requested announcement in the proper language.
  $(`#${loc}`).append('<br>' + msg)
}

// Empty specified section(s) of DOM
const clear = function (loc) {
  // If no section specfieid, just empty the announcement area.
  if (!arguments.length) loc = 'announcement'

  // If 'all' specified, empty everything
  if (loc === 'all') {
    $('#announcement').html('')
    $('#authn').html('')
    // Delete table, editor, and empty DOM section
    clearTableAndEditor()
    return
  }

  // If 'bucket' specified, delete the table & editor and empty the DOM div
  if (loc === '#bucket') {
    clearTableAndEditor()
    return
  }

  // Else erase specified area.
  $(`#${loc}`).html('')
}

// Delete table, editor, and empty DOM section
const clearTableAndEditor = function () {
  // Close the DataTables editor, if it exists
  if (store.editor) store.editor.close()
  // Delete the DataTable instance entirely (if it exists)
  //  and remove it from the DOM
  if (store.table) store.table.destroy({'remove': true})
  // Empty that section of the DOM to be sure
  $('#bucket').empty()
}

const post = function (msg, loc) {
  if (arguments.length === 1) loc = 'announcement'
  // Erase & insert the requested announcement in the proper language.
  $('#' + loc).html(msg)
}

module.exports = {
  append,
  clear,
  post
}
