import React from 'react'
import './footer.scss'
const Footer = () => {
  return (
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
                        <div style={{display:'flex', alignItems:'center', gap:'12px', marginTop:'16px', width:'350px'}}>
                            <input type="text"  placeholder='Your email address'/>
                            <button>Subscribe</button>
                        </div>
                    </div>
                    <div className='nb_s'>
                        <ul className='footer_links'>
                            <li className='f_f-link'>Pages</li>
                            <li className='f_link'><a href="">Home</a></li>
                            <li className='f_link'><a href="">Rooms</a></li>
                            <li className='f_link'><a href="">Profile</a></li>
                            
                        </ul>
                        <ul className='footer_links'>
                            <li className='f_f-link'>All-Access Pass</li>
                            <li className='f_link'><a href="">Sign Up</a></li>
                            <li className='f_link'><a href="">Sign in</a></li>
                            <li className='f_link'><a href="">Reset Password</a></li>
                        </ul>
                        <ul className='footer_links'>
                            <li className='f_f-link'>Information</li>
                            <li className='f_link'><a href="">FAQ</a></li>
                            <li className='f_link'><a href="">Contact Us</a></li>

                        </ul>
                    </div>
                </div>
            <hr style={{backgroundColor:'rgba(255, 255, 255, 0.1)'}}/>
            </div>
            <div className='footer_S'>
                <p>Created by <a href="">Ostap Maksymiv</a></p>
                    <div>
                        <img src="/github-logo.png" alt="" />
                        <img src="/linkedin.png" alt="" />
                    </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer