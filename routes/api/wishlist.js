const express = require('express')
const router = express.Router()

const wishlistController = require('../../controllers/api/wishlist')

// Get wishlist by user ID
router.get('/:userId', wishlistController.getWishlist)

// Add an item to the wishlist
router.post('/add', wishlistController.addItemToWishlist)

// Remove an item from the wishlist
router.post('/remove', wishlistController.removeItemFromWishlist)

// Delete the entire wishlist
router.post('/delete', wishlistController.deleteWishlist)

module.exports = router
