import React, { useContext, useState } from 'react'
import {Navigate, Link, useNavigate } from "react-router-dom";
import './signUp.scss'
import apiRequest from '../../library/apiRequest.js';
import { AuthContext } from '../../context/AuthContaxt';
const SignUp = () => {
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
      // updateUser(res.data)
      navigate('/login');
    } catch (error) {
      setError(error.response.data.message)
    } finally{
      setIsLoading(false)
    }
  }
  return (
    currentUser ? <Navigate to={'/profile'}/> :(
    <div className='signup-section'>
        <div className='signup-block'>
           <div className='lg-parallax_light'></div>
           <div className='signup_mainInfo'>
              <div style={{display:'flex',flexDirection:'column', gap:'16px'}}>
                <h1>Sign up</h1>
                <p>Welcome, enter your details below to sign up.</p>
              </div>
              <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column', gap:'16px'}}>

                <input name='username' type="text" placeholder='Username'/>
                <input name='email' type="email" placeholder='Email'/>
                <input name='password' type="password" placeholder='Password'/>
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