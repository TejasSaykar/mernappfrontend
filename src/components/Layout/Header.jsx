import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { GiShoppingBag } from 'react-icons/gi';
import { useAuth } from '../../Context/AuthContext';
import toast from 'react-hot-toast'
import { Dropdown } from 'react-bootstrap';
import { useMode } from '../../Context/darkMode';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../Context/CartContext';
import { Badge, Modal } from 'antd';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const { mode, toggleMode } = useMode();
  const categories = useCategory();
  const [cart] = useCart();
  const [showSerch, setShowSearch] = useState(false);

  // console.log(categories)


  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    });
    localStorage.removeItem('auth');
    toast.success("Logout Successfuly")

  }
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container-fluid'>
          <Link to={'/'} className='navbar-brand' style={{ color: "rgb(235, 26, 61)" }}>
            <GiShoppingBag size={'25px'} className='mb-2' /> SayComm
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className='navbar-toggler-icon' />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              {/* <button className='btn btn-outline-danger w-25' onClick={() => setShowSearch(true)}>Search</button>
              <Modal className='p-3' onCancel={() => setShowSearch(false)} footer={null} open={showSerch}> */}
                <SearchInput setShow={setShowSearch} />
              {/* </Modal> */}
              <li className='nav-item' >
                <NavLink className='nav-link ml-3' to="/" aria-current="page">Home</NavLink>
              </li>
              <Dropdown>
                <Dropdown.Toggle variant='inherit' style={{ fontWeight: "500", fontSize: "20px" }}>Categories</Dropdown.Toggle>
                <Dropdown.Menu>
                  <li>
                    {
                      categories?.map(c => (
                        <Link key={c._id} className='dropdown-item' to={`/category/${c.slug}`}>{c.name}</Link>
                      ))
                    }
                  </li>
                </Dropdown.Menu>
              </Dropdown>
              {
                !auth.user ? (
                  <>
                    <li className='nav-item'>
                      <NavLink className='nav-link' to="/register">Register</NavLink>
                    </li>

                    <li className='nav-item'>
                      <NavLink className='nav-link' to="/login">Login</NavLink>
                    </li>

                  </>
                ) : (
                  <>

                    <Dropdown>
                      <Dropdown.Toggle style={{ fontWeight: "500", fontSize: "20px" }} variant='inherit' id="dropdown-basic">
                        {auth?.user?.name}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <li>
                          <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">DashBoard</NavLink>
                        </li>
                        <li>
                          <NavLink className='dropdown-item' onClick={handleLogout} to="/login">Logout</NavLink>
                        </li>
                      </Dropdown.Menu>
                    </Dropdown>

                  </>
                )
              }
              <li className='nav-item'>
                <Badge count={cart?.length} showZero>
                  <NavLink className='nav-link mt-1' style={{ fontSize: "20px" }} to="/cart">Cart</NavLink>
                </Badge>
              </li>

              {/* <li className='nav-item'>
                <div className='mode mt-2 ml-2' style={{backgroundColor : mode === 'light' ? "black" : "grey"}} onClick={toggleMode}></div>
              </li> */}

            </ul>
          </div>
        </div>
      </nav>

      
    </>
  )
}

export default Header
