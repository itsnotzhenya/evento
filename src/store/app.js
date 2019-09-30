import request from '@/helpers/request'

export default {
  state: {
    users: {},
    categories: {},
    pests: {},
    predictions_results: {}
  },
  mutations: {
    SET_USERS: (state, users) => {
      state.users = users
    },
    SET_CATEGORIES: (state, categories) => {
      state.categories = categories
    },
    SET_PESTS: (state, pests) => {
      state.pests = pests
    },
    SET_RESULTS: (state, results) => {
      state.predictions_results = results
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
    },
    async postFile (_, data) {
      const response = await request({
        url: `/files`,
        method: 'post',
        data
      })
      return response
    }
  },
  getters: {
    users: state => state.users,
    categories: state => state.categories,
    pests: state => state.pests,
    predictions_results: state => state.predictions_results
  },
  namespaced: true
}
