import { postFile } from '../../api/queries'

export default {
  async postFile (context, data) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await postFile(data)
        response = response.data
        resolve(response)
      } catch (e) {
        if (e.response && e.response.status === 401) {
          await context.dispatch('resetTokens')
        } else {
          return reject(e)
        }
      }
    })
  }
}
