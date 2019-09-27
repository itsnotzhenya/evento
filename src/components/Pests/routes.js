import PestCRUD from './CRUD'
import PestTable from './table'

export default [
  {
    path: '/pests',
    component: PestTable,
    name: 'Pests.list',
    meta: {
      action: 'list'
    }
  },
  {
    path: '/pests/:id/show',
    component: PestCRUD,
    name: 'Pests.info',
    meta: {
      action: 'read'
    }
  },
  {
    path: '/pests/:id/edit',
    component: PestCRUD,
    name: 'Pests.edit',
    meta: {
      action: 'edit'
    }
  },
  {
    path: '/pests/create',
    component: PestCRUD,
    name: 'Pests.create',
    meta: {
      action: 'create'
    }
  }
]
