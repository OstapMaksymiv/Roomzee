import { useContext, useState } from "react";
import './profileUpdatePage.scss'
import { AuthContext } from '../../context/AuthContaxt';
import apiRequest from "../../library/apiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/UploadWidget/UploadWidget";
const ProfileUpdatePage = () => {
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
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit} >
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder='Username'
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder='Email'
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder='Password' />
          </div>
          <button type='submit'>Update</button>
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