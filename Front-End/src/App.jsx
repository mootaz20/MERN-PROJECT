import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'
import Home from './Components/Home/Home'
import Post from './Components/Post/Post'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/post/:id' element={<Post />} />
      </Routes>
    </>
  )
}

export default App
