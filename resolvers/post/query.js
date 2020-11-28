import { postModel } from '../../models/postModel'

module.exports = {
  getPosts: async () => {
    try {
      return await postModel.find({})
    } catch(e) {
      return e.message
    }
  },
  getPost: async (_, {id}) => {
    try {
      return await postModel.findById(id)
    } catch(e) {
      return e.message
    }
  }
}