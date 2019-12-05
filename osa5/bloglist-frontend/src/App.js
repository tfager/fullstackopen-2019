import React, { useState, useEffect } from 'react'
import './App.css'
import blogService from './services/blogs'
import Blog from './components/Blog'
import loginService from './services/login'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useField } from './hooks/useField'

function App() {
    const LOCAL_STORAGE_USER_KEY = 'loggedInBloglistUser'
    const [blogs, setBlogs] = useState([])
    const username = useField('text')
    const password = useField('text')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem(LOCAL_STORAGE_USER_KEY)
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            //noteService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        blogService
            .getAll().then(bs => {
            setBlogs(bs)
        })
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            console.log("Username: "+ username)
            const user = await loginService.login({
                'username': username.value,
                'password': password.value
            })

            setUser(user)
            window.localStorage.setItem(
                LOCAL_STORAGE_USER_KEY, JSON.stringify(user)
            )
            blogService.setToken(user.token)
            username.reset('')
            password.reset('')
        } catch (exception) {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = async (event) => {
        window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
        setUser(null)
    }

    const handleCreateBlog = async (event) => {
        event.preventDefault()
        const blog = {title: newTitle, author: newAuthor, url: newUrl}
        blogService.create(blog)

        blogService
            .getAll().then(bs => {
            setBlogs(bs)
        })

        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
    }

    const loginForm = () => (
        <Togglable buttonLabel="login">
            <LoginForm
                username={username}
                password={password}
                errorMessage={errorMessage}
                handleLogin={handleLogin}/>
        </Togglable>
    )

    return (
        <div className="App">
            <header className="App-header">
                <h1>Bloglist application</h1>
            </header>
            {user === null ?
                loginForm() :
                <div>
                    {user.name} logged in. <button onClick={(event) => handleLogout(event)}>Logout</button>
                </div>
            }

            <h2>Blogs</h2>

            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog}/>
            )}

            <h2>Create New Blog</h2>
            <Togglable buttonLabel="create new blog">
                <CreateBlogForm
                    newTitle={newTitle}
                    setNewTitle={setNewTitle}
                    newAuthor={newAuthor}
                    setNewAuthor={setNewAuthor}
                    newUrl={newUrl}
                    setNewUrl={setNewUrl}
                    handleCreateBlog={handleCreateBlog}/>
            </Togglable>

        </div>
    )
}

export default App
