import ResultTable from './table.vue'

export default [
  {
    path: '/predictions_results',
    component: ResultTable,
    name: 'Results.list',
    meta: {
      action: 'list'
    }
  }
]
