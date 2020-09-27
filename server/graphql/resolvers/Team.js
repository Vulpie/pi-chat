const Team = require('../../models/Team')
const User = require('../../models/User')

const { userParser, teamParser, CURRENT_USER_ID } = require('./helpers/merge')

module.exports = {
	createTeam: async (args) => {
		try {
			let existingTeam = await Team.findOne({ name: args.teamInput.name })
			const current_user = await User.findById(CURRENT_USER_ID)
			if (existingTeam) {
				throw new Error(`Team ${args.teamInput.name} already exists`)
			}
			const team = new Team({
				...args.teamInput,
				leader: userParser(current_user),
			})
			current_user.teams.push(team)
			team.members.push(current_user)
			await current_user.save()
			const result = await team.save()
			return teamParser(result)
		} catch (error) {
			throw error
		}
	},
}
