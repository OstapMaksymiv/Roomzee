import React, { useContext, useState } from 'react'
import './resetPassword.scss'
import { Link,useNavigate } from "react-router-dom";
import emailjs from 'emailjs-com';

import { v4 } from 'uuid';
import apiRequest from "../../library/apiRequest";
import { AuthContext } from '../../context/AuthContaxt'
const ResetPassword = () => {
  const {currentUser, updateUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const[email, setEmail] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = v4().slice(0,8);


    const templateParams = {
      user_email: email,
      message: newPassword,
      username:currentUser.username
    };

    emailjs.send('service_q2u9r4k', 'template_4gyp6fs', templateParams, 'gQkPzrr9VDvlWWAdI')
      .then((response) => {
            e.target.reset();
          setEmail('')
      })
    // const formData = new FormData(e.target)
    // const {email} = Object.fromEntries(formData)
    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`,{
        username:currentUser.username,
        email:currentUser.email,
        password:newPassword,
        avatar:currentUser.avatar
      })
      updateUser(res.data);
      setEmail('')
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='reset-section'>
    <div className='reset-block'>
       <div className='lg-parallax_light'></div>
       <div className='reset_mainInfo'>
          <div style={{display:'flex',flexDirection:'column', gap:'16px'}}>
            <h1>Reset password</h1>
            <p>Enter your email below to receive a password reset email.</p>
          </div>
          <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column', gap:'16px'}}>
            <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email'/>
            <button type="submit">Send Reset Email</button>
     
          </form>
       </div>
    </div>
</div>
  )
}

export default ResetPassword