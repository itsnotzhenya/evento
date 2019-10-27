import { postFileQueries } from '../../api/queries'

export default {
  async postFile (_, data) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await postFileQueries(data)
        resolve(response.data)
      } catch (e) {
        return reject(e)
      }
    })
  }
}
