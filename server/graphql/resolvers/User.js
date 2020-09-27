const bcrypt = require('bcryptjs')

const User = require('../../models/User')
const userParser = require('./helpers/merge')

module.exports = {
	users: async () => {
		try {
			const userList = await User.find()
			return userList.map((user) => {
				return userParser(user)
			})
		} catch (error) {
			throw error
		}
	},
	createUser: async (args) => {
		try {
			const existingUser = await User.findOne({
				email: args.userInput.email,
			})
			if (existingUser) {
				throw new Error('User already exists')
			}
			const hashedPassword = await bcrypt.hash(
				args.userInput.password,
				10
			)

			const user = new User({
				...args.userInput,
				password: hashedPassword,
			})
			const result = await user.save()
			return userParser(result)
		} catch (error) {
			throw error
		}
	},
}
