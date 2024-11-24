import React, {useEffect, useRef} from 'react'
import './wantMore.scss'
import { Link } from 'react-router-dom'
import gsap from 'gsap';
import { Fade } from "react-awesome-reveal";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
const WantMore = () => {
  gsap.registerPlugin(ScrollTrigger);
  return (
    <>
    <section  className='wantMore'>
      <Fade delay={500} triggerOnce={true}>
          <div className='pre-before'></div>
      </Fade>

          <div className='wantMore-block'>
          <Fade direction='down' triggerOnce={true}>

            <Fade direction='down' triggerOnce={true}>

              <img src="/icon.png" alt="" />
            </Fade>
          </Fade>
              <div className='wantMore-text_block'>
                  <h1>Find Your Perfect Home with Us!</h1>
                  <p>Explore a variety of apartments and houses worldwide. Enjoy flexible rentals, easy search, and plenty of options to find your ideal home.</p>
                  <Link to='/rooms'>Start Searching Now <span>→</span></Link>
              </div>
          </div>

        <Fade delay={500} triggerOnce={true}>
          <div className='pre-after'></div>
        </Fade>
    </section>
    </>
  )
}

export default WantMore