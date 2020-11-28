module.exports =`
type commentModel {
  id: ID!
  post: postModel
  author: userModel
  text: String!
  date: String!
  parent: String!
  answers: [commentModel]
}
type Query {
  getComments: [commentModel]!
  getComment(id: ID!): commentModel!
}
type Mutation {
  addComment(
    author: String!,
    post: String!, 
    text: String!, 
    date: String!
    parent: String!): commentModel,
  addAnswer(
    author: String!,
    post: String!,
    text: String!,
    date: String!,
    parent: String!): commentModel,
  deleteComment(id: ID! userId: ID!): commentModel
  updateComment(id: ID!, userId: ID!, text: String!):commentModel
}`