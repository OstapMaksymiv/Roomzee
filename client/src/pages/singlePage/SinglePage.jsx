import React, { useContext, useState } from 'react'
import './singlePage.scss'
import DOMPurify from "dompurify";
import {Swiper, SwiperSlide} from 'swiper/react';
import { Autoplay, A11y, Navigation } from 'swiper/modules';
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { v4 } from 'uuid';
import Map from '../../components/Map/Map';
import { AuthContext } from '../../context/AuthContaxt';
import apiRequest from '../../library/apiRequest';
function SinglePage({handleModuleWindowSlider, fullswipperArray}) {
    const post  = useLoaderData();
    console.log(post);
    const [saved, setSaved] = useState(post.isSaved)
    const {  currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSave = async () => {
      if (!currentUser) {
        navigate("/login");
      }
      // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
      setSaved((prev) => !prev);
      try {
        await apiRequest.post("/users/save", { postId: post.id });
      } catch (err) {
        console.log(err);
        setSaved((prev) => !prev);
      }
    };
    return (
      <section className="singlePage">
        <div className='images'>

          <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
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
                <div className='owner-info'>
                    <img src={post.user.avatar} alt="" />
                    <p>{post.user.username}</p>
                </div>
                <div className="buttons">
                  <button>
                    <img src="/chat.png" alt="" />
                  </button>
                  <button onClick={handleSave} style={saved ? {backgroundColor:'white', filter:'drop-shadow(0 0 2px white)'} : {backgroundColor:'rgb(13,13,13)'}}>
                    <img style={saved ? {filter:'invert(0)'} : {filter:'invert(100%)'}} src="/save.png" alt="" />
                  </button>
                </div>
            </div>
        </div>
        <div className="features">
          <div className="wrapper">
              <div className="list-wrapper">
                <div className='feature'>
                  <div className='feature-text'>
                    <h1>{post.title}</h1>
                    <div>
                      <span>{post.homeType}</span>
                      <span>{post.propertyType}</span>
                    </div>
                  </div>
                  <h2 className="room-price">$ {post.price}</h2>
                  <div className="data-wrapper">
                    <p className="title">General</p>
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
                    <p className="title">Sizes</p>
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
        <aside className='sec-map_container'>
              <div className='map-block'><Map items={post} /></div>
          </aside>
      </section>
    );
  }
  
  export default SinglePage;