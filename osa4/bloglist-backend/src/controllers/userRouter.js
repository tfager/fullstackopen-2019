const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash: passwordHash,
        })

        const savedUser = await user.save()

        response.status(201).json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

usersRouter.get('/', async (request, response, next) => {
    try {
        const result = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1})
        return response.json(result)
    } catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter