const Wishlist = require('../../models/wishlist')
const Item = require('../../models/item')

module.exports = {
    getWishlist,
    addItemToWishlist,
    removeItemFromWishlist,
    deleteWishlist
}


async function getWishlist(req, res) {
    try {
        const userId = req.params.userId
        const wishlist = await Wishlist.findOne({ user: userId }).populate('items.item')

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' })
        }

        res.status(200).json(wishlist);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


async function addItemToWishlist(req, res) {
    try {
        const { wishlistId, itemId, subItemId } = req.body

        const item = await Item.findById(itemId)
        const subItem = await SubItem.findById(subItemId)

        if (!item || !subItem) {
            return res.status(404).json({ error: 'Item or SubItem not found' })
        }

        const wishlist = await Wishlist.findById(wishlistId)
        wishlist.items.push({ item: itemId, subItem: subItemId })
        await wishlist.save()
        res.status(200).json(wishlist)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


async function removeItemFromWishlist(req, res) {
    try {
        const { wishlistId, itemId, subItemId } = req.body

        const wishlist = await Wishlist.findById(wishlistId)
        const indexToRemove = wishlist.items.findIndex((item) =>
            item.item.equals(itemId) && item.subItem.equals(subItemId)
        )

        if (indexToRemove === -1) {
            return res.status(404).json({ error: 'Item not found in the wishlist' })
        }

        wishlist.items.splice(indexToRemove, 1)
        await wishlist.save()
        res.status(200).json(wishlist)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


async function deleteWishlist(req, res) {
    try {
        const { wishlistId } = req.body
        await Wishlist.findByIdAndDelete(wishlistId)
        res.status(200).json({ message: 'Wishlist deleted' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
