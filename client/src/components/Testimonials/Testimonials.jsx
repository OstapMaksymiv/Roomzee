import React, {useState, useRef, useEffect, createRef} from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, A11y, Scrollbar, Pagination, Navigation } from 'swiper/modules';
import './testimonials.scss'
const Testimonials = () => {
  const [advert, setAdvert] = useState([
    'University of Harvard',
    'TripAdvisor',
    'OpenDoor',
    'University of Cambridge',
    'Uber'
  ])
  return (
    <div className='Testimonials_block'>
        <div style={{display:'flex', alignItems:"center", gap:'10px'}}>
            <h2>Reviews</h2> <span>See it all {'↴'}</span>
        </div>
        <div className='mainReview_info'>
            <h3>Our company team up with:</h3>
            <Swiper
                className='swiperADW'
                spaceBetween={10}
                slidesPerView={2.5}
                loop={true}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                }}
                allowTouchMove={false}
                keyboard={{ enabled: false }} 
                speed={5000}
                pagination={false}
                navigation={false}
                modules={[Autoplay]} >
                  {advert.map((adv, id) => (
                    <SwiperSlide key={id} ><img src={`/c_${id + 1}.png`} alt="" /> {adv}</SwiperSlide>
                  ))}
              </Swiper>
        </div>
    </div>
  )
}

export default Testimonials