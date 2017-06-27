'use strict'
// Initializes the table space after user logs in
const bucketList = require('../templates/bucketList.handlebars')

require('datatables.net-bs')
require('datatables.net-buttons')
require('datatables.net-select')
require('./dataTables.editor.js')

const blInit = function () {
  // Instantiate the bucket list editor
  const editor = new $.fn.dataTable.Editor({
    table: '#main-table',
    fields: [
      {label: 'Description:', name: 'description'},
      {type: 'select',
        label: 'Category:',
        name: 'category',
        options: [{ label: 'Acheivement', value: 'Acheivement' },
                  { label: 'Adventure', value: 'Adventure' },
                  { label: 'Body & Health', value: 'Body & Health' },
                  { label: 'Career', value: 'Career' },
                  { label: 'Charity', value: 'Charity' },
                  { label: 'Creative', value: 'Creative' },
                  { label: 'Cultural', value: 'Cultural' },
                  { label: 'Events', value: 'Events' },
                  { label: 'Experience', value: 'Experience' },
                  { label: 'Family & Kids', value: 'Family & Kids' },
                  { label: 'Financial', value: 'Financial' },
                  { label: 'Food & Drinks', value: 'Food & Drinks' },
                  { label: 'Personal Development', value: 'Personal Development' },
                  { label: 'Relationships', value: 'Relationships' },
                  { label: 'Sports', value: 'Sports' },
                  { label: 'Travel', value: 'Travel' }
        ]
      },
      {label: 'Location:', name: 'location'},
      {label: 'Duration:', name: 'duration'},
      {label: 'Cost:', name: 'cost'},
      {type: 'select',
        label: 'Status:',
        name: 'status',
        options: [{ label: 'Some Day', value: 'Some Day' },
                  { label: 'In Progress', value: 'In Progress' },
                  { label: 'Done', value: 'Done' }
        ]
      }
    ]
  })

  // load DOM with the initial bucketList
  $('#bucket').html(bucketList())
  $('#main-table').DataTable({
    select: true,
    dom: 'Bfrtip',
    buttons: [
      {extend: 'create', editor: editor},
      {extend: 'edit', editor: editor},
      {extend: 'remove', editor: editor}
    ],
    columns: [
      {data: 'description'},
      {data: 'category'},
      {data: 'location'},
      {data: 'duration'},
      {data: 'cost'},
      {data: 'status'}
    ]
  })
}

module.exports = {blInit}
