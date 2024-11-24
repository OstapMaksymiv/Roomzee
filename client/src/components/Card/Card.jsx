import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import {  A11y, Navigation } from 'swiper/modules';

import { v4 } from 'uuid';
import 'swiper/css';
import './card.scss'

const Card = ({post, postId}) => {

  return (
    <a href={`/rooms/${post.id}`} key={post.id} onClick={(e) => e.stopPropagation()} className='card'>
      <div style={{position:'relative'}}>
          <Swiper
          className='card_swp'
            spaceBetween={0}
            direction={'horizontal'}
            slidesPerView={1}
            loop={true}

            speed={1200}
            navigation={true}
            modules={[A11y, Navigation]}>

              {post.images.map((el) => (
                <SwiperSlide key={v4()}><img src={el} alt="" /></SwiperSlide>
              ))}

          </Swiper>
          <p className='card-title'>
            {
              post.title.length > 23 ? `${post.title.slice(0,23)}...` :
              post.title
          }
          </p>
      </div>
      <div className='card-mainInfo'>
        <div className='price-block'>
          <span>
            {post.price}$ / month
          </span>

        </div>
        <div className='location-block'>
          <img src="/location.png" alt="" />
          {post.address}
        </div>
        <div className='rest-info'>
          <span>
            {post.rooms} rooms
          </span>
          •
          <span>
          {post.homeType.charAt(0).toUpperCase() + post.homeType.slice(1)}
          </span>
          •
          <span>
            {post.size} m²
          </span>
          •
          <span>
           For {post.propertyType.charAt(0).toUpperCase() + post.propertyType.slice(1)}
          </span>
        </div>
      </div>
    </a>
  )
}

export default Card