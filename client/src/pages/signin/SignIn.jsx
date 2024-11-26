import { useContext, useEffect, useState, useRef } from "react";
import {Navigate, Link, useNavigate } from "react-router-dom";

import './signIn.scss'
import apiRequest from '../../library/apiRequest.js';
import { AuthContext } from "../../context/AuthContaxt";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
const SignIn = () => {
  gsap.registerPlugin(useGSAP,CSSRulePlugin,ScrollTrigger);
  const errorRef = useRef(null);
  const {updateUser, currentUser} = useContext(AuthContext)
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const timeline = gsap.timeline();
    timeline
    .from('.login_mainInfo div h1',{y: 70, duration: 0.5, opacity:0 })
    .from('.login_mainInfo div p',{y: 40, duration: 0.5, opacity:0 })
  
    .from('.sign-form div',{ 
      y: 60,
      scale:1.07,
      opacity: 0,
      duration: 0.4,
      stagger: 0.2,
     })
     .from('.sign-form button',{
      y: 50,
      scale:1.07,
      opacity: 0,
      duration: 0.4,
     })
     .from('.sign-form a',{
      y: 50,
      opacity: 0,
      duration: 0.3,
     })
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("");
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      const res = await apiRequest.post('/auth/login',{
       email,password
      })
      updateUser(res.data)
      navigate('/');
    } catch (error) {
      setError(error.response.data.message)
      errorRef.current.style = 'opacity:1';
      setTimeout(() => {
        errorRef.current.style = 'opacity:0'; // Hide error after timeout
      }, 2000);
      setTimeout(() => { 
        setError('');
      }, 2500);
    } finally{
      setIsLoading(false)
    }
  }
  const [eye, setEye] = useState('/hide.png')
  return (
     (
      currentUser ? <Navigate to={'/profile'}/> :(
      <div className='login-section'>
          <div className='login-block'>
            <div className='lg-parallax_light'></div>
            <div className='login_mainInfo'>
                <div style={{display:'flex',flexDirection:'column', gap:'16px'}}>
                  <h1>Sign in</h1>
                  <p >
                  Welcome back,
                  <br />
                  Enter your details below to sign in.</p>
                </div>
                <form className="sign-form" onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column', gap:'16px'}}>
                  <div>
                   <input  name='email' type="email" placeholder='Email' />
                  </div>
                  <div style={{position:'relative', display:'flex', alignItems:'center',justifyContent:'end'}}>
                    <input name='password' type={eye === '/hide.png' ? 'password' : 'text'} placeholder='Password'/>
                    <img style={{position:'absolute', width:'20px', height:'20px',filter:'invert(70%)',cursor:"pointer", marginRight:'20px', zIndex:"99"}} onClick={() => (eye === '/hide.png' ? setEye('/view.png') : setEye('/hide.png'))} src={eye} alt="" />
                  </div>
                  <button disabled={isLoading}>Sign in</button>
                  {/* {error && <span ref={errorRef}  className='sign-error'>{error.slice(0,21)}</span>} */}
                  <span ref={errorRef}  className='sign-error'>{error.slice(0,21)}</span>
                  <Link to='/reset-password'><span>Forget your password? Change it here.</span></Link>
                </form>
            </div>
          </div>
      </div>
    )
     )
  )
}

export default SignIn