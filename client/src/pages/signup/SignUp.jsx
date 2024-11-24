import React, { useContext, useState,useEffect } from 'react'
import {Navigate, useNavigate } from "react-router-dom";
import './signUp.scss'
import apiRequest from '../../library/apiRequest.js';
import { AuthContext } from '../../context/AuthContaxt';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
const SignUp = () => {
  gsap.registerPlugin(useGSAP,CSSRulePlugin,ScrollTrigger);
  const { updateUser, currentUser } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("");
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    try {
      const res = await apiRequest.post('/auth/register',{
        username,email,password
      })
      navigate('/login');
    } catch (error) {
      setError(error.response.data.message)
    } finally{
      setIsLoading(false)
    }
  }
  const [eye, setEye] = useState('/hide.png')
  useEffect(() => {
    const timeline = gsap.timeline();
    timeline
      .from('.signup_mainInfo div h1', { y: 70, duration: 0.5, opacity: 0 })
      .from('.signup_mainInfo div p', { y: 40, duration: 0.5, opacity: 0 })
      .from('.signup-form div', { 
        y: 60,
        scale: 1.07,
        opacity: 0,
        duration: 0.4,
        stagger: 0.2
      })
      .from('.signup-form button', {
        y: 50,
        scale: 1.07,
        opacity: 0,
        duration: 0.4
      });
  }, []); 

  return (
    currentUser ? <Navigate to={'/profile'}/> :(
    <div className='signup-section'>
        <div className='signup-block'>
           <div className='lg-parallax_light'></div>
           <div className='signup_mainInfo'>
              <div style={{display:'flex',flexDirection:'column', gap:'16px'}}>
                <h1>Sign up</h1>
                <p >
                  Welcome, 
                  Enter your details below to sign up.</p>
              </div>
              <form className='signup-form' onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column', gap:'16px'}}>
                <div>
                  <input name='username' type="text" placeholder='Username'/>
                </div>
                <div style={{position:'relative', display:'flex', alignItems:'center',justifyContent:'end'}}>
                    <input name='password' type={eye === '/hide.png' ? 'password' : 'text'} placeholder='Password'/>
                    <img style={{position:'absolute', width:'20px', height:'20px',filter:'invert(70%)',cursor:"pointer", marginRight:'20px', zIndex:"99"}} onClick={() => (eye === '/hide.png' ? setEye('/view.png') : setEye('/hide.png'))} src={eye} alt="" />
                </div>
                <div>
                  <input name='password' type="password" placeholder='Password'/>
                </div>
                <button disabled={isLoading} >Sign up</button>
                {error && <span className='error'>{error.slice(0,33)}</span>}
              </form>
           </div>
        </div>
    </div>
    )
  )
}

export default SignUp