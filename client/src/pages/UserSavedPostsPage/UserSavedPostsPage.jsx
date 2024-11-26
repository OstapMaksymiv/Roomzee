import React, {useEffect,Suspense, useRef, useState} from 'react'
import './userSavedPostsPage.scss'
import Card from '../../components/Card/Card';
import {  useLoaderData, Await } from 'react-router-dom'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import { Fade } from "react-awesome-reveal";
const UserSavedPostsPage = () => {
  gsap.registerPlugin(useGSAP,CSSRulePlugin,ScrollTrigger);
    const data = useLoaderData();
    const [currentItems, setCurrentItems] = useState([])
    const [isFetched, setIsFetched] = useState(false)
    const list = useRef('');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 9;
    const paginationItems = currentItems.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );

    const totalPages = Math.ceil(currentItems.length / rowsPerPage);

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
    const fetchData =  (items) => {
      setCurrentItems(items.data.savedPosts);
    };
    useEffect(() => {
      gsap.from('.userPostsPage-info h1',{
        y: -40,
       
        opacity: 0,
        duration: 0.7,
  
      })
    },[])
  
    return (
      <section className='userPostsPage'>
          <div className='userPostsPage-info' style={{display:'flex',gap:'20px', alignItems:'center'}}>
              <h1>Configure your saved posts</h1>
          </div>
          <div style={{display:'flex',flexDirection:"column", alignItems:'center', gap:'25px'}}>
              <Suspense fallback={
                  <div className='loader-block'>
                    <span className="loader"></span>
                  </div>
                }>
                  <Await resolve={data.postResponse} errorElement={<p>Error with getting posts!</p>}>
                    {(postResponse) => {
   
                      fetchData(postResponse);
                      setIsFetched(true)
                      return (
                        (isFetched && paginationItems.length === 0 ) ? (<div className='no-results'><h1>There are no saved posts</h1></div>):
                        <>
                        <Fade delay={300} triggerOnce={true}>
                          <div ref={list} className="posts_container">
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
                          </Fade>
                        </>
                      );
                    }}
                  </Await>
                </Suspense>
            </div>
      </section>
    )
  }

export default UserSavedPostsPage