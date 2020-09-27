const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
		},
		login: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
		},
		lastName: {
			type: String,
		},
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		teams: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Team',
			},
		],
	},
	{ timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
