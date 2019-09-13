require('dotenv').config()

let MONGODB_URI = 'mongodb://localhost/bloglist'
let PORT = 3003

if (process.env.NODE_ENV === 'test') {
    MONGODB_URI = 'mongodb://localhost/bloglisttest'
}

module.exports = {
    MONGODB_URI,
    PORT
}