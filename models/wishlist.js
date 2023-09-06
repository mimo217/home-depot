const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const itemSchema = require('./itemSchema')
const subItemSchema = require('./subItemSchema')

const lineItemSchema = new Schema({
    item: itemSchema,
    subItem: subItemSchema,
})

const wishlistSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [lineItemSchema],
})

wishlistSchema.statics.getWishlist = async function (userId) {
    return this.findOneAndUpdate(
        { user: userId },
        { upsert: true, new: true }
)}

wishlistSchema.methods.addItemToWishlist = async function (itemId, subItemId) {
    const wishlist = this
    const lineItem = wishlist.items.find((item) =>
        item.subItem._id.equals(subItemId)
    )

    if (!lineItem) {
        const item = await mongoose.model('Item').findById(itemId)
        const subItem = await mongoose.model('SubItem').findById(subItemId)

        wishlist.items.push({ item: item, subItem: subItem })
        return wishlist.save()
    }
}

module.exports = mongoose.model('Wishlist', wishlistSchema)
