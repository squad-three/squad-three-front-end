'use strict'

const config = require('../config.js')

const getBooks = function () {
  return $.ajax({
    url: config.apiOrigins.production + '/books',
    method: 'GET'
  })
}

module.exports = {
  getBooks
}
