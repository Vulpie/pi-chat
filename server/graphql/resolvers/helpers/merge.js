const { dateToString } = require('../../../helpers/date')
const User = require('../../../models/User')

const mergeUsers = async (userIds) => {
	try {
		const friends = await User.find({ _id: { $in: userIds } })
		return friends.map((friend) => {
			return userParser(friend)
		})
	} catch (error) {
		throw error
	}
}

const userParser = (user) => {
	try {
		return {
			...user._doc,
			_id: user.id,
			password: null,
			createdAt: dateToString(user._doc.createdAt),
			updatedAt: dateToString(user._doc.updatedAt),
			friends: mergeUsers.bind(this, user._doc.friends),
		}
	} catch (error) {
		throw error
	}
}

module.exports = userParser
