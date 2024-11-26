import React, {useState, useEffect, useRef} from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay } from 'swiper/modules';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import './testimonials.scss'
const Testimonials = () => {
  gsap.registerPlugin(useGSAP,CSSRulePlugin);
  const containerRef = useRef(null);
  const timeline = gsap.timeline();
  const [advert, setAdvert] = useState([
    'Harvard',
    'TripAdvisor',
    'OpenDoor',
    'Cambridge',
    'Uber'
  ])
  useEffect(() => {
    const tl = gsap.timeline();
    if (containerRef.current.querySelector('.tb-title h2')) {
      tl.from(".tb-title h2", { y: 100, duration: 0.7, delay: 0.7, opacity: 0 })
        .from(".tb-title span", { y: 100, opacity: 0, duration: 0.7 });
    }

    if (containerRef.current.querySelector('.mainReview_info h3')) {
      gsap.from('.mainReview_info h3', { y: 50, opacity: 0, scale: 1.3, duration: 0.7, delay: 1.1 });
    }

    if (containerRef.current.querySelector('.swiper-s')) {
      gsap.from('.swiper-s', { y: 50, opacity: 0, duration: 0.7, delay: 1.1 });
    }

    if (containerRef.current.querySelector('.review')) {
      gsap.from('.review', {
        y: 100,
        delay: 1.5,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
      });
    }
  }, []); 
  return (
    <section className='Testimonials_block' ref={containerRef}>

        <div className='tb-title' style={{display:'flex', alignItems:"center", gap:'10px'}}>
            <h2>Reviews</h2> <span>See it all {'↴'}</span>
        </div>
        <div className='mainReview_info'>
            <h3>Who team up with us:</h3>
            <Swiper
                className='swiperADW swiper-s'
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
                    <SwiperSlide key={id} ><img src={`/c_${id + 1}.png`} alt="" /> {adv}</SwiperSlide>
                  ))}
              </Swiper>
              <div className='reviews'>
                <div className='review'>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className='review_person'>
                      <img src="/avatar_1.png" alt="Sienna" />
                      <h4>Sienna</h4>
                    </div>
                    <div className='stars'>
                      {[...Array(5)].map((_, index) => (
                        <img key={index} src="/star.png" alt="star" />
                      ))}
                    </div>
                  </div>
                  <p
                    className='review_text'
                    dangerouslySetInnerHTML={{
                      __html: `Roomzee has simplified the entire process of finding and booking a place to stay. The user experience is top-notch.`.replace(
                        /Roomzee/g,
                        '<span style="color:white" class="roomzee">Roomzee</span>'
                      ),
                    }}
                  ></p>
                  <p className='template-date'>EasyBook • <span>Oct 1, 2024</span></p>
                </div>

                <div className='review'>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className='review_person'>
                      <img src="/avatar_2.png" alt="Theo Kureila" />
                      <h4>Theo Kureila</h4>
                    </div>
                    <div className='stars'>
                      {[...Array(5)].map((_, index) => (
                        <img key={index} src="/star.png" alt="star" />
                      ))}
                    </div>
                  </div>
                  <p
                    className='review_text'
                    dangerouslySetInnerHTML={{
                      __html: `The Roomzee platform makes everything easier. I could filter and book my perfect room in just minutes!`.replace(
                        /Roomzee/g,
                        '<span style="color:white" class="roomzee">Roomzee</span>'
                      ),
                    }}
                  ></p>
                  <p className='template-date'>QuickStay • <span>Sep 22, 2024</span></p>
                </div>

                <div className='review'>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className='review_person'>
                      <img src="/avatar_3.png" alt="Ashwar Kabota" />
                      <h4>Ashwar Kabota</h4>
                    </div>
                    <div className='stars'>
                      {[...Array(4)].map((_, index) => (
                        <img key={index} src="/star.png" alt="star" />
                      ))}
                    </div>
                  </div>
                  <p
                    className='review_text'
                    dangerouslySetInnerHTML={{
                      __html: `Great service! Roomzee helped me find a nice apartment for a weekend trip. Definitely will use it again.`.replace(
                        /Roomzee/g,
                        '<span style="color:white" class="roomzee">Roomzee</span>'
                      ),
                    }}
                  ></p>
                  <p className='template-date'>TravelHub • <span>Sep 10, 2024</span></p>
                </div>

                <div className='review'>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className='review_person'>
                      <img src="/avatar_4.png" alt="Nabeel" />
                      <h4>Nabeel</h4>
                    </div>
                    <div className='stars'>
                      {[...Array(5)].map((_, index) => (
                        <img key={index} src="/star.png" alt="star" />
                      ))}
                    </div>
                  </div>
                  <p
                    className='review_text'
                    dangerouslySetInnerHTML={{
                      __html: `Roomzee is a game-changer for rental properties. I found a fantastic place within my budget quickly and easily.`.replace(
                        /Roomzee/g,
                        '<span style="color:white" class="roomzee">Roomzee</span>'
                      ),
                    }}
                  ></p>
                  <p className='template-date'>BudgetFind • <span>Aug 28, 2024</span></p>
                </div>

                <div className='review'>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className='review_person'>
                      <img src="/avatar_5.png" alt="Leon H." />
                      <h4>Leon H.</h4>
                    </div>
                    <div className='stars'>
                      {[...Array(5)].map((_, index) => (
                        <img key={index} src="/star.png" alt="star" />
                      ))}
                    </div>
                  </div>
                  <p
                    className='review_text'
                    dangerouslySetInnerHTML={{
                      __html: `I love how easy it is to book through Roomzee. The interface is very user-friendly and smooth.`.replace(
                        /Roomzee/g,
                        '<span style="color:white" class="roomzee">Roomzee</span>'
                      ),
                    }}
                  ></p>
                  <p className='template-date'>UserFirst • <span>Aug 15, 2024</span></p>
                </div>
                <div className='review'>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className='review_person'>
                      <img src="/avatar_6.png" alt="Leon H." />
                      <h4>Sariya</h4>
                    </div>
                    <div className='stars'>
                      {[...Array(4)].map((_, index) => (
                        <img key={index} src="/star.png" alt="star" />
                      ))}
                    </div>
                  </div>
                  <p
                    className='review_text'
                    dangerouslySetInnerHTML={{
                      __html: `Roomzee offers many options, and the support team is very helpful. I found exactly what I was looking for.`.replace(
                        /Roomzee/g,
                        '<span style="color:white" class="roomzee">Roomzee</span>'
                      ),
                    }}
                  ></p>
                  <p className='template-date'>SupportPlus • <span>Aug 5, 2024</span></p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Testimonials