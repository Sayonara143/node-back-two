//import { gql } from 'apollo-server'
import { mergeTypeDefs } from '@graphql-tools/merge'
import userType  from './userType'
import postType  from './postType'
import commentType  from './commentType'

const types = [
  userType,
  postType,
  commentType
]

module.exports = mergeTypeDefs(types)
