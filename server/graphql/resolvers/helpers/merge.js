const { dateToString } = require('../../../helpers/date')
const User = require('../../../models/User')
const Team = require('../../../models/Team')

const CURRENT_USER_ID = '5f70f6dadaf50123586db396'

const mergeTeams = async (teamIds) => {
	try {
		const teams = await Team.find({ _id: { $in: teamIds } })
		return teams.map((team) => {
			return teamParser(team)
		})
	} catch (error) {
		throw error
	}
}

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

const mergeSingleUser = async (userId) => {
	try {
		const user = await User.findById(userId)
		return userParser(user)
	} catch (error) {
		throw error
	}
}

const teamParser = (team) => {
	try {
		return {
			...team._doc,
			leader: mergeSingleUser.bind(this, team._doc.leader),
			members: mergeUsers.bind(this, team._doc.members),
			createdAt: dateToString(team._doc.createdAt),
			updatedAt: dateToString(team._doc.updatedAt),
		}
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
			teams: mergeTeams.bind(this, user._doc.teams),
		}
	} catch (error) {
		throw error
	}
}

module.exports = { userParser, teamParser, CURRENT_USER_ID }
