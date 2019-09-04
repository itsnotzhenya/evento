import request from '@/helpers/request'

export default {
  state: {
    users: {},
    groups: {},
    questions: {}
  },
  mutations: {
    SET_USERS: (state, users) => {
      state.users = users
    },
    SET_QUESTIONS: (state, questions) => {
      state.questions = questions
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
    users: (state) => state.users,
    questions: (state) => state.questions
  },
  namespaced: true
}
