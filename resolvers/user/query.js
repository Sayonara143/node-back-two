import { userModel } from "../../models/userModel"

module.exports = {
  getUsers: async () => {
    try {
      return await userModel.find()
    } catch(e) {
      return e.message
    }
  },
  getUser: async (_, {id}) => {
    try {
      return await userModel.findById(id)
    } catch(e) {
      return e.message
    }
  }
}