import React from 'react'
import './wantMore.scss'
import { Link } from 'react-router-dom'
const WantMore = () => {
  return (
    <section className='wantMore'>
        <div className='wantMore-block'>
            <img src="/icon.png" alt="" />
            <div className='wantMore-text_block'>
                <h1>Find Your Perfect Home with Us!</h1>
                <p>Explore a variety of apartments and houses worldwide. Enjoy flexible rentals, easy search, and plenty of options to find your ideal home.</p>
                <Link to='/rooms'>Start Searching Now <span>→</span></Link>
            </div>
        </div>
    </section>
  )
}

export default WantMore