const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/Blog')
const User = require('../models/User')

const api = supertest(app)

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    }
]

const initialUsers = [
    {
        username: "mvirt",
        name: "Matti Virtanen"
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
    await User.deleteMany({})
    await User.insertMany(initialUsers)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there is correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(3)
})

test('blogs have id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('added blog shows up in blog list', async () => {
    const users = await User.find({})
    await api.post('/api/blogs')
        .send({
            title: "Foo bar",
            author: "Baz",
            url: "http://www.google.com/",
            userId: users[0]._id,
            likes: 1
        })
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(4)
    expect(response.body[3].title).toContain('Foo bar')
    expect(response.body[3].user.name).toContain('Matti Virtanen')

    const user = await User.findById(users[0]._id)
    expect(user.blogs[0].id.toString('hex')).toEqual(response.body[3].id)
})

test('a blog can be deleted', async () => {
    const originalResponse = await api.get('/api/blogs')
    const id = originalResponse.body[0].id
    await api.delete(`/api/blogs/${id}`).expect(204)
    const response = await api.get('/api/blogs')
    expect(response.body.map( blog => blog.title)).not.toContainEqual('React patterns')
    expect(response.body.length).toBe(2)
})

afterAll(() => {
    mongoose.connection.close()
})