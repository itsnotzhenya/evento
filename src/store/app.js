import request from '@/helpers/request'

export default {
  state: {
    spheres: {},
    users: {},
    groups: {}
  },
  mutations: {
    SET_SPHERES: (state, spheres) => {
      state.spheres = spheres
    },
    SET_USERS: (state, users) => {
      state.users = users
    },
    SET_GROUPS: (state, groups) => {
      state.groups = groups
    }
  },
  actions: {
    async getEntities ({ commit }, { entityName, mutationName, params }) {
      const response = await request({
        url: `/${entityName}`,
        method: 'get',
        params
      })
      commit(mutationName, response.data)
    },
    async deleteItem (_, { entityName, id }) {
      await request({
        url: `/${entityName}/${id}`,
        method: 'delete'
      })
    },
    async getItem (_, { entityName, id }) {
      const response = await request({
        url: `/${entityName}/${id}`,
        method: 'get'
      })
      return response
    },
    async saveEntity (_, { entityName, data, method, id }) {
      const url = id ? `/${entityName}/${id}` : `/${entityName}`
      await request({
        url,
        method,
        data
      })
    }
  },
  getters: {
    spheres: (state) => state.spheres.items,
    users: (state) => state.users,
    groups: (state) => state.groups
  },
  namespaced: true
}
