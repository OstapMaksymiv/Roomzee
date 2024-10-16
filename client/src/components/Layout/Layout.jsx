import React, { useEffect, useRef } from 'react'
import './layout.scss'
import Navbar from '../Navbar/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Footer/Footer'
const Layout = () => {
  const paralaxClass = useRef();
  const location  = useLocation();
  useEffect(() => {
    if (location.pathname !== '/') {
      if (paralaxClass.current) {
        paralaxClass.current.classList.add('hide-parallax');
      }
    } else {
      if (paralaxClass.current) {
        paralaxClass.current.classList.remove('hide-parallax');
      }
    }
  }, [location.pathname]);
  return (
    <div ref={paralaxClass} className='paralaxClass'>
      <div className='layout'>
          <div className='navbar'>
          <Navbar/>
          </div>
          <div className='content'>
              <Outlet/>
          </div>
      </div>
        <Footer/>
    </div>
  )
}

export default Layout