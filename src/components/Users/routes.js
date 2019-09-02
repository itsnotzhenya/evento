import UserCRUD from './crud/index'
import UserTable from './table/view'

export default [
  {
    path: '/users',
    component: UserTable,
    name: 'Users.list',
    meta: {
      action: 'list'
    }
  },
  {
    path: '/users/:id',
    component: UserCRUD,
    name: 'Users.read',
    meta: {
      action: 'read'
    }
  },
  {
    path: '/users/:id/edit',
    component: UserCRUD,
    name: 'Users.edit',
    meta: {
      action: 'edit'
    }
  }
]
