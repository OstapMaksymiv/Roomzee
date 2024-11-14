import React, {useContext, useEffect, useState} from 'react'
import { Link, useLocation } from "react-router-dom";
import { Squash as Hamburger } from 'hamburger-react'
import './navbar.scss'
import { AuthContext } from '../../context/AuthContaxt';
import { useNotificationStore } from '../../library/notificationStore';
const Navbar = () => {
    const {currentUser} = useContext(AuthContext);
    const [isOpen , setIsOpen] = useState(false)
    const [burgerSize , setBurgerSize] = useState(false)
    const fetch = useNotificationStore((state) => state.fetch);
    const number = useNotificationStore((state) => state.number);
    const location = useLocation();
    if(currentUser) fetch();
    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth < 450){
                setBurgerSize(true);
            }
            if(window.innerWidth > 450){
                setBurgerSize(false);
            }
            if (window.innerWidth > 620) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize)
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [window.innerWidth])
  return (
    <nav style={isOpen ? {backgroundColor: 'transparent'} : {backgroundColor: 'rgba(13, 13, 13)'}}>
        <div className='leftSide'>
            <Link className="leftLink" to='/'>
                <img src="/logo.jpg" alt="" />
                <span>Roomzee</span>
            </Link>
        </div>
        <div className='rightSide'>
            <Link className="link" style={location.pathname === '/' ? {filter:'drop-shadow(0px 0px 12px white)', backgroundColor:'#f0f0f065'} : null} to="/">Home</Link>
            <Link className="link" style={location.pathname === '/rooms' ? {filter:'drop-shadow(0px 0px 12px white)', backgroundColor:'#f0f0f065'} : null} to="/rooms">Rooms</Link>
            <Link className="link" style={location.pathname === '/contact-us' ? {filter:'drop-shadow(0px 0px 12px white)', backgroundColor:'#f0f0f065'} : null} to="/contact-us">Contacts</Link>
            {   currentUser ? 
                <>
                <Link className='login profile' to='/profile'>
                    {/* <span>Profile</span> */}
                <div className='user'>
                    <img src={!currentUser.avatar ? '/noavatar.jpg' : currentUser.avatar} alt="" />
                    <span>{currentUser.username}</span>
                </div>
                    {/* <img src="/user_2.png" alt="" /> */}
                     {number > 0 && <div className="notification">{number}</div>}
                </Link>
                </> : 
                <>
                <Link to="/login" className='login' style={location.pathname === '/login' ? {borderColor:"rgba(255, 255, 255, 0.2)",boxShadow:'rgba(240, 240, 240, 0.856) 0px 0px 0px 1.25px inset, rgba(240, 240, 240, 0.063) 0px 2.28853px 2.28853px -2.5px inset, rgba(240, 240, 240, 0.024) 0px 10px 10px -3.75px inset'} : null}>
                    <span>Sign in</span>
                    <img src="/user_2.png" alt="" />
                </Link>
                <Link to="/register" className="signUp" style={location.pathname === '/register' ? {filter:'drop-shadow(0px 0px 12px white)'} : null}>
                Sign up
                </Link>
                </>
            }
            <div className='menuIcon' onClick={() => setIsOpen((prev) => !prev)}>
                <Hamburger toggled={isOpen} size={burgerSize ? 25 : 32} />
            </div>
            <div className={isOpen ? "menu active-menu" : "menu"}>
                <ul className='firstUl'>
                    <li className='firstLi'>Pages</li>
                    <li><Link className='menu_link' to="/">Home</Link></li>
                    <li><Link className='menu_link' to="/rooms">Rooms</Link></li>
                </ul>
                
                <ul className='secondUl'>
                    <li className='firstLi'>Information</li>
                    <li><Link className='menu_link' to="/contact-us">Contact us</Link></li>
                    <li><Link className='menu_link' to="/faq">FAQ</Link></li>
                </ul>
                <ul className='thirdUl'>
                    {currentUser ? (
                        <>
                            <li className='firstLi'>Authentication</li>
                            <li className='profile'>
                                <Link className='profile_link'  to='/profile'>
                                    <div className='user'>
                                        <span>Profile</span>
                                        {/* <img src="/user_2.png" alt="" /> */}
                                    </div>
                                    {number > 0 && <div className="notification">{number}</div>}
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='firstLi'>Authentication</li>
                            <li>
                                <Link className='menu_link' to="/login">Sign in</Link>
                            </li>
                            <li>
                                <Link className='menu_link' to="/register">Sign up</Link>
                            </li>
                        </>
                    )}
                </ul>
                
            </div>
        </div>
    </nav>
  )
}

export default Navbar