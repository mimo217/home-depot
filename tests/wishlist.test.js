const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app-server')
const server = app.listen(8070, () => console.log(`8070 WISHLIST TEST`))
const Department = require('../models/department')
const Wishlist = require('../models/wishlist')
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})







// Add items to wishlist
// Remove items from wishlist

