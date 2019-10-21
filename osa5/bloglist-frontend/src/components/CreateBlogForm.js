import React from 'react'

const CreateBlogForm = ({ newTitle, setNewTitle, newAuthor, setNewAuthor, newUrl, setNewUrl, handleCreateBlog }) => {
    const handleChangeTitle = (event) => {
        setNewTitle(event.target.value)
    }
    const handleChangeAuthor = (event) => {
        setNewAuthor(event.target.value)
    }
    const handleChangeUrl = (event) => {
        setNewUrl(event.target.value)
    }

    return (
        <form>
            <table border="0">
                <tbody>
                    <tr>
                        <td>Title:</td>
                        <td><input value={ newTitle } onChange={ handleChangeTitle } /></td>
                    </tr>
                    <tr>
                        <td>Author:</td>
                        <td><input value={ newAuthor } onChange={ handleChangeAuthor }  /></td>
                    </tr>
                    <tr>
                        <td>URL:</td>
                        <td><input value={ newUrl } onChange={ handleChangeUrl }  /></td>
                    </tr>
                <tr>
                    <td colSpan="2">
                        <button type="submit" onClick={ handleCreateBlog } >Create</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    )
}

export default CreateBlogForm