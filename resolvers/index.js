import { mergeResolvers } from '@graphql-tools/merge'

import userResolver from './user/index'
import postResolver from './post/index'
import commentResolver from './comment/index'

const resolvers = [
  userResolver,
  postResolver,
  commentResolver
]

module.exports = mergeResolvers(resolvers)