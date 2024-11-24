import { useContext, useEffect, useState } from "react";
import './profileUpdatePage.scss'
import { AuthContext } from '../../context/AuthContaxt';
import apiRequest from "../../library/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/UploadWidget/UploadWidget";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import { Fade} from "react-awesome-reveal";
const ProfileUpdatePage = () => {
  gsap.registerPlugin(useGSAP,CSSRulePlugin,ScrollTrigger);
  const {currentUser, updateUser} = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const {username, email ,password} = Object.fromEntries(formData)
    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`,{
        username,
        email,
        password,
        avatar:avatar[0]
      })
      updateUser(res.data);
      navigate("/profile");
    } catch (error) {
      
      setError(err.response.data.message);
    }
  }
  useEffect(() => {
    const beforeProfileUpdatePage = CSSRulePlugin.getRule(".profileUpdatePage::before"); 
    const afterProfileUpdatePage = CSSRulePlugin.getRule(".profileUpdatePage::after"); 
    gsap.from(beforeProfileUpdatePage, {
      cssRule: {transform: 'translateY(-50px) rotate(180deg) ',opacity:0 },
      duration: 1.5,
      
    });
    gsap.from(afterProfileUpdatePage, {
      cssRule: {transform: 'translateY(50px)',opacity:0 },
      duration: 1.5,
    });
    gsap.from('.formContainer h1',{
      y: -40,
      opacity: 0,
      duration: 0.7,
    })
    gsap.from('.item',{
      x: 100,
      opacity: 0,
      duration: 0.7,
      stagger: 0.2,
    })
  }, [])
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit} >
          <h1>Update Profile</h1>
          <div className="item">
            <Fade triggerOnce={true}>
              <label htmlFor="username">Username</label>
            </Fade>
            <input
              id="username"
              name="username"
              required
              type="text"
              placeholder='Username'
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
          <Fade triggerOnce={true}>
            <label htmlFor="email">Email</label>
          </Fade>
            <input
              id="email"
              name="email"
              required
              type="email"
              placeholder='Email'
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
              <Fade triggerOnce={true}>
                <label htmlFor="password">Password</label>
              </Fade>
            <input id="password" name="password" type="password" placeholder='Password' />
          </div>
          <Fade delay={700} triggerOnce={true}>
            <button className="upd-btn" type='submit'>Update</button>
          </Fade>
          {error && <span>error</span>}
        </form>
      </div>
      <div className="sideContainer">
    
          <img src={avatar[0] || currentUser.avatar || "/noavatar.jpg"} alt="" className="avatar" />
       
      <UploadWidget 
          uwConfig={{
            cloudName: "dg9zhqqmq",
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage