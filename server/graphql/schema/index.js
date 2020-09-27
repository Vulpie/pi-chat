const { buildSchema } = require('graphql')

module.exports = buildSchema(`
type Team {
    _id: ID!
    name: String!
    description: String
    leader: User!
    members: [User!]!
}

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
    teams: [Team!]!
}

input UserInput {
    email: String!
    login: String!
    password: String!
    name: String
    lastName: String
}

input TeamInput {
    name: String!
    description: String
}

type RootQuery {
    users: [User!]!
    friends: [User!]!
    teams: [Team!]!
}

type RootMutation {
    createUser(userInput: UserInput): User
    addUserToFriendList(userId: ID!): User
    createTeam(teamInput: TeamInput): Team
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)
