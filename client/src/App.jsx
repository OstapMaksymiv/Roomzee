import React, {useState, useRef, useEffect, createRef} from 'react'
import HomePage from './pages/homePage/HomePage'
import {  createBrowserRouter, RouterProvider } from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import {  A11y, Navigation } from 'swiper/modules';
import { v4 } from 'uuid';
import RoomsPage from './pages/roomsPage/RoomsPage';
import {Layout, RequireAuth} from './components/Layout/Layout';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import ResetPassword from './pages/reserPasswordPage/ResetPassword';
import Contacts from './pages/Contacts/Contacts';
import Faq from './pages/FAQ/Faq';
import SinglePage from './pages/singlePage/SinglePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProfileUpdatePage from './pages/ProfileUpdatePage/ProfileUpdatePage';
import NewPostPage from './pages/newPostPage/NewPostPage';
import UserPostsPage from './pages/UserPostsPage/UserPostsPage';
import { listPageLoader, singlePageLoader, profilePageLoader } from './library/loaders';
import UserSavedPostsPage from './pages/UserSavedPostsPage/UserSavedPostsPage';
function App() {
  const [swipperArray, setSwiperArray] = useState([])
  const [modalWrapper, setModalWrapper] = useState('modal-wrapper');
  const [modalCoordWrapper, setModalCoordWrapper] = useState('modal-coordinates-wrapper');
  const body = document.querySelector('body');
  const modalMenu = useRef(null)
  const modalWrapperRef = createRef();
  const modalCoordWrapperRef = createRef();
  const [isModalOpen, setIsMadalOpen] = useState(false);
  const [canbeClick, setCanbeClick] = useState(true);

  const [modalWrapperSlider, setModalWrapperSlider] = useState('modal-wrapper');
  const [modalCoordWrapperSlider, setModalCoordWrapperSlider] = useState('modal-coordinates-wrapper');
  const modalMenuSlider = useRef(null)
  const modalWrapperRefSlider = createRef();
  const modalCoordWrapperRefSlider = createRef();
  const [isModalOpenSlider, setIsMadalOpenSlider] = useState(false);
  const [canbeClickSlider, setCanbeClickSlider] = useState(true);

  function fullswipperArray(e, images){
    let targetIndex = images.findIndex((element) => element === e.target.src);
    const updatedImages = [...images];
    const [targetImage] = updatedImages.splice(targetIndex, 1);
    updatedImages.unshift(targetImage);
    setSwiperArray(updatedImages);
  }
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
  function closeInterfaceSlider(e){
    if (modalMenuSlider.current.contains(e.target)) {
        return;
    }
    if (modalMenuSlider.current && modalMenuSlider.current.classList.contains('modal-menu-on') && isModalOpenSlider === true) {
        if (!modalMenuSlider.current.classList.contains(e.target)) {
            body.classList.remove('lock');
            modalMenuSlider.current.classList.remove('modal-menu-on');
            modalMenuSlider.current.classList.add('modal-menu-closing');
            
            setModalWrapperSlider('modal-wrapper modal-wrapper-on');
            setTimeout(() => {
                setModalWrapperSlider('modal-wrapper');
                modalMenuSlider.current.removeAttribute('style');
                modalMenuSlider.current.classList.remove('modal-menu-closing');

                setCanbeClickSlider(true);
                setIsMadalOpenSlider(false)
            }, 500);
        }
    }
  }
  const [modalMenuWidth, setModalMenuWidth] = useState(500);
  const [modalMenuWidthSlider, setModalMenuWidthSlider] = useState(500);
  useEffect(() => {
      if (modalMenu.current ||  modalMenuSlider.current) {
          setModalMenuWidth(modalMenu.current.offsetWidth);
          setModalMenuWidthSlider(modalMenuSlider.current.offsetWidth);
      }
  }, [modalMenu.current, modalMenuSlider.current]);
  function handleModuleWindow(event){
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
  function handleModuleWindowSlider(event){
    console.log('asd');
    setCanbeClickSlider(false);
    const targetSlide = event.currentTarget;
    setModalWrapperSlider('modal-wrapper modal-wrapper-on');
    modalMenuSlider.current.setAttribute('style', 'transform: scale(1)');
    const wrapperPadding = Number(getComputedStyle(modalWrapperRefSlider.current)['padding-left'].slice(0, -2));
    const menuSidesWidth = (modalMenuWidthSlider - 310) / 2;
    const modalX = targetSlide.getBoundingClientRect().x - wrapperPadding - menuSidesWidth;
    const modalY = targetSlide.getBoundingClientRect().y / 3.5;
    body.classList.add('lock');
    setTimeout(() => {
        setModalWrapperSlider('modal-wrapper modal-wrapper-on modal-wrapper-blackout');
        modalMenuSlider.current.setAttribute('style', `top: ${modalY}px; left: ${modalX}px`);
    }, 10);
    setTimeout(() => {
        modalMenuSlider.current.setAttribute('style', ` opacity: 1;transform: scale(1);  transition: 0.7s ease`);
        modalMenuSlider.current.classList.add('modal-menu-on');
    }, 60);
    setTimeout(() => {
        setIsMadalOpenSlider(true);
    }, 560);
  }



  const router = createBrowserRouter([
      {
        element: <Layout/>,
        children:[
          {
            path: "/",
            element: <HomePage  handleModuleWindow={handleModuleWindow}/>,
          },
          {
            path: "/rooms",
            element: <RoomsPage/>,
            loader:listPageLoader
          },
          {
            path:"/rooms/:id",
            element:<SinglePage handleModuleWindowSlider={handleModuleWindowSlider} fullswipperArray={fullswipperArray}/>,
            loader:singlePageLoader
          },
          {
            path: "/login",
            element: <SignIn/>
          },
          {
            path: "/register",
            element: <SignUp/>
          },
          {
            path: "/contact-us",
            element: <Contacts/>
          },
          {
            path: "/faq",
            element: <Faq/>
          },
          {
            path: "/reset-password",
            element: <ResetPassword/>
          }
        ]
      },
      {
        path:'/',
        element: <RequireAuth/>,
        children:[
          {
            path: "/profile",
            element: <ProfilePage/>,
            loader: profilePageLoader
          },

          {
            path:'/profile/update-profile',
            element:<ProfileUpdatePage/>
          },
          {
            path:'/profile/user-posts/new-post',
            element:<NewPostPage/>
          },
          {
            path:'/profile/user-posts',
            element:<UserPostsPage/>,
            loader: profilePageLoader
          },
          {
            path:'/profile/user-saved-posts',
            element:<UserSavedPostsPage/>,
            loader: profilePageLoader
          }
        ]
      }
  ]);
  const [query, setQuery] = useState({
    address: "",
    minPrice: 0,
    maxPrice: 0,
  });
  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <div className={modalWrapper} ref={modalWrapperRef} onClick={(e) => closeInterface(e)}>
          <div className={modalCoordWrapper} ref={modalCoordWrapperRef} >
            <div className="modal-menu" ref={modalMenu} >
              <div className='adv_modalBLock' >
                <div className='searchForm' >
                  <img className='searchImg' src="/searchIcon.svg" alt="" />
                  <input
                    type="text"
                    name="address"
                    placeholder="City"
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="minPrice"
                    min={0}
                    max={10000000}
                    placeholder="Min Price"
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    min={0}
                    max={10000000}
                    placeholder="Max Price"
                    onChange={handleChange}
                  />
                </div>
                <a href={`/rooms?address=${query.address}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
                  <button>Search your dream house <img  src="/arrow.png" alt="" /></button>
                </a>

              </div>
 
            </div>
          </div>
        </div>
      <div className={modalWrapperSlider} ref={modalWrapperRefSlider} onClick={(e) => closeInterfaceSlider(e)}>
        <div className={modalCoordWrapperSlider} ref={modalCoordWrapperRefSlider} >
          <div className="modal-menu" ref={modalMenuSlider} >
            <div className='adv_modalBLock'>
            <Swiper
            className='rooms_swiper'
              spaceBetween={30}
              direction={'horizontal'}
              
              slidesPerView={1}
              loop={true}
   
              speed={1200}
              navigation={true}
              modules={[A11y, Navigation]}>

                {swipperArray.map((el) => (
                  <SwiperSlide key={v4()}><img 
 
                  src={el} alt="" /></SwiperSlide>
                ))}

            </Swiper>
            </div>
          </div>
        </div>
      </div>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
