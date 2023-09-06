const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app-server')
const server = app.listen(8010, () => console.log(`8010 CATEGORY TEST`))
const Department = require('../models/department')
const Category = require('../models/category')
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

describe('Test the category endpoints', () => {
    test('It should display all categories', async () => {
        const hardware = new Department({ name: 'hardware' })
        await hardware.save()
        const bathroom = new Department({ name: 'bathroom' })
        await bathroom.save()
        const kitchen = new Department({ name: 'kitchen' })
        await kitchen.save()
        const response = await request(app)
            .get(`api/departments/`)
        expect(response.statusCode).toBe(200)
        expect.objectContaining(hardware)
        expect.objectContaining(bathroom)
        expect.objectContaining(kitchen)
    })
    test('It should display all categories in a department', async () => {
        const department = new Department({ name: 'hardware' })
        await department.save()
        const buckets = new Category({ name: 'buckets', department: department._id })
        await buckets.save()
        const hammers = new Category({ name: 'hammers', department: department._id})
        await hammers.save()
        const response = await request(app)
            .get(`api/categories/${department._id}`)
        expect(response.statusCode).toBe(200)
        expect.objectContaining(buckets)
        expect.objectContaining(hammers)
    })
})