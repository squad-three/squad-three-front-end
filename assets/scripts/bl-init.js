'use strict'
// Initializes the table space after user logs in
const blInitParams = require('./bl-init-params')
const bucketList = require('../templates/bucketList.handlebars')
const store = require('./store')

require('datatables.net-bs')
require('datatables.net-buttons')
require('datatables.net-select')
require('./dataTables.editor.js')

const blInit = function () {
  // Instantiate the bucket list editor with editor config object
  const editor = new $.fn.dataTable.Editor(blInitParams.editorConfigurationParameters())
  // Cache the editor in store so it can be closed later
  store.editor = editor

  // load DOM with the initial bucketList with main table parameters
  //  object, passing in the reference to the instantiated editor.
  $('#bucket').html(bucketList())
  $('#main-table').DataTable(blInitParams.mainTableParameters(editor))
  // Cache the table in store so it can be deleted later
  store.table = $('#main-table').DataTable()

  editor.on('preSubmit', function (e, o, action) {
    if (action !== 'remove') {
      if (o.data[0].description === '') {
        console.log('description not filled')
        this.error('Description field is required.')
        return false
      } else if (o.data[0].description.length >= 28) {
        this.error('description', 'Length must be less that 28 characters.')
        return false
      }
    }
  })
}

module.exports = {blInit}
