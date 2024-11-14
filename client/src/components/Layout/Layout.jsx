import React, { useState,useEffect, useRef, useContext } from 'react'
import './layout.scss'
import Navbar from '../Navbar/Navbar'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { AuthContext } from '../../context/AuthContaxt'
const Layout = () => {
  const paralaxClass = useRef();

  const login_paralaxClass = useRef();
  const location  = useLocation();
  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/reset-password' || location.pathname === '/register') {
      if (login_paralaxClass.current) {
        paralaxClass.current.style = 'height:100vh;'
        login_paralaxClass.current.classList.remove('hide-login_parallax');
        paralaxClass.current.classList.add('hide-parallax');

      }
    }  else if(location.pathname === '/') {
      if (paralaxClass.current) {
        document.body.classList.remove('my-body-style');
        paralaxClass.current.style = 'height:100vh;'
        login_paralaxClass.current.classList.add('hide-login_parallax');
        paralaxClass.current.classList.remove('hide-parallax');

      }
    }
    else if(/^\/rooms\/[a-zA-Z0-9]+$/.test(location.pathname) || location.pathname === '/profile/update-profile'){
        document.body.classList.add('my-body-style');
        paralaxClass.current.style = 'height:100vh;'
        paralaxClass.current.classList.add('hide-parallax');
        login_paralaxClass.current.classList.add('hide-login_parallax');
    }
    else if(location.pathname === '/profile/user-posts/new-post'){
        if (paralaxClass.current) {
            document.body.classList.add('my-body-style');
            paralaxClass.current.style = 'height:100vh;'
            login_paralaxClass.current.classList.add('hide-login_parallax');
            paralaxClass.current.classList.remove('hide-parallax');
    
          }
    }
    else if(location.pathname === '/profile'){
        document.body.classList.remove('my-body-style');
        paralaxClass.current.style = 'height:auto;'
        paralaxClass.current.classList.add('hide-parallax');
        login_paralaxClass.current.classList.add('hide-login_parallax');
    }
    else{
        document.body.classList.remove('my-body-style');
        paralaxClass.current.style = 'height:100vh;'
        paralaxClass.current.classList.add('hide-parallax');
        login_paralaxClass.current.classList.add('hide-login_parallax');
    }
  }, [location.pathname]);
  return (
    <div ref={paralaxClass} className='paralaxClass'>
      <div ref={login_paralaxClass} className='login-parallax'>
          <div className='lg-parallax_piece'>
              <div className='parallax-a'>
                  <div style={{inset:'0px', opacity:"1",overflow:'hidden',position:'absolute'}}>
                      <div style={{position:'absolute', borderRadius:'inherit',inset:'0px'}}>
                          <img src="/parallax1.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
          <div className='lg-parallax_piece'>
              <div className='parallax-a'>
                  <div style={{inset:'0px', opacity:"1",overflow:'hidden',position:'absolute'}}>
                      <div style={{position:'absolute', borderRadius:'inherit',inset:'0px'}}>
                          <img src="/parallax2.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
          <div className='lg-parallax_piece'>
              <div className='parallax-a'>
                  <div style={{inset:'0px', opacity:"1",overflow:'hidden',position:'absolute'}}>
                      <div style={{position:'absolute', borderRadius:'inherit',inset:'0px'}}>
                          <img src="/parallax3.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
          <div className='lg-parallax_piece'>
              <div className='parallax-a'>
                  <div style={{inset:'0px', opacity:"1",overflow:'hidden',position:'absolute'}}>
                      <div style={{position:'absolute', borderRadius:'inherit',inset:'0px'}}>
                          <img src="/parallax4.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
          <div className='lg-parallax_piece'>
              <div className='parallax-a'>
                  <div style={{inset:'0px', opacity:"1",overflow:'hidden',position:'absolute'}}>
                      <div style={{position:'absolute', borderRadius:'inherit',inset:'0px'}}>
                          <img src="/parallax5.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
          <div className='lg-parallax_piece'>
              <div className='parallax-a'>
                  <div style={{inset:'0px', opacity:"1",overflow:'hidden',position:'absolute'}}>
                      <div style={{position:'absolute', borderRadius:'inherit',inset:'0px'}}>
                          <img src="/parallax6.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
          <div className='lg-parallax_piece'>
              <div className='parallax-a'>
                  <div style={{inset:'0px', opacity:"1",overflow:'hidden',position:'absolute'}}>
                      <div style={{position:'absolute', borderRadius:'inherit',inset:'0px'}}>
                          <img src="/parallax7.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
          <div className='lg-parallax_piece'>
              <div className='parallax-a'>
                  <div style={{inset:'0px', opacity:"1",overflow:'hidden',position:'absolute'}}>
                      <div style={{position:'absolute', borderRadius:'inherit',inset:'0px'}}>
                          <img src="/parallax8.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
          <div className='lg-parallax_piece'>
              <div className='parallax-a'>
                  <div style={{inset:'0px', opacity:"1",overflow:'hidden',position:'absolute'}}>
                      <div style={{position:'absolute', borderRadius:'inherit',inset:'0px'}}>
                          <img src="/parallax9.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
          <div className='lg-parallax_piece'>
              <div className='parallax-a'>
                  <div style={{inset:'0px', opacity:"1",overflow:'hidden',position:'absolute'}}>
                      <div style={{position:'absolute', borderRadius:'inherit',inset:'0px'}}>
                          <img src="/parallax10.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
      </div>
      
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
const RequireAuth = () => {
    const {currentUser} = useContext(AuthContext)
  const paralaxClass = useRef();
  const login_paralaxClass = useRef();
  const location  = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/reset-password' || location.pathname === '/register') {
      if (login_paralaxClass.current) {
        paralaxClass.current.style = 'height:100vh;'
        login_paralaxClass.current.classList.remove('hide-login_parallax');
        paralaxClass.current.classList.add('hide-parallax');

      }
    }  else if(location.pathname === '/' ) {
      if (paralaxClass.current) {
        document.body.classList.remove('my-body-style');
        paralaxClass.current.style = 'height:100vh;'
        login_paralaxClass.current.classList.add('hide-login_parallax');
        paralaxClass.current.classList.remove('hide-parallax');

      }
    }
    else if(/^\/rooms\/.+$/.test(location.pathname) || location.pathname === '/profile/update-profile'){

        document.body.classList.add('my-body-style');
        paralaxClass.current.style = 'height:100vh;'
        paralaxClass.current.classList.add('hide-parallax');
        login_paralaxClass.current.classList.add('hide-login_parallax');
    }
    else if(location.pathname === '/profile/user-posts/new-post'){
        if (paralaxClass.current) {
            document.body.classList.add('my-body-style');
            paralaxClass.current.style = 'height:100vh;'
            login_paralaxClass.current.classList.add('hide-login_parallax');
            paralaxClass.current.classList.remove('hide-parallax');
    
          }
    }
    else if(location.pathname === '/profile'){
        document.body.classList.remove('my-body-style');
        paralaxClass.current.style = 'height:auto;'
        paralaxClass.current.classList.add('hide-parallax');
        login_paralaxClass.current.classList.add('hide-login_parallax');
    }
    else{
        document.body.classList.remove('my-body-style');
        paralaxClass.current.style = 'height:100vh;'
        paralaxClass.current.classList.add('hide-parallax');
        login_paralaxClass.current.classList.add('hide-login_parallax');
    }
  }, [location.pathname]);
  return (
    !currentUser ? <Navigate to={'/login'}/> : (
    <div ref={paralaxClass} className='paralaxClass'>
      <div ref={login_paralaxClass} className='login-parallax'>
          <div className='lg-parallax_piece'>
              <div className='parallax-a'>
                  <div style={{inset:'0px', opacity:"1",overflow:'hidden',position:'absolute'}}>
                      <div style={{position:'absolute', borderRadius:'inherit',inset:'0px'}}>
                          <img src="/parallax1.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
          <div className='lg-parallax_piece'>
              <div className='parallax-a'>
                  <div style={{inset:'0px', opacity:"1",overflow:'hidden',position:'absolute'}}>
                      <div style={{position:'absolute', borderRadius:'inherit',inset:'0px'}}>
                          <img src="/parallax2.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
          <div className='lg-parallax_piece'>
              <div className='parallax-a'>
                  <div style={{inset:'0px', opacity:"1",overflow:'hidden',position:'absolute'}}>
                      <div style={{position:'absolute', borderRadius:'inherit',inset:'0px'}}>
                          <img src="/parallax3.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
          <div className='lg-parallax_piece'>
              <div className='parallax-a'>
                  <div style={{inset:'0px', opacity:"1",overflow:'hidden',position:'absolute'}}>
                      <div style={{position:'absolute', borderRadius:'inherit',inset:'0px'}}>
                          <img src="/parallax4.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
          <div className='lg-parallax_piece'>
              <div className='parallax-a'>
                  <div style={{inset:'0px', opacity:"1",overflow:'hidden',position:'absolute'}}>
                      <div style={{position:'absolute', borderRadius:'inherit',inset:'0px'}}>
                          <img src="/parallax5.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
          <div className='lg-parallax_piece'>
              <div className='parallax-a'>
                  <div style={{inset:'0px', opacity:"1",overflow:'hidden',position:'absolute'}}>
                      <div style={{position:'absolute', borderRadius:'inherit',inset:'0px'}}>
                          <img src="/parallax6.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
          <div className='lg-parallax_piece'>
              <div className='parallax-a'>
                  <div style={{inset:'0px', opacity:"1",overflow:'hidden',position:'absolute'}}>
                      <div style={{position:'absolute', borderRadius:'inherit',inset:'0px'}}>
                          <img src="/parallax7.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
          <div className='lg-parallax_piece'>
              <div className='parallax-a'>
                  <div style={{inset:'0px', opacity:"1",overflow:'hidden',position:'absolute'}}>
                      <div style={{position:'absolute', borderRadius:'inherit',inset:'0px'}}>
                          <img src="/parallax8.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
          <div className='lg-parallax_piece'>
              <div className='parallax-a'>
                  <div style={{inset:'0px', opacity:"1",overflow:'hidden',position:'absolute'}}>
                      <div style={{position:'absolute', borderRadius:'inherit',inset:'0px'}}>
                          <img src="/parallax9.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
          <div className='lg-parallax_piece'>
              <div className='parallax-a'>
                  <div style={{inset:'0px', opacity:"1",overflow:'hidden',position:'absolute'}}>
                      <div style={{position:'absolute', borderRadius:'inherit',inset:'0px'}}>
                          <img src="/parallax10.png" alt="" />
                      </div>
                  </div>
              </div>
          </div>
      </div>
      
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
  )
}

export  {Layout, RequireAuth}