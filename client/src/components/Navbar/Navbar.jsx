import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import { Squash as Hamburger } from 'hamburger-react'
import './navbar.scss'
const Navbar = () => {
    const [isOpen , setIsOpen] = useState(false)
    const [burgerSize , setBurgerSize] = useState(false)
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
    <nav style={isOpen ? {backgroundColor: 'transparent'} : {backgroundColor: 'rgba(13, 13, 13, 0.85)'}}>
        <div className='leftSide'>
            <a className="leftLink" href='/'>
                <img src="/icon.png" alt="" />
                <span>Roomzee</span>
            </a>
        </div>
        <div className='rightSide'>
            <a className="link" href="/">Home</a>
            <a className="link" href="/">Rooms</a>
            <a className="link" href="/">Contacts</a>
            <a href="/login" className='login'>
                <span>Sign in</span>
                <img src="/user_2.png" alt="" />
            </a>
            <a href="/register" className="signUp">
              Sign up
            </a>
            <div className='menuIcon' onClick={() => setIsOpen((prev) => !prev)}>
                <Hamburger toggled={isOpen} size={burgerSize ? 25 : 32} />
            </div>
            <div className={isOpen ? "menu active-menu" : "menu"}>
                <ul className='firstUl'>
                    <li className='firstLi'>Pages</li>
                    <li><a className='menu_link' href="">Home</a></li>
                    <li><a className='menu_link' href="">Rooms</a></li>
                </ul>
                
                <ul className='secondUl'>
                    <li className='firstLi'>Information</li>
                    <li><a className='menu_link' href="">Contact us</a></li>
                    <li><a className='menu_link' href="">FAQ</a></li>
                </ul>
                <ul className='thirdUl'>
                    <li className='firstLi'>Authentication</li>
                    <li><a className='menu_link' href="">Sign in</a></li>
                    <li><a className='menu_link' href="">Sign up</a></li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar