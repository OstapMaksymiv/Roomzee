import React, {useState, useRef, useEffect, createRef} from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import {ScrollTrigger} from 'gsap/ScrollTrigger';

import { Autoplay } from 'swiper/modules';

import './homePage.scss'
import SearchBar from '../../components/SearchBar/SearchBar'
import Testimonials from '../../components/Testimonials/Testimonials';
import WantMore from '../../components/WantMore/WantMore';
const HomePage = ({handleModuleWindow}) => {
  gsap.registerPlugin(useGSAP,CSSRulePlugin,ScrollTrigger);
  const timeline = gsap.timeline();
  useGSAP(() => {
    timeline
      .from(".main_info h1", { y: 100, duration: 0.7, opacity:0 }) 
      .from(".main_info p", { y: 100,opacity:0, duration: 0.7 }) 
      .from(".swiper-f",{y:30, opacity:0, duration:0.3})
      
    gsap.from(".searchBar", { y: 50,opacity:0,scale:1.05, duration: 0.7,delay:1.1 })
    gsap.from('.hr-f',{width:0,opacity:0,duration:1, delay:1})
    gsap.from('.hr-s',{width:0,opacity:0,duration:1, delay:2.7})

  })
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
              <h1>
                Your future house is here.
                
              </h1>
              <p>
                <span style={{color:'black'}} className='roomzee'>Roomzee</span> simplifies finding your ideal rental with flexible bookings and millions of listings worldwide. Discover homes across 220+ countries and tailor your search with 100+ filters to match your exact needs.
              </p>
              <SearchBar onClick={handleModuleWindow}/>
              <Swiper
                className='swiperADW swiper-f'
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
          </div>
      </div>
      <hr className='hr-f' />
      <Testimonials/>
      <hr className='hr-s' />
      <WantMore/>
    </>
  )
}

export default HomePage