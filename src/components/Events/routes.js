import EventCRUD from './crud/index'
import EventTable from './table/view'

export default [
  {
    path: '/events',
    component: EventTable,
    name: 'Events.list',
    meta: {
      action: 'list',
      role: 'ROLE_ADMIN'
    }
  },
  {
    path: '/events/:id/show',
    component: EventCRUD,
    name: 'Events.info',
    meta: {
      action: 'read',
      role: 'ROLE_ADMIN'
    }
  },
  {
    path: '/events/:id/edit',
    component: EventCRUD,
    name: 'Events.edit',
    meta: {
      action: 'edit',
      role: 'ROLE_ADMIN'
    }
  },
  {
    path: '/events/create',
    component: EventCRUD,
    name: 'Events.create',
    meta: {
      action: 'create',
      role: 'ROLE_ADMIN'
    }
  }
]
