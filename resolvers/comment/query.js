import { commentModel } from '../../models/commentModel'

module.exports = {
  getComments: async () => {
    try {
      return await commentModel.find({})
    } catch(e) {
      return e.message
    }
  },
  getComment: async (_, {id}) => {
    try {
      return await commentModel.findById(id)
    } catch(e) {
      return e.message;
    }
  }
}