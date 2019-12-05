import React from 'react'

const removeKey = (k, { [k]:_, ...o }) => o

const CreateBlogForm = ({ newTitle, newAuthor, newUrl, handleCreateBlog }) => {
    const newTitleField = removeKey('reset', newTitle)
    const newAuthorField = removeKey('reset', newAuthor)
    const newUrlField = removeKey('reset', newUrl)
    return (
        <form>
            <table border="0">
                <tbody>
                    <tr>
                        <td>Title:</td>
                        <td><input {...newTitleField } /></td>
                    </tr>
                    <tr>
                        <td>Author:</td>
                        <td><input {...newAuthorField } /></td>
                    </tr>
                    <tr>
                        <td>URL:</td>
                        <td><input {...newUrlField } /></td>
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