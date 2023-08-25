import { Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import PageNotFound from './pages/PageNotFound'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Dashboard from './pages/User/Dashboard'
import PrivateRoute from './components/Routes/Private'
import ForgotPass from './pages/Auth/ForgotPass'
import AdminRoute from './components/Routes/AdminRoute'
import AdminDash from './pages/Admin/AdminDash'
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProduct from './pages/Admin/CreateProduct'
import Users from './pages/Admin/Users'
import Profile from './pages/User/Profile'
import Orders from './pages/User/Orders'
import Products from './pages/Admin/Products'
import UpdateProduct from './pages/Admin/UpdateProduct'
import Search from './pages/Search'
import ProductDetails from './pages/ProductDetails'
import CategoryProduct from './pages/CategoryProduct'
import CartPage from './pages/CartPage'
import AdminOrders from './pages/Admin/AdminOrders'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/search' element={<Search />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />
        <Route path='/cart' element={<CartPage />} />
        
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/orders' element={<Orders />} />
          
        </Route>

        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path="admin" element={<AdminDash />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgotpass' element={<ForgotPass />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
