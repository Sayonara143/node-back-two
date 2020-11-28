module.exports = `
type postModel {
  id: ID!
  author: userModel!
  title: String!
  text: String!
  date: String!
  comments: [commentModel]
}
type Query {
  getPosts: [postModel]!
  getPost(id: ID!): postModel!
}
type Mutation {
  addPost(author: String!, title: String!, text: String!, date: String!): postModel
  deletePost(id: ID!, userId: ID! ): postModel
  updatePost(id:ID!, userId: ID!, title: String, text: String): postModel
}`