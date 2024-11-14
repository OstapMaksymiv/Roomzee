import React, {useState, useRef, useEffect, createRef} from 'react'
import { v4 } from 'uuid';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, A11y, Scrollbar, Pagination, Navigation } from 'swiper/modules';
import './testimonials.scss'
const Testimonials = () => {
  const [advert, setAdvert] = useState([
    'Harvard',
    'TripAdvisor',
    'OpenDoor',
    'Cambridge',
    'Uber'
  ])
  const [reviews, setReviews] = useState([
      {
        name: "Sienna",
        avatar: "/avatar_1.png",
        rating: 5,
        review: "Roomzee has simplified the entire process of finding and booking a place to stay. The user experience is top-notch.",
        template: "EasyBook",
        date: "Oct 1, 2024"
    },
    {
        name: "Theo Kureila",
        avatar: "/avatar_2.png",
        rating: 5,
        review: "The Roomzee platform makes everything easier. I could filter and book my perfect room in just minutes!",
        template: "QuickStay",
        date: "Sep 22, 2024"
    },
    {
        name: "Ashwar Kabota",
        avatar: "/avatar_3.png",
        rating: 4,
        review: "Great service! Roomzee helped me find a nice apartment for a weekend trip. Definitely will use it again.",
        template: "TravelHub",
        date: "Sep 10, 2024"
    },
    {
        name: "Nabeel",
        avatar: "/avatar_4.png",
        rating: 5,
        review: "Roomzee is a game-changer for rental properties. I found a fantastic place within my budget quickly and easily.",
        template: "BudgetFind",
        date: "Aug 28, 2024"
    },
    {
        name: "Leon H.",
        avatar: "/avatar_5.png",
        rating: 5,
        review: "I love how easy it is to book through Roomzee. The interface is very user-friendly and smooth.",
        template: "UserFirst",
        date: "Aug 15, 2024"
    },
    {
        name: "Sariya",
        avatar: "/avatar_6.png",
        rating: 4,
        review: "Roomzee offers many options, and the support team is very helpful. I found exactly what I was looking for.",
        template: "SupportPlus",
        date: "Aug 5, 2024"
    }
  ])
  return (
    <section className='Testimonials_block'>
        <div className='tb-title' style={{display:'flex', alignItems:"center", gap:'10px'}}>
            <h2>Reviews</h2> <span>See it all {'↴'}</span>
        </div>
        <div className='mainReview_info'>
            <h3>Who team up with us:</h3>
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
                    <SwiperSlide key={id} ><img src={`/c_${id + 1}.png`} alt="" /> {adv}</SwiperSlide>
                  ))}
              </Swiper>
              <div className='reviews'>
                    {reviews.map(review => (
                      <div key={v4()} className='review'>
                        <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                          <div className='review_person'>
                              <img src={review.avatar} alt="" />
                              <h4>{review.name}</h4>
                          </div>
                          <div className='stars'>
                            {Array.from({ length: review.rating }, (_, index) => (
                              <img key={index} src="/star.png" alt="star" />
                            ))}
                          </div>
                        </div>
                        <p className='review_text' dangerouslySetInnerHTML={{ __html: review.review.replace(/Roomzee/g, '<span style="color:white" class="roomzee">Roomzee</span>'),}}></p>
                        <p className='template-date'>{review.template} • <span>{review.date}</span></p>
                      </div>
                    ))}
              </div>
        </div>
    </section>
  )
}

export default Testimonials