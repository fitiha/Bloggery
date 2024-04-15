// import './firebaseConfig.js';
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
import VisualBlogs from "./pages/admin/BlogsPie"
import Footer from "./components/Footer"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import GettingStarted from "./pages/GettingStarted"
import EditProfile from "./pages/EditProfile"
import ChangePassword from "./pages/ChangePassword"
import SetNewPassword from "./pages/SetNewPassword"
import ChatBot from "./pages/ChatBot"
import BloggerDetails from "./pages/BloggerDetails"


const App = () => {
  return (<>

    <NavBar />

    <ToastContainer />
    <Routes>
      <Route path="/" element={<GettingStarted />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login userType="user" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path='/change-password' element={<ChangePassword />} />
      <Route path='/set-new-password' element={<SetNewPassword />} />
      <Route path="/create" element={<CreateBlog />} />
      <Route path="/profile" element={<Profile userType="user" />} />
      <Route path="/blogger/:id" element={<BloggerDetails />} />
      <Route path="/detail/:id" element={<BlogDetail />} />
      <Route path="/edit/:id" element={<EditBlog />} />

      {/* Admin Routes */}
      <Route path='/admin/*' element={<Admin />}>
        <Route path="login" element={<Login userType="admin" />} />
        <Route path="profile" element={<Profile userType="admin" />} />
        <Route path='users' element={<ManageUsers />} />
        <Route path="blogs" element={<ManageBlogs />} />
        <Route path="visual-blogs" element={<VisualBlogs />} />
      </Route>
    </Routes>
    <ChatBot />
    <Footer />
  </>
  )
}

export default App