
const bloglistRouter = require('express').Router()
const Blog = require('../models/Blog')

bloglistRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

bloglistRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    console.log("Blog = ")
    console.log(blog)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = bloglistRouter
