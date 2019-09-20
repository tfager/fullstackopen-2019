const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/User')

const api = supertest(app)

const initialUsers = [
    {
        username: "mvirt",
        name: "Matti Virtanen"
    },
    {
        username: "kkorh",
        name: "Kalle Korhonen",
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    try {
        await User.insertMany(initialUsers)
    } catch (exception) {
        console.log(exception)
    }
})

test('users are returned as json', async () => {
    await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there is correct amount of users', async () => {
    const response = await api.get('/api/users')

    expect(response.body.length).toBe(2)
})


test('users have id', async () => {
    const response = await api.get('/api/users')
    expect(response.body[0].id).toBeDefined()
})

test('added user shows up in user list', async () => {
    await api.post('/api/users')
        .send({
            username: "villev",
            name: "Ville Vallaton",
            password: "vallaton1"
        })
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    expect(response.body.length).toBe(3)
    expect(response.body[2].name).toContain('Ville Vallaton')
})

test('can not add same user again', async () => {
    await api.post('/api/users')
        .send({
            username: "villev",
            name: "Ville Vallaton",
            password: "vallaton1"
        })
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const response = await api.post('/api/users')
        .send({
            username: "villev",
            name: "Ville Vallaton",
            password: "vallaton1"
        })
        .expect(500)

})


afterAll(() => {
    mongoose.connection.close()
})