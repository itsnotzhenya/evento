import UserGroupsCRUD from './crud/index'
import UserGroupsTable from './table/view'

export default [
  {
    path: '/user_groups',
    component: UserGroupsTable,
    name: 'UserGroups.list',
    meta: {
      action: 'list'
    }
  },
  {
    path: '/user_groups/:id/show',
    component: UserGroupsCRUD,
    name: 'UserGroups.info',
    meta: {
      action: 'read'
    }
  },
  {
    path: '/user_groups/:id/edit',
    component: UserGroupsCRUD,
    name: 'UserGroups.edit',
    meta: {
      action: 'edit'
    }
  },
  {
    path: '/user_groups/create',
    component: UserGroupsCRUD,
    name: 'UserGroups.create',
    meta: {
      action: 'create'
    }
  }
]
