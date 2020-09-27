const { graphqlHTTP } = require('express-graphql')
const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')

const express = require('express')
require('./db/mongoose')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
	'/graphql',
	graphqlHTTP({
		schema: graphQlSchema,
		rootValue: graphQlResolvers,
		graphiql: true,
	})
)

module.exports = app
