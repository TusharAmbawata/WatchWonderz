import React from "react"
import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/Homepage"
import PageNotFound from "./pages/PageNotFound"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Dashboard from "./pages/User/Dashboard"
import PrivateRoute from "./components/Routes/PrivateRoute"
import ForgotPasssword from "./pages/Auth/ForgotPass"
import AdminRoute from "./components/Routes/AdminRoute"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import CreateCategory from "./pages/Admin/CreateCategory"
import CreateProduct from "./pages/Admin/CreateProduct"
import Users from "./pages/Admin/Users"
import Profile from "./pages/User/Profile"
import Orders from "./pages/User/Orders"
import Products from "./pages/Admin/Products"
import UpdateProduct from "./pages/Admin/UpdateProduct"
import Search from "./pages/Search"
import ProductDetails from "./pages/ProductDetails"
import Categories from "./pages/Categories"
import CategoryProduct from "./pages/CategoryProduct"
import CartPage from "./pages/CartPage"
import AdminOrders from "./pages/Admin/AdminOrders"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Policy from "./pages/Policy"


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPasssword/>} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<Products/>} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<Users/>} />
          <Route path="admin/orders" element={<AdminOrders/>} />
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About/>} />
        <Route path="/privacy" element={<Policy/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
