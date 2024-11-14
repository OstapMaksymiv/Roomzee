import React, { useContext, useEffect, Suspense } from 'react'
import './profilePage.scss'
import Chat from '../../components/Chat/Chat';
import apiRequest from '../../library/apiRequest';
import { AuthContext } from '../../context/AuthContaxt';
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
const ProfilePage = () => {
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
  return (
    <div className="profilePage">
      <div className="details">
        <div>

        {/* <hr /> */}
          <div className="title">
            <h1>User Information</h1>
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
              <a href="/profile/update-profile">
                <button className='action-s_btn'>Update Profile</button>
              </a>
            </div>
          </div>
          <hr />
          <div className="title">
            <h1>Your Lists</h1>
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
  )
}

export default ProfilePage