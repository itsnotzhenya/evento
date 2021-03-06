import UserCRUD from './crud/index'
import UserTable from './table/view'

export default [
  {
    path: '/users',
    component: UserTable,
    name: 'Users.list',
    meta: {
      action: 'list',
      role: 'ROLE_ADMIN'
    }
  },
  {
    path: '/users/:id/show',
    component: UserCRUD,
    name: 'Users.info',
    meta: {
      action: 'read',
      role: 'ROLE_ADMIN'
    }
  },
  {
    path: '/users/:id/edit',
    component: UserCRUD,
    name: 'Users.edit',
    meta: {
      action: 'edit',
      role: 'ROLE_ADMIN'
    }
  },
  {
    path: '/users/create',
    component: UserCRUD,
    name: 'Users.create',
    meta: {
      action: 'create',
      role: 'ROLE_ADMIN'
    }
  }
]
