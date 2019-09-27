import CategoryCRUD from './CRUD'
import CategoryList from './list'

export default [
  {
    path: '/categories',
    component: CategoryList,
    name: 'Categories.list',
    meta: {
      action: 'list'
    }
  },
  {
    path: '/categories/:id/show',
    component: CategoryCRUD,
    name: 'Categories.info',
    meta: {
      action: 'read'
    }
  },
  {
    path: '/categories/:id/edit',
    component: CategoryCRUD,
    name: 'Categories.edit',
    meta: {
      action: 'edit'
    }
  },
  {
    path: '/categories/create',
    component: CategoryCRUD,
    name: 'Categories.create',
    meta: {
      action: 'create'
    }
  },
  {
    path: '/categories/:id/create',
    component: CategoryCRUD,
    name: 'Categories.child.create',
    meta: {
      action: 'create'
    }
  }
]
