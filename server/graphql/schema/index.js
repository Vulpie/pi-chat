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
}

type RootQuery {
    users: [User!]!
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
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)
