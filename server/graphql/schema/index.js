const { buildSchema } = require('graphql')

module.exports = buildSchema(`
type User {
    _id: ID!
    email: String!
    login: String!
    password: String!
    name: String
    lastName: String
    createdAt: String!
    updatedAt: String!
    friends: [User!]!
}

type RootQuery {
    users: [User!]!
    friends: [User!]!
}

input UserInput {
    email: String!
    login: String!
    password: String!
    name: String
    lastName: String
}

type RootMutation {
    createUser(userInput: UserInput): User
    addUserToFriendList(userId: ID!): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)
