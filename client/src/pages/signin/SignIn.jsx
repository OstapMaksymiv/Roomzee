import { useContext, useState } from "react";
import {Navigate, Link, useNavigate } from "react-router-dom";

import './signIn.scss'
import Testimonials from '../../components/Testimonials/Testimonials';
import apiRequest from '../../library/apiRequest.js';
import { AuthContext } from "../../context/AuthContaxt";

const SignIn = () => {
  const {updateUser, currentUser} = useContext(AuthContext)
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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
    } finally{
      setIsLoading(false)
    }
  }
  return (
     (
      currentUser ? <Navigate to={'/profile'}/> :(
      <div className='login-section'>
          <div className='login-block'>
            <div className='lg-parallax_light'></div>
            <div className='login_mainInfo'>
                <div style={{display:'flex',flexDirection:'column', gap:'16px'}}>
                  <h1>Sign in</h1>
                  <p>Welcome back, enter your details below to sign in.</p>
                </div>
                <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column', gap:'16px'}}>
                  <input name='email' type="email" placeholder='Email'/>
                  <input name='password' type="password" placeholder='Password'/>
                  <button disabled={isLoading}>Sign in</button>
                  {error && <span className='error'>{error.slice(0,21)}</span>}
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