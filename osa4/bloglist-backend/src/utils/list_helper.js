const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, curr) => { return total + curr.likes}, 0)
}

module.exports = {
    dummy,
    totalLikes
}