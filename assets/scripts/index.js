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
    table: '#main-table',
    fields: [{
      label: "Description:",
      name: "Description"
    }, {
      label: "Category:",
      name: "category"
    }, {
      label: "Location:",
      name: "location"
    }, {
      label: "Duration:",
      name: "duration"
    }, {
      label: "Cost:",
      name: "date",
      type: "datetime"
    }, {
      type:  "select",
      label: "Status:",
      name:  "status",
      options: [
        { label: "Some Day", value: "Some Day" },
        { label: "In Progress", value: "In Progress" },
        { label: "Done", value: "Done" }
    ]
}
  ]
  })

  $('#main-table').DataTable({
    select: true,
    dom: 'Bfrtip',
    buttons: [{
        extend: 'create',
        editor: editor
      },
      {
        extend: 'edit',
        editor: editor
      },
      {
        extend: 'remove',
        editor: editor
      }
    ],
    columns: [{
        data: "description"
      },
      {
        data: "category"
      },
      {
        data: "location"
      },
      {
        data: "duration"
      },
      {
        data: "cost"
      },
      {
        data: "status"
      }
    ]
  })
})
