import Home from './Pages/Home'
import AddBlog from './Pages/AddBlog'
import BlogDetails from './Pages/BlogDetails'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom'
import Login  from './Pages/Login'
import Register from './Pages/Register'
import Logout from './Pages/Logout'
import Layout from './Components/Layouts/Layout'
import PrivateRoute from './Components/PrivateRoute'
// import Navbar from './Components/Navbar'
import TagBlogList from './Pages/TagBlogList';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout/>}>
          <Route element={<PrivateRoute/>}>
            <Route path='/add' element={<AddBlog />} />
            <Route path='/logout' element={<Logout />} />
          </Route>
          <Route path='/:slug' element={<BlogDetails />} />
          <Route path='/' element={<Home />} />
          <Route path='/tag/:tag_name' element={<TagBlogList />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
      </Route>

    )
  )
  return (
    <> 
      <RouterProvider router={router} />
    </>
  )
}
export default App
