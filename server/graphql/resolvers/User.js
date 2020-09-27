const bcrypt = require('bcryptjs')

const User = require('../../models/User')
const userParser = require('./helpers/merge')

const CURRENT_USER_ID = '5f70aa7b2cbddb3a8442e8da'

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
	friends: async () => {
		try {
			const current_user = await User.findById(CURRENT_USER_ID)
			return current_user.friends.map((friend) => {
				return userParser(friend)
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
	addUserToFriendList: async (args) => {
		try {
			const friend = await User.findById(args.userId)
			const current_user = await User.findById(CURRENT_USER_ID)
			if (!friend) {
				throw new Error(
					"You can't add this yuser to your list of friends. User does not exist"
				)
			}
			current_user.friends.push(friend)
			await current_user.save()
			return userParser(friend)
		} catch (error) {
			throw error
		}
	},
}
