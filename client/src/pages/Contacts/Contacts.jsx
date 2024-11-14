import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './contacts.scss'
const Contacts = () => {
  const [buttonText, setButtonText] = useState('Send Message');
  const [fadeOut, setFadeOut] = useState(false);
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
        setFadeOut(true); // запускає анімацію зникнення
        setTimeout(() => {
          setButtonText('Email sent successfully!');
          setFadeOut(false); // плавна поява нового тексту
        }, 500); // час відповідає `transition` у CSS

        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            setButtonText('Send Message');
            setFadeOut(false);
          }, 500);
        }, 2000);
      });
  };
  return (
    <section className='contacts'>
        <div className='article-block'>
            <h1>Still need help?</h1>
            <p>If our FAQ couldn't answer your question, feel free to reach out to us and we'll get back to you ASAP.</p>
        </div>
        <div className='activities-help'>
            <div>
                <h4><img src="/mail.png" alt="" /> Email us</h4>
                <p>Drop us a line via email or use the contact form below.</p>
                <a href="">Email <img src="/next.png" alt="" /></a>
            </div>
            <div>
                <h4><img src="/conversation.png" alt="" /> Chat with us</h4>
                <p>Drop us a line via email or use the contact form below.</p>
                <a href="">Chat <img src="/next.png" alt="" /></a>
            </div>
            <div>
                <h4><img src="/users.png" alt="" /> Ask community</h4>
                <p>Drop us a line via email or use the contact form below.</p>
                <a href="">Join <img src="/next.png" alt="" /></a>
            </div>
        </div>
        <form onSubmit={handleSubmit} className='contact-form'>
            <input type="text" name='username'  placeholder='Your Name' required/>
            <input  type="email" name='email'  placeholder='Your Email Address' required/>
            <textarea  required name="text" placeholder='How can we help you?' id="" cols="30" rows="5"></textarea>
            <button className={`button-text ${fadeOut ? 'button-text-fade' : ''}`}    type='submit'>{buttonText}</button>
        </form>
    </section>
  )
}

export default Contacts