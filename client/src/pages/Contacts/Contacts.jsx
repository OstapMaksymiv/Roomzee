import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './contacts.scss'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import { Fade, Slide,Zoom } from "react-awesome-reveal";
const Contacts = () => {
   gsap.registerPlugin(useGSAP,CSSRulePlugin,ScrollTrigger);
   const beforeContacts = CSSRulePlugin.getRule(".contacts::before"); 
   const afterContacts = CSSRulePlugin.getRule(".contacts::after");
  const [errorClass, setErrorClass] = useState('error')
  const timeline = gsap.timeline();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, text } = Object.fromEntries(formData);
    
    const templateParams = {
      user_email: email,
      message: text,
      username,
    };

    emailjs.send('service_0ko1d2i', 'template_ri52fol', templateParams, 'Cc0mFmrVv2uolpJnU')
      .then((response) => {
        e.target.reset();
        setErrorClass('error error-op0')
        setTimeout(() => {
          setErrorClass('error')
        },2000)
      });
  };
  useGSAP(() => {

    gsap.fromTo(
      beforeContacts,
      { cssRule: { transform: 'translateY(70px)' } },
      {
        cssRule: { transform: 'translateY(0)' },
        duration: 3.3,
        repeat: -1, 
        yoyo: true, 
        ease: 'power1.inOut',
      }
    );

    gsap.fromTo(
      afterContacts,
      { cssRule: { transform: 'rotate(180deg) translateY(70px)' } },
      {
        cssRule: { transform: 'rotate(180deg) translateY(0)' },
        duration: 3.3,
        repeat: -1, 
        yoyo: true, 
        ease: 'power1.inOut',
      }
    );
    timeline
    .from('.article-block h1',{y:100,opacity:0,scale:1.05})
    .from('.article-block p',{y:30,opacity:0, duration: 0.6});
  })
  return (
    <>
      <div className={errorClass} style={{backgroundColor:'#177e17'}} >
          Email was send successfully
        </div>
      <section className='contacts'>
          <div className='article-block'>
              <h1>Still need help?</h1>
              <p>If our FAQ couldn't answer your question, feel free to reach out to us and we'll get back to you ASAP.</p>
          </div>
          <div className='activities-help'>
            <Fade delay={400} triggerOnce={true}>
            <Slide direction='up' delay={400} triggerOnce={true}>

                <div className='activity-block'>
                    <h4><img src="/mail.png" alt="" /> Email us</h4>
                    <p>Drop us a line via email or use the contact form below.</p>
                    <a href="">Email <img src="/next.png" alt="" /></a>
                </div>
            </Slide>
            </Fade>
              <Fade delay={800} triggerOnce={true}>
              <Slide direction='up' delay={800} triggerOnce={true}>

              <div className='activity-block'>
                  <h4><img src="/conversation.png" alt="" /> Chat with us</h4>
                  <p>Drop us a line via email or use the contact form below.</p>
                  <a href="">Chat <img src="/next.png" alt="" /></a>
              </div>
              </Slide>
              </Fade>
              <Fade delay={1100} triggerOnce={true}>
              <Slide direction='up' delay={1100} triggerOnce={true}>

              <div className='activity-block'>
                  <h4><img src="/users.png" alt="" /> Ask community</h4>
                  <p>Drop us a line via email or use the contact form below.</p>
                  <a href="">Join <img src="/next.png" alt="" /></a>
              </div>
              </Slide>
              </Fade>
          </div>
          <form onSubmit={handleSubmit} className='contact-form'>
            <Fade delay={1500} triggerOnce={true}>

              <input type="text" name='username'  placeholder='Your Name' required/>
            </Fade>
              <Fade delay={1700} triggerOnce={true}>
              
              <input  type="email" name='email'  placeholder='Your Email Address' required/>
              </Fade>
              <Fade delay={1900} triggerOnce={true}>
              
              <textarea  required name="text" placeholder='How can we help you?' id="" cols="30" rows="5"></textarea>
              </Fade>
              <Fade delay={2100} triggerOnce={true}>
                <button className='button-text' style={errorClass !== 'error' ? {backgroundColor:'#177e17'}: {backgroundColor:'rgb(13, 13, 13)'}}    type='submit'>{errorClass === 'error' ? 'Send Email': 'Email was send' }</button>
              </Fade>
          </form>
      </section>
    </>
  )
}

export default Contacts