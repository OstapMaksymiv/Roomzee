import React, { useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import { Autoplay, A11y } from 'swiper/modules';
import { v4 } from 'uuid';
import 'swiper/css';
import './searchBar.scss'
const SearchBar = ({onClick}) => {
    const [list, setList] = useState([
      "Find your rental fast.",
      "Flexible, easy bookings.",
      "Efficient home search.",
      "Affordable homes fast.",
      "Customize rental search."
    ])
  return (
    <div className='searchBar' onClick={onClick}>
      <div className='searchForm'>
        <img className='searchImg' src="/searchIcon.svg" alt="" />
        <Swiper
        className='swp'
          spaceBetween={10}
          direction={'vertical'}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          speed={1200} 
          modules={[Autoplay,A11y]}>
            {list.map((el) => (
              <SwiperSlide key={v4()}>{el}</SwiperSlide>
            ))}
        </Swiper>
        <span className='search-btn'>S</span>
      </div>
    </div>
  )
}

export default SearchBar