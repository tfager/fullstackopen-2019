import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(url)
    return response.data
}

const createNew = async (content) => {
    const object = { content: content, votes: 0 }
    const response = await axios.post(url, object)
    return response.data
}

const updateVotes = async (id, votes) => {
    const data = { votes: votes }
    const response = await axios.patch(url + "/" + id, data)
    return response.data
}
export default { getAll, createNew, updateVotes }