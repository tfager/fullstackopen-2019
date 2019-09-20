
const bloglistRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

bloglistRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
    return response.json(blogs)
})

bloglistRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
        const user = await User.findById(body.userId)

        const blog = new Blog({...request.body, user: user._id})
        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        return response.status(201).json(savedBlog)
    } catch (exception) {
        next(exception)
    }
})

bloglistRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
})

module.exports = bloglistRouter
