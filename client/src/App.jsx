import React, {useState, useRef, useEffect, createRef} from 'react'
import Navbar from './components/Navbar/Navbar'

import HomePage from './pages/homePage/HomePage'
import Footer from './components/Footer/Footer';
import { BrowserRouter, createBrowserRouter, RouterProvider, useLocation, HashRouter } from "react-router-dom";
import RoomsPage from './pages/roomsPage/RoomsPage';
import Layout from './components/Layout/Layout';
function App() {
  const [modalWrapper, setModalWrapper] = useState('modal-wrapper');
  const [modalCoordWrapper, setModalCoordWrapper] = useState('modal-coordinates-wrapper');
  const body = document.querySelector('body');
  const modalMenu = useRef(null)
  const modalWrapperRef = createRef();
  const modalCoordWrapperRef = createRef();
  const [isModalOpen, setIsMadalOpen] = useState(false);
  const [canbeClick, setCanbeClick] = useState(true);
  function closeInterface(e){
    if (modalMenu.current.contains(e.target)) {
        return;
    }
    if (modalMenu.current && modalMenu.current.classList.contains('modal-menu-on') && isModalOpen === true) {
        if (!modalMenu.current.classList.contains(e.target)) {
            body.classList.remove('lock');
            modalMenu.current.classList.remove('modal-menu-on');
            modalMenu.current.classList.add('modal-menu-closing');
            
            setModalWrapper('modal-wrapper modal-wrapper-on');
            setTimeout(() => {
                setModalWrapper('modal-wrapper');
                modalMenu.current.removeAttribute('style');
                modalMenu.current.classList.remove('modal-menu-closing');

                setCanbeClick(true);
                setIsMadalOpen(false)
            }, 500);
        }
    }
  }
  const [modalMenuWidth, setModalMenuWidth] = useState(500);
  useEffect(() => {
      if (modalMenu.current) {
          setModalMenuWidth(modalMenu.current.offsetWidth);
      }
  }, [modalMenu.current]);
  function handleModuleWindow(event) {
    console.log('asd');
    setCanbeClick(false);
    const targetSlide = event.currentTarget;
    setModalWrapper('modal-wrapper modal-wrapper-on');
    modalMenu.current.setAttribute('style', 'transform: scale(1)');
    const wrapperPadding = Number(getComputedStyle(modalWrapperRef.current)['padding-left'].slice(0, -2));
    const menuSidesWidth = (modalMenuWidth - 310) / 2;
    const modalX = targetSlide.getBoundingClientRect().x - wrapperPadding - menuSidesWidth;
    const modalY = targetSlide.getBoundingClientRect().y / 3.5;
    body.classList.add('lock');
    setTimeout(() => {
        setModalWrapper('modal-wrapper modal-wrapper-on modal-wrapper-blackout');
        modalMenu.current.setAttribute('style', `top: ${modalY}px; left: ${modalX}px`);
    }, 10);
    setTimeout(() => {
        modalMenu.current.setAttribute('style', ` opacity: 1;transform: scale(1);  transition: 0.7s ease`);
        modalMenu.current.classList.add('modal-menu-on');
    }, 60);
    setTimeout(() => {
        setIsMadalOpen(true);
    }, 560);
  }
  const router = createBrowserRouter([
      {
        path: "/",
        element: <Layout/>,
        children:[
          {
            path: "/",
            element: <HomePage handleModuleWindow={handleModuleWindow} />,
          },
          {
            path: "/rooms",
            element: <RoomsPage/>
          },
        ]
      },
  ]);
  return (
    <>
      <div className={modalWrapper} ref={modalWrapperRef} onClick={(e) => closeInterface(e)}>
          <div className={modalCoordWrapper} ref={modalCoordWrapperRef} >
            <div className="modal-menu" ref={modalMenu} >
              <div className='adv_modalBLock'>
                <div className='searchForm'>
                  <img className='searchImg' src="/searchIcon.svg" alt="" />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                  />
                  <input
                    type="number"
                    name="minPrice"
                    min={0}
                    max={10000000}
                    placeholder="Min Price"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    min={0}
                    max={10000000}
                    placeholder="Max Price"
                  />
                </div>
                <button>Search your dream house</button>
              </div>
            </div>
          </div>
        </div>
        <RouterProvider router={router}/>
    </>
  )
}

export default App
