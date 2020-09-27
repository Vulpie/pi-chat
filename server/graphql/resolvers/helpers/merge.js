const { dateToString } = require('../../../helpers/date')

const userParser = (user) => {
	try {
		return {
			...user._doc,
			_id: user.id,
			password: null,
			createdAt: dateToString(user._doc.createdAt),
			updatedAt: dateToString(user._doc.updatedAt),
		}
	} catch (error) {
		throw error
	}
}

module.exports = userParser
