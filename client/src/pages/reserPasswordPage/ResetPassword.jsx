import React, { useState, useEffect } from 'react'
import './resetPassword.scss'
import {useNavigate } from "react-router-dom";
import emailjs from 'emailjs-com';

import { v4 } from 'uuid';
import apiRequest from "../../library/apiRequest";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
const ResetPassword = () => {
  gsap.registerPlugin(useGSAP,CSSRulePlugin,ScrollTrigger);
  const navigate = useNavigate();
  const[email, setEmail] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = v4().slice(0,8);


    const templateParams = {
      user_email: email,
      message: newPassword,
  
    };

    emailjs.send('service_q2u9r4k', 'template_4gyp6fs', templateParams, 'gQkPzrr9VDvlWWAdI')
      .then((response) => {
            e.target.reset();
          setEmail('')
      })
    try {
      const res = await apiRequest.post('/users/reset-password', { email,newPassword });  
      setEmail('')
      await apiRequest.post("/auth/logout");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const timeline = gsap.timeline();
    timeline
    .from('.reset_mainInfo div h1',{y: 70, duration: 0.5, opacity:0 })
    .from('.reset_mainInfo div p',{y: 40, duration: 0.5, opacity:0 })
  
    .from('.reset-form input',{ 
      y: 60,
      scale:1.07,
      opacity: 0,
      duration: 0.4,
      stagger: 0.2,
     })
     .from('.reset-form button',{
      y: 50,
      scale:1.07,
      opacity: 0,
      duration: 0.4,
     })
  },[])
  return (
    <div className='reset-section'>
    <div className='reset-block'>
       <div className='lg-parallax_light'></div>
       <div className='reset_mainInfo'>
          <div style={{display:'flex',flexDirection:'column', gap:'16px'}}>
            <h1>Reset password</h1>
            <p>Enter your email below to receive a password reset email.</p>
          </div>
          <form className='reset-form' onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column', gap:'16px'}}>
            <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email'/>
            <button type="submit">Send Reset Email</button>
     
          </form>
       </div>
    </div>
</div>
  )
}

export default ResetPassword