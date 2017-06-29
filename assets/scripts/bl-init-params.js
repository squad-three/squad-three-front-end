'use strict'
// parameters for initializing DataTables
const config = require('./config')
const store = require('./store')

const editorConfigurationParameters = function () {
  return {
    table: '#main-table',
    // ajax: {
    //   // url: config.apiOrigin + '/bucket',
    //   dataType: 'json',
    //   // type: 'GET',
    //   // beforeSend: function (xhr) {
    //   //   xhr.setRequestHeader('Authorization',
    //   //      'Token token=' + store.user.authNToken)
    //   },
    ajax: {
      create: {
        type: 'POST',
        url: config.apiOrigin + '/bucket',
        dataSrc: 'data',
        headers: {'Authorization': 'Token token=' + store.user.authNToken}
      },
      edit: {
        type: 'PUT',
        url: config.apiOrigin + '/bucket/_id_',
        dataSrc: 'data',
        headers: {'Authorization': 'Token token=' + store.user.authNToken}
      },
      remove: {
        type: 'DELETE',
        url: config.apiOrigin + '/bucket/_id_',
        dataSrc: 'data',
        headers: {'Authorization': 'Token token=' + store.user.authNToken}
      }
    },
    fields: [
      {label: 'Description:', name: 'description'},
      {type: 'select',
        label: 'Category:',
        name: 'category',
        options: [{ label: 'Achievement', value: 'Achievement' },
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
  }
}

const mainTableParameters = function (editor) {
  return {
    ajax: {
      url: config.apiOrigin + '/bucket',
      headers: {'Authorization': 'Token token=' + store.user.authNToken}
    },
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
  }
}

module.exports = {
  editorConfigurationParameters,
  mainTableParameters
}
