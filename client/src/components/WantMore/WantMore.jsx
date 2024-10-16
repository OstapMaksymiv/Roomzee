import React from 'react'
import './wantMore.scss'
const WantMore = () => {
  return (
    <section className='wantMore'>
        <div className='wantMore-block'>
            <img src="/icon.png" alt="" />
            <div className='wantMore-text_block'>
                <h1>Find Your Perfect Home with Us!</h1>
                <p>Explore a variety of apartments and houses worldwide. Enjoy flexible rentals, easy search, and plenty of options to find your ideal home.</p>
                <button>Start Searching Now <span>→</span></button>
            </div>
        </div>
    </section>
  )
}

export default WantMore