import React, { useEffect } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from '../context/cauth';
import SearchInput from '../Forms/SearchInput';
import useCategory from '../../hooks/useCategory'
import { useCart } from '../context/cart';
import { FiWatch } from "react-icons/fi";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const {cart,setCart} = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth, user: null, token: "",
    })
    localStorage.removeItem("auth");
  };

  return (
    <>
      <nav className="navbar navbar-dark  navbar-expand-lg" style={{ backgroundColor: "black" }}>
        <div className="container-fluid">
          <Link to='/' className="navbar-brand" ><FiWatch className='fs-2 ms-2'/> WatchWonderz</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <SearchInput />
              <li className="nav-item">
                <NavLink to='/' className="nav-link" aria-current="page">Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id}>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <div>

              {!auth?.user ? (
                <div className='d-flex'>
                  <li className="nav-item navbar-nav">
                    <NavLink className="nav-link" to='/cart'><FaShoppingCart /><sup>({cart?.length})</sup></NavLink>
                  </li>
                  <Link to='/register'><button type="button" className="btn btn-info mx-1">Register</button></Link>
                  <Link to='/login'><button type="button" className="btn btn-info mx-1">Login</button></Link>
                </div>) :
                (
                  <div className='d-flex'>
                    <li className="nav-item dropdown navbar-nav" >
                      <Link className="nav-link dropdown-toggle text-capitalize" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {auth?.user?.name}
                      </Link>
                      <ul className="dropdown-menu">
                        <li><Link to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">Dashboard</Link></li>
                        <li><Link to='/login' className="dropdown-item" onClick={handleLogout}>Logout</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item navbar-nav">
                      <NavLink className="nav-link ms-2" to='/cart'><FaShoppingCart /><sup>({cart?.length})</sup></NavLink>
                    </li>
                  </div>
                )}
            </div>
          </div>
        </div>
      </nav >
    </>
  )
}

export default Navbar
