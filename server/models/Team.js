const mongoose = require('mongoose')

const Schema = mongoose.Schema

const teamSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		leader: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		members: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Team', teamSchema)
