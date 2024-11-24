import React, { useState, useRef, useEffect } from 'react';
import './faq.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import { Fade} from "react-awesome-reveal";
const Faq = () => {
  gsap.registerPlugin(useGSAP,CSSRulePlugin,ScrollTrigger);
  const [activeIndex, setActiveIndex] = useState(null);
  const faqPanelsRef = useRef([]);
  const faqItems = [
    {
      question: 'What types of properties can I find on Roomzee?',
      answer: 'On Roomzee, you can find a variety of properties, including apartments, houses, villas, and vacation rentals in various locations to suit your needs.'
    },
    {
      question: 'How do I book a property?',
      answer: 'To book a property, simply select your desired dates and click on the "Book Now" button. Follow the prompts to complete your reservation and payment.'
    },
    {
      question: 'Is there a cancellation policy?',
      answer: 'Yes, Roomzee has a flexible cancellation policy. You can view the specific cancellation terms for each property on its listing page.'
    },
    {
      question: 'Can I modify my booking after it has been confirmed?',
      answer: 'Yes, you can modify your booking by contacting our customer support team. They will assist you in making the necessary changes, subject to availability.'
    },
    {
      question: 'Are pets allowed in the rental properties?',
      answer: 'Pet policies vary by property. Please check the individual property listing for specific details regarding pets.'
    },
    {
      question: 'What amenities are typically included in the rentals?',
      answer: 'Most rentals come equipped with basic amenities such as Wi-Fi, kitchen appliances, linens, and toiletries. Check each listing for a complete list of amenities.'
    }
  ];

  const toggleActiveClass = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    faqPanelsRef.current.forEach((panel, index) => {
      if (panel) {
        panel.style.maxHeight = index === activeIndex ? `${panel.scrollHeight}px` : '0';
      }
    });
  }, [activeIndex]);
  useEffect(() => {
    const timeline = gsap.timeline();
    timeline
      .from('.faq h1', { y: 70, duration: 0.5, opacity: 0 })
      .from('.description', { y: 40, duration: 0.5, opacity: 0 });
  },[])
  return (
    <section className='faq'>
      <h1>We're here to help</h1>
      <p className='description'>
        Customer service is at the core of our business. If you need any help before or after making a purchase, we're here.
      </p>
      <div className='faqs' style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Fade delay={700} triggerOnce={true}>
          {faqItems.map((item, index) => (
            <div onClick={() => toggleActiveClass(index)} key={index} className='faq-block'>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap:'15px' }}>
                <h2 style={{ flexGrow: 1 }}>{item.question}</h2>
                <div className={`plusminus ${activeIndex === index ? 'plusminus-active' : ''}`}></div>
              </div>
              <p 
                ref={el => faqPanelsRef.current[index] = el} 
                className={`faq-panel ${activeIndex === index ? 'active' : ''}`}
              >
                {item.answer}
              </p>
            </div>
          ))}
        </Fade>
      </div>
    </section>
  );
};

export default Faq;
