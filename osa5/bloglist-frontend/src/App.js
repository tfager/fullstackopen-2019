import React, {useState, useEffect} from 'react';
import './App.css';
import blogService from './services/blogs'
import Blog from './components/Blog'
import loginService from './services/login'
import CreateBlogForm from './components/CreateBlogForm'

function App() {
    const LOCAL_STORAGE_USER_KEY = 'loggedInBloglistUser'
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
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
            const user = await loginService.login({
                username, password
            })

            setUser(user)
            window.localStorage.setItem(
                LOCAL_STORAGE_USER_KEY, JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
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
        const blog = { title: newTitle, author: newAuthor, url: newUrl }
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
        <div id="loginForm">
            <h2>Log in</h2>
            { errorMessage }
            <form onSubmit={handleLogin}>
                <div>
                    Username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    Password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )

    if (user === null) {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Bloglist application</h1>
                </header>
                { loginForm() }
            </div>
        )
    }
    return (
        <div className="App">
            <header className="App-header">
                <h1>Bloglist application</h1>
            </header>
            <div>
            { user.name } logged in. <button onClick={(event) => handleLogout(event)}>Logout</button>
            </div>

            <h2>Blogs</h2>

            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}

            <h2>Create New Blog</h2>
            <CreateBlogForm
                newTitle={newTitle}
                setNewTitle={setNewTitle}
                newAuthor={newAuthor}
                setNewAuthor={setNewAuthor}
                newUrl={newUrl}
                setNewUrl={setNewUrl}
                handleCreateBlog={handleCreateBlog} />

        </div>
    );
}

export default App;
