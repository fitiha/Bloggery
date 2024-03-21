import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CreateBlog from "./pages/CreateBlog"
import NavBar from "./components/Nav"
import Profile from "./pages/Profile"
import BlogDetail from "./pages/BlogDetail"
import EditBlog from "./pages/EditBlog"
import Admin from './pages/admin/Admin'
import ManageUsers from "./pages/admin/ManageUsers"
import ManageBlogs from "./pages/admin/ManageBlogs"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  return (<>
    <NavBar />
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create" element={<CreateBlog />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/detail/:id" element={<BlogDetail />} />
      <Route path="/edit/:id" element={<EditBlog />} />

      {/* Admin Routes */}
      <Route path='/admin/*' element={<Admin />}>
        <Route path='users' element={<ManageUsers />} />
        <Route path="blogs" element={<ManageBlogs />} />
      </Route>
    </Routes>
  </>
  )
}

export default App