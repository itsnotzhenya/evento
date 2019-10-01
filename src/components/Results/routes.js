import ResultCRUD from './CRUD'
import ResultList from './table'

export default [
  {
    path: '/predictions_results',
    component: ResultList,
    name: 'Results.list',
    meta: {
      action: 'list'
    }
  },
  {
    path: '/requests',
    component: ResultList,
    name: 'Request.list',
    meta: {
      action: 'list'
    }
  },
  {
    path: '/predictions_results/:id/show',
    component: ResultCRUD,
    name: 'Results.info',
    meta: {
      action: 'read'
    }
  },
  {
    path: '/requests/:id/show',
    component: ResultCRUD,
    name: 'Request.info',
    meta: {
      action: 'read'
    }
  },
  {
    path: '/predictions_results/:id/edit',
    component: ResultCRUD,
    name: 'Results.edit',
    meta: {
      action: 'edit'
    }
  },
  {
    path: '/requests/:id/edit',
    component: ResultCRUD,
    name: 'Request.edit',
    meta: {
      action: 'edit'
    }
  }
]
