// import router from './router'
// import store from './store'
// import { getToken } from '@/helpers/auth'
// import { Message } from 'element-ui'

// function hasPermission (roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) return true
//   if (!permissionRoles) return true
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

// const whiteList = ['/login']

// router.beforeEach((to, _, next) => {
//   if (getToken()) {
//     if (to.path === '/login') {
//       next({ path: '/' })
//     } else {
//       if (store.getters['users/roles'].length === 0) {
//         store
//           .dispatch('users/GetUserInfo')
//           .then(() => {
//             next({ ...to })
//           })
//           .catch(err => {
//             next('/login')
//             if (
//               err.response &&
//               (err.response.status === 403 || err.response.status === 401)
//             ) {
//               Message.error('Отказано в доступе')
//             }
//             throw err
//           })
//       } else {
//         if (hasPermission(store.getters['users/roles'], to.meta.role)) {
//           next()
//         }
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
//       if (to.path !== '/registration') {
//         next('/login')
//       } else {
//         next('/registration')
//       }
//     }
//   }
// })
