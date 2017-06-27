'use strict'

const authnDispatchUI = require('./authn-dispatch-ui')
const config = require('./config')
const setAPIOrigin = require('../../lib/set-api-origin')
const store = require('./store')
const User = require('./user')

require('datatables.net-bs')
require('datatables.net-buttons')
require('datatables.net-select')

require('./dataTables.editor.js')

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

  const editor = new $.fn.dataTable.Editor({
    table: '#example',
    fields: [ {
                label: "Name:",
                name: "name"
            }, {
                label: "Position:",
                name: "position"
            }, {
                label: "Office:",
                name: "office"
            }, {
                label: "Age:",
                name: "age"
            }, {
                label: "Date:",
                name: "date",
                type: "datetime"
            }, {
                label: "Salary:",
                name: "salary"
            }
        ]
  } )

  $('#example').DataTable({
    select: true,
    dom: 'Bfrtip',
    buttons: [
        { extend: 'create', editor: editor },
        { extend: 'edit',   editor: editor },
        { extend: 'remove', editor: editor }
    ],
    columns: [
            { data: "name" },
            { data: "position" },
            { data: "office" },
            { data: "age" },
            { data: "date" },
            { data: "salary", render: $.fn.dataTable.render.number( ',', '.', 0, '$' ) }
          ]
} )
})
