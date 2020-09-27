const userResolver = require('./User')
const teamResolver = require('./Team')

const rootResolver = {
	...userResolver,
	...teamResolver,
}

module.exports = rootResolver
