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
}

module.exports = {blInit}
