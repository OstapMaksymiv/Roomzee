import React, { Suspense, useEffect, useRef, useState } from 'react';
import './roomsPage.scss';
import Filter from '../../components/Filter/Filter';
import Card from '../../components/Card/Card';
import { Await, useLoaderData } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
const RoomsPage = () => {
  gsap.registerPlugin(useGSAP,CSSRulePlugin,ScrollTrigger);
  const [modal, setModal] = useState('pre_modal');
  const [filterImg, setFilterImg] = useState('');
  const [currentItems, setCurrentItems] = useState([])
  const [isFetched, setIsFetched] = useState(false)
  const premodel = useRef('');
  const list = useRef('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 9;
  const posts = useLoaderData();
  const beforeRoomsPage = CSSRulePlugin.getRule(".roomsPage::before"); 
  const afterRoomsPage = CSSRulePlugin.getRule(".roomsPage::after"); 

  const paginationItems = currentItems.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const totalPages = Math.ceil(currentItems.length / rowsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const fetchData =  (items) => {
    setCurrentItems(items.data);
  };
  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth > 1440) {
        setModal('pre_modal');
      }
      if (premodel.current && list.current) {
        premodel.current.style.height = `${list.current.offsetHeight}px`;
      }
    };
    updateHeight();

    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const handleGiveClass = () => {
    if (modal === 'pre_modal') {
      setFilterImg('invert');
      setModal('pre_modal pre_modal-active');
    } else {
      setModal('pre_modal');
      setFilterImg('');
    }
  };

  const handleCleanClass = () => {
    if (modal === 'pre_modal pre_modal-active') {
      setModal('pre_modal');
      setFilterImg('');
    }
  };
  useGSAP(() => {
    gsap.from('.filter',{
      y:100,
      opacity:0,
      duration:1
    })
    gsap.from('.nav-rooms h1',{
      x:100,
      opacity:0,
      duration:0.7
    })
    gsap.from(beforeRoomsPage, {
      cssRule: {transform: 'rotate(180deg) scale(1.1)',opacity:0 },
      duration: 1.5,
    });
    gsap.from(afterRoomsPage, {
      cssRule: {transform: 'rotate(75deg) scale(1.1)',opacity:0 },
      duration: 1.5,
    });
  })
  return (
    <>
      <div className={modal} ref={premodel}>
        <div className="modal-filter">
          <div>
            <Filter />
          </div>
        </div>
      </div>
      <div className="roomsPage" onClick={handleCleanClass}>
        <div className="nav-rooms">
          <h1>More than {currentItems.length} Results</h1>
          <div>
            <img className={filterImg} src="/setting.png" onClick={handleGiveClass} alt="Settings Icon" />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div className="rooms-block">
            <div className="filter_slicky-block">
              <aside className="filter-map_container">
                <Filter />
              </aside>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '25px' }}>
              <Suspense fallback={
                <div className='loader-block'>
                  <span className="loader"></span>
                </div>
              }>
                <Await resolve={posts.postResponse} errorElement={<p>Error with getting posts!</p>}>
                  {(postResponse) => {
 
                    fetchData(postResponse);
                    setIsFetched(true)
                    return (
                      (isFetched && paginationItems.length === 0 ) ? (<div className='no-results'><h1>There are no results</h1></div>):
                      <>
                        <div ref={list} className="list_container">
                          {paginationItems.map((post, index) => (
                            <Card key={post.id} postId={index} post={post} />
                          ))}
                        </div>
                        <div className="pagination">
                          <button
                            onClick={currentPage > 1 ? () => handlePageChange(currentPage - 1) : undefined}
                            className="letter-btn"
                          >
                            <img src="/back.png" alt="Back" />
                          </button>
                          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                            <button
                              key={page}
                              className={page === currentPage ? 'pagination-active pagination-page' : 'pagination-page'}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </button>
                          ))}
                          <button
                            onClick={currentPage !== totalPages ? () => handlePageChange(currentPage + 1) : undefined}
                            className="letter-btn"
                          >
                            <img src="/next.png" alt="Next" />
                          </button>
                        </div>
                      </>
                    );
                  }}
                </Await>
              </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomsPage;
