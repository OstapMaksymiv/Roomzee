import React, {  useState } from 'react';
import { Link,useLocation } from "react-router-dom";
import emailjs from 'emailjs-com';
import './footer.scss'

const Footer = () => {
    const location  = useLocation();
   
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(404);
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const templateParams = {
        user_email: email, 
      };
  
      emailjs.send('service_0ko1d2i', 'template_h38oh1s', templateParams, 'Cc0mFmrVv2uolpJnU')
        .then((response) => {
        setStatus(response.status)
          setEmail('Email sent successfully!')
          setTimeout(() => {
            setStatus(404)
          }, 2500)
          setTimeout(() => {
            setEmail('')
          }, 3000)
        })
    };
  return (
  <>   
{
  (location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/reset-password') && 
  <hr style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
}
    <footer className='footer'>
        <div className='container'>
            <div className='footer_F'>
                <div className='f_logo-block'>
                    <img src="/logo.jpg" alt="" />
                    <h4 className='roomzee'>Roomzee</h4>
                </div>
                <div className='f_news-block'>
                    <div className='nb_f'>
                        <h3>Subscribe to be in the know.</h3>
                        <p>Sign up for our newsletter below to stay updated with the latest news and updates. Don't worry, we hate spam too.</p>
                        <form onSubmit={handleSubmit} style={{display:'flex', alignItems:'center', gap:'12px', marginTop:'16px', width:'350px'}}>
                            <input style={status === 200 ? {backgroundColor:'white', color:'black'} : {backgroundColor:'rgb(23, 23, 23)',color:'white'}} required type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder='Your email address'/>
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                    <div className='nb_s'>
                        <ul className='footer_links'>
                            <li className='f_f-link'>Pages</li>
                            <li className='f_link'><Link to="/">Home</Link></li>
                            <li className='f_link'><Link to="/rooms">Rooms</Link></li>
                            <li className='f_link'><Link to="/profile">Profile</Link></li>
                            
                        </ul>
                        <ul className='footer_links'>
                            <li className='f_f-link'>All-Access Pass</li>
                            <li className='f_link'><Link to="/register">Sign Up</Link></li>
                            <li className='f_link'><Link to="/login">Sign in</Link></li>
                            <li className='f_link'><Link to="/reset-password">Reset Password</Link></li>
                        </ul>
                        <ul className='footer_links'>
                            <li className='f_f-link'>Information</li>
                            <li className='f_link'><Link to="/faq">FAQ</Link></li>
                            <li className='f_link'><Link to="/contact-us">Contact Us</Link></li>

                        </ul>
                    </div>
                </div>
            <hr style={{backgroundColor:'rgba(255, 255, 255, 0.1)'}}/>
            </div>
            <div className='footer_S'>
                <p>Created by <a href="https://ostapmaxportfolio.vercel.app" target='_blank'>Ostap Maksymiv</a></p>
                    <div>
                        <a href="https://github.com" target="_blank">
                            <img src="/github-logo.png" alt="" />
                        </a>
                        <a href="https://linkedin.com" target="_blank">
                            <img src="/linkedin.png" alt="" />
                        </a>
                    </div>
            </div>
        </div>
    </footer>
  </>
  )
}

export default Footer