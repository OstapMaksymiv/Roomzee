import React, { useContext, useEffect, Suspense } from 'react'
import './profilePage.scss'
import Chat from '../../components/Chat/Chat';
import apiRequest from '../../library/apiRequest';
import { AuthContext } from '../../context/AuthContaxt';
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import { Fade} from "react-awesome-reveal";
const ProfilePage = () => {
  gsap.registerPlugin(useGSAP,CSSRulePlugin,ScrollTrigger);
  const data = useLoaderData();
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    gsap.from('.info span',{
      x: 100,
      delay:0.5,
      opacity: 0,
      duration: 0.7,
      stagger: 0.2,
    })
    gsap.from('.user-action a',{
      y: 30,
      delay:0.7,
      opacity: 0,
      duration: 0.7,
      stagger: 0.2,
    })
    gsap.from('.details hr',{
      width:0,opacity:0,duration:1, delay:1
 
    })
    gsap.from('.user-block_lists a',{
      y: 30,
      delay:1.3,
      opacity: 0,
      duration: 0.7,
      stagger: 0.2,
    })
  }, [])
  return (
    <div className='profile-block' >

      <div className="profilePage">
        <div className="details">
          <div>

        
            <div className="title">
              <Fade triggerOnce={true}>
                <h1>User Information</h1>
              </Fade>
            </div>
            <div className="info">
              <span>
                Avatar:
                <img className='user-avatar' src={currentUser.avatar || "noavatar.jpg"} alt="" />
              </span>
              <span>
                Username: <b>{currentUser.username}</b>
              </span>
              <span>
                E-mail: <b>{currentUser.email}</b>
              </span>
              <div className='user-action'>
                <Link onClick={handleLogout}>
                  <button className='action-f_btn'  >Logout <img src="/logout.png" alt="" /></button>
                </Link>
                <Link to="/profile/update-profile">
                  <button className='action-s_btn'>Update Profile</button>
                </Link>
              </div>
            </div>
            <hr />
            <div className="title">
              <Fade delay={1000} triggerOnce={true}>
                <h1>Your Lists</h1>
              </Fade>
            </div>
            <div className='user-block_lists'>
              <Link to='/profile/user-posts'>
                  <div>
                      <article>
                          <img src="/property.png" alt="" />
                          <h2>Posts</h2>
                      </article>
                      <p>View and manage all the properties, listings, and updates you’ve shared with others.</p>
                  </div>
              </Link>
              <Link to={'/profile/user-saved-posts'}>
                  <div>
                      <article>
                          <img src="/save-instagram.png" alt="" />
                          <h2>Saved posts</h2>
                      </article>
                      <p>Access your favorite saved properties and content for easy reference.</p>
                  </div>
              </Link>


  
          </div>
          </div>
          </div>

        <div className="chatContainer">
        <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={data.chatResponse}
                errorElement={<p>Error loading chats!</p>}
              >
                {(chatResponse) => <Chat chats={chatResponse.data}/>}
              </Await>
            </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage