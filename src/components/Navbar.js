import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  // useLocation hook ---> it gives the current location or path
  let location = useLocation();
  // useEffect hook ---> whenever tab will be reloaded, current path will be printed on the console
  // useEffect(()=>{
  //   console.log(location.pathname);
  // }, [location]);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"fw-semibold":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"fw-semibold":""}`} to="/about">About</Link>
        </li>
        
      </ul>
     {(!localStorage.getItem('token'))?
     <form className='d-flex'>
      <Link className="btn btn-primary mx-1 px-3" to="/login" role="button">Login</Link>
      <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
      </form>:
      <button className='btn btn-primary' onClick={logout}>Logout</button>}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
