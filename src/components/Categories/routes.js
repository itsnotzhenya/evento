import CategoryCRUD from './CRUD'
import CategoryTable from './table'

export default [
  {
    path: '/users',
    component: CategoryTable,
    name: 'Users.list',
    meta: {
      action: 'list',
      role: 'ROLE_ADMIN'
    }
  },
  {
    path: '/users/:id/show',
    component: CategoryCRUD,
    name: 'Users.info',
    meta: {
      action: 'read',
      role: 'ROLE_ADMIN'
    }
  },
  {
    path: '/users/:id/edit',
    component: CategoryCRUD,
    name: 'Users.edit',
    meta: {
      action: 'edit',
      role: 'ROLE_ADMIN'
    }
  },
  {
    path: '/users/create',
    component: CategoryCRUD,
    name: 'Users.create',
    meta: {
      action: 'create',
      role: 'ROLE_ADMIN'
    }
  }
]
