
const bloglistRouter = require('express').Router()
const Blog = require('../models/Blog')

bloglistRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    return response.json(blogs)
})

bloglistRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const result = await blog.save()
    return response.status(201).json(result)
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
