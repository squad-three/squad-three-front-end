'use strict'
// Utilities to manage the response area

// msg is the message to be displayed
// loc is the ID of where to display the message...
//    if loc absent, display is in the announcements window

const append = function (msg, loc) {
  if (arguments.length === 1) loc = 'announcement'
  // Erase & insert the requested announcement in the proper language.
  $(`#${loc}`).append('<br>' + msg)
}

const clear = function (loc) {
  if (!arguments.length) loc = 'announcement'
  if (loc === 'all') {
    $('#announcement').html('')
    $('#authn').html('')
    $('#bucket').html('')
    return
  }
  // Else erase specified area.
  $(`#${loc}`).html('')
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
