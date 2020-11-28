module.exports = `
type userModel {
  id: ID!
  name: String!
  surname: String!
  email: String!
  path: String!
  posts: [postModel]
  comments: [commentModel]
}
type Query {
  getUsers: [userModel]
  getUser(id: ID!): userModel!
}
type Mutation {
  addUser(
    name: String!,
    surname: String!,
    email: String!,
    path: String
    file: Upload!): userModel
  deleteUser(id: ID!, userId: ID!): userModel
  updateUser(
    id: ID!,
    userId: ID!,
    name: String,
    surname: String,
    email: String,
    path: String
    file: Upload): userModel
}`