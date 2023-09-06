require('./item')
const subItemSchema = require('./subItemSchema')

const Schema = require('mongoose').Schema

const itemSchema = new Schema(
	{
		name: { type: String, required: true },
		img: String,
		category: { type: Schema.Types.ObjectId, ref: 'Category' },
		details: String,
		searchTerms: [String],
		subItems: [subItemSchema],
		featured: { type: Boolean, default: false }
	},
	{
		timestamps: true
	}
)

module.exports = itemSchema
