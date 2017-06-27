'use strict'

const authnDispatchUI = require('./authn-dispatch-ui')
const config = require('./config')
const setAPIOrigin = require('../../lib/set-api-origin')
const store = require('./store')
const User = require('./user')

const $ = require('jquery')
require('datatables.net-bs')

// require('./dataTables.editor.js')(window, $)

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

  // const editor = new $.fn.dataTable.Editor({
  //   ajax:  '/api/staff',
  //   table: '#example',
  //   fields: [
  //       { label: 'First name', name: 'first_name' },
  //       { label: 'Last name',  name: 'last_name'  },
  //       // etc
  //   ]
  // } );

  $('#example').DataTable()
//     ajax: '/api/staff',
//     dom: 'Bfrtip',
//     columns: [
//         { data: 'first_name' },
//         { data: 'last_name' },
//         // etc
//     ],
//     select: true,
//     buttons: [
//         { extend: 'create', editor: editor },
//         { extend: 'edit',   editor: editor },
//         { extend: 'remove', editor: editor }
//     ]
// } );
// })

// const editor = new $.fn.dataTable.Editor({
//   ajax:  '/api/staff',
//   table: '#example',
//   fields: [
//       { label: 'First name', name: 'first_name' },
//       { label: 'Last name',  name: 'last_name'  },
//       // etc
//   ]
// } );
})
