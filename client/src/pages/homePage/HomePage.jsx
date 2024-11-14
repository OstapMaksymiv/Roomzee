import React, {useState, useRef, useEffect, createRef} from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Модулі тепер імпортуються з 'swiper'
import { Autoplay, A11y, Scrollbar, Pagination, Navigation } from 'swiper/modules';
import { v4 } from 'uuid';
import './homePage.scss'
import SearchBar from '../../components/SearchBar/SearchBar'
import Testimonials from '../../components/Testimonials/Testimonials';
import WantMore from '../../components/WantMore/WantMore';
import Footer from '../../components/Footer/Footer';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContaxt';
const HomePage = ({handleModuleWindow}) => {
  const {currentUser} = useContext(AuthContext);

  const [advert, setAdvert] = useState([
    'Explore, Choose, Relax',
    'Rooms Tailored Perfectly',
    'Luxury Made Simple',
    'Home, Sweet Home',
    'Instant Room Booking',
    'Comfort Meets Style',
    'Stay Effortlessly Here'
  ])

  return (
    <>
      
      <div className='homePage'>
          <div className='main_info'>
              <h1>Your future house is here.</h1>
              <p>
              <span style={{color:'black'}} className='roomzee'>Roomzee</span> simplifies finding your ideal rental with flexible bookings and millions of listings worldwide. Discover homes across 220+ countries and tailor your search with 100+ filters to match your exact needs.
              </p>
              <SearchBar onClick={handleModuleWindow}/>
              <Swiper
                className='swiperADW'
                spaceBetween={20}
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
                    <SwiperSlide key={id} ><img src={`/${id + 1}.png`} alt="" /> {adv}</SwiperSlide>
                  ))}
              </Swiper>
              {/* <div className="boxes">
            <div className="box">
              <h3>16+</h3>
              <h4>Years of Experience</h4>
            </div>
            <div className="box">
              <h3>200</h3>
              <h4>Award Gained</h4>
            </div>
            <div className="box">
              <h3>2000+</h3>
              <h4>Property Ready</h4>
            </div>
          </div> */}
          </div>
      </div>
      <hr />
      <Testimonials/>
      <hr />
      <WantMore/>
    </>
  )
}

export default HomePage