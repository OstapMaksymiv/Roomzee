import React, { useContext, useState,useEffect } from 'react'
import './singlePage.scss'
import DOMPurify from "dompurify";
import {  useLoaderData, useNavigate } from "react-router-dom";
import Map from '../../components/Map/Map';
import { AuthContext } from '../../context/AuthContaxt';
import apiRequest from '../../library/apiRequest';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import { Fade} from "react-awesome-reveal";
function SinglePage({handleModuleWindowSlider, fullswipperArray}) {
  gsap.registerPlugin(useGSAP,CSSRulePlugin,ScrollTrigger);
    const post  = useLoaderData();
    const [error, setError] = useState('')
    const [saved, setSaved] = useState(post.isSaved)
    const [errorClass, setErrorClass] = useState('error')
    const {  currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
   
    const handleSave = async () => {
 
      if (!currentUser) {
        navigate("/login");
      }
      setSaved((prev) => !prev);
      
      try {
        await apiRequest.post("/users/save", { postId: post.id });
      } catch (err) {
        console.log(err);
        setSaved((prev) => !prev);
      }
    };
    const handleAddChat = async () => {
      try {
        await apiRequest.post("/chats/",{receiverId:post.userId})
        setError('')
        navigate('/profile')
      } catch (error) {

          setError(error.response?.data?.message)
        setErrorClass('error error-op0')
        window.scrollTo(0, 0);
        setTimeout(() => {
          setErrorClass('error')
        },2000)
      }
    }
    useEffect(() => {

        gsap.from('.bigImage', { x: -100, duration: 0.7, opacity: 0,delay:0.3 })
        gsap.from(".map-block",{x: -100, duration: 0.7, opacity: 0,delay:0.7})
        gsap.from(".less-images",{y: -100, duration: 0.7, opacity: 0})
        gsap.from(".buttons",{y: 100, duration: 0.7, opacity: 0,delay:0.4})
        gsap.from(".owner-info",{y: 100, duration: 0.7, opacity: 0,delay:0.4})
        gsap.from('.feature-text h1',{x: 100, duration: 0.7, opacity: 0})
        gsap.from('.room-price',{x: 30, duration: 0.7, opacity: 0,delay:0.7})
        gsap.from('.listVertical .feature',{
          x: 100,
          delay:1.5,
          opacity: 0,
          duration: 0.7,
          stagger: 0.2,
        })
        gsap.from('.sizes .size',{
          x: 100,
          delay:1.5,
          opacity: 0,
          duration: 0.7,
          stagger: 0.2,
        })
        gsap.from('.room-description',{
          y: 100,
          opacity: 0,
          delay:2,
          duration: 0.7,
        })
    },[])
    return (
      <>
      
        <div className={errorClass}  >
          {error}
        </div>
        <section className="singlePage">
          <div className='images'>

            <div style={{display:'flex', flexDirection:'column', gap:'20px', zIndex:-1}}>
              <img onClick={(e) => {handleModuleWindowSlider(e); fullswipperArray(e,post.images);}} src={post.images[0]} className='bigImage' alt="" />
              <aside className='first-map_container'>
                <div className='map-block'><Map items={post} /></div>
              </aside>
            </div>
              <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
                  <div className='less-images'>
                    {post.images.slice(0,4).map((img, index) => (
                      index !== 0 && <img 
                      onClick={(e) => {handleModuleWindowSlider(e); fullswipperArray(e,post.images);}} key={index} src={img} alt="" />
                    ))}
                  </div>
                  <div className='owner-top'>

                    <div className='owner-info'>
                        <img src={post.user.avatar} alt="" />
                        <p>{post.user.username}</p>
                    </div>
                      
                    {currentUser ?  (currentUser.id === post.userId ? (
                          <div className="buttons">
                            <button onClick={handleSave} style={saved ? {backgroundColor:'white', filter:'drop-shadow(0 0 2px white)'} : {backgroundColor:'rgb(13,13,13)'}}>
                              <img style={saved ? {filter:'invert(0)'} : {filter:'invert(100%)'}} src="/save.png" alt="" />
                            </button>
                          </div>
                    ) : (
                      <div className="buttons">
                        <button onClick={handleAddChat}>
                          <img src="/chat.png" alt="" />
                        </button>
                        <button onClick={handleSave} style={saved ? {backgroundColor:'white', filter:'drop-shadow(0 0 2px white)'} : {backgroundColor:'rgb(13,13,13)'}}>
                          <img style={saved ? {filter:'invert(0)'} : {filter:'invert(100%)'}} src="/save.png" alt="" />
                        </button>
                      </div>
                    )) : (

                      <div className="buttons">
                        
 
                            <button>
                                <img onClick={() => navigate('/login')} src="/chat.png" alt="" />
                            </button>
   
           
                            <button onClick={() => navigate('/login')} style={saved ? {backgroundColor:'white', filter:'drop-shadow(0 0 2px white)'} : {backgroundColor:'rgb(13,13,13)'}}>
                              <img style={saved ? {filter:'invert(0)'} : {filter:'invert(100%)'}} src="/save.png" alt="" />
                            </button>
                      
                      </div>
                    )
                    }
                  </div>
              </div>
          </div>
          <div className="features">
            <div className="wrapper">
                <div className="list-wrapper">
                  <div className='feature'>
                    <div className='feature-text'>
                      <h1>{post.title}</h1>
                      <Fade delay={600} triggerOnce={true}>
                        <div>
                          <span>{post.homeType}</span>
                          <span>{post.propertyType}</span>
                        </div>
                      </Fade>
                    </div>
                    <h2 className="room-price">$ {post.price}</h2>
                    <div className="data-wrapper">
                      <Fade delay={900} triggerOnce={true}>
                        <p className="title">General</p>
                      </Fade>
                      <div className="listVertical">
                        <div className="feature">
                          <img src="/utility.png" alt="" /> 
                          <div className="featureText">
                            <span>Utilities: </span>
                            {post.postDetail.utilities === "owner" ? (
                              <p>Owner is responsible</p>
                            ) : (
                              <p>Tenant is responsible</p>
                            )}
                          </div>
                        </div>
                        <div className="feature">
                        <img src="/pet.png" alt="" />
                        <div className="featureText">
                          <span>Pet Policy: </span>
                          {post.postDetail.pet === "allowed" ? (
                            <p>Pets Allowed</p>
                          ) : (
                            <p>Pets not Allowed</p>
                          )}
                        </div>
                      </div>
                      </div>
                      <Fade delay={900} triggerOnce={true}>
                        <p className="title">Sizes</p>
                      </Fade>
                      <div className="sizes">
                      <div className="size">
                        <img src="/size.png" alt="" />
                        <span>{post.size} sqft</span>
                      </div>
                      <div className="size">
                        <img src="/room.png" alt="" />
                        <span>{post.rooms} rooms</span>
                      </div>
                      <div className="size">
                        <img src="/floor.png" alt="" />
                        <span>{post.address}</span>
                      </div>
                    </div>
                    </div>
                    <p className='room-description' dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(post.postDetail.description)}}></p>
                  </div>
                </div>
            </div>
          </div>
          <div className='owner-bottom'>
            <div className='owner-info' style={{width:'100%'}}>
                <img src={post.user.avatar} alt="" />
                <p>{post.user.username}</p>
            </div>
          </div>
          <Fade triggerOnce={true}>
            <aside className='sec-map_container'>
                  <div className='map-block'><Map items={post} /></div>
              </aside>
          </Fade>
        </section>
 
      </>
    );
  }
  
  export default SinglePage;