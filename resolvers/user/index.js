import userQuery from './query'
import userMutation from './mutation'
import userType from './userType'

module.exports = {
  userModel: userType,
  Query: userQuery,
  Mutation: userMutation
}