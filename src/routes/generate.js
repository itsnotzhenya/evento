export default ({ moduleName, path, ListComponent, CRUDComponent, parentModule }) => ([
  {
    path: `/${path}/:id/show`,
    component: CRUDComponent,
    name: `${moduleName}.info`,
    meta: {
      disabled: true,
      action: 'read',
      parentModule
    }
  },
  {
    path: `/${path}/:id/edit`,
    component: CRUDComponent,
    name: `${moduleName}.edit`,
    meta: {
      disabled: false,
      action: 'edit',
      parentModule
    }
  },
  {
    path: `/${path}/create`,
    component: CRUDComponent,
    name: `${moduleName}.create`,
    meta: {
      disabled: false,
      action: 'create',
      parentModule
    }
  },
  {
    path: `/${path}`,
    component: ListComponent,
    name: `${moduleName}.list`,
    meta: {
      parentModule,
      action: 'list'
    }
  }
])
