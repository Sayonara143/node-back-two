import { userModel } from '../../models/userModel'
import { postModel } from '../../models/postModel'
import { commentModel } from '../../models/commentModel'
import DataLoader from 'dataloader'
import commentType from './commentType'
import commentMutation from './mutation'
import commentQuery from './query'

module.exports = {
  commentModel: commentType,
  Query: commentQuery,
  Mutation: commentMutation
}