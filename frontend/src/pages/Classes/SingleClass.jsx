import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useUser } from '../../hooks/useUser';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from "react-toastify";
import bannerImg1 from '../../assets/home/bann1.png'
import girImage from "../../assets/home/girl.jpg"
import { DialogActions } from "@mui/material";
import { BiTime } from "react-icons/bi";
import { FaLanguage, FaLevelUpAlt, FaUser, FaUsers } from "react-icons/fa";
import { GiClassicalKnowledge } from "react-icons/gi";
import { MdBookOnline } from "react-icons/md";

const SingleClass = () => {
    const course = useLoaderData();
    const { currentUser } = useUser();
    const role = currentUser?.role;
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();
    // console.log(course)
    const handleSelect=(id) => {
        //console.log(id);
        axiosSecure.get(`/enrolled-classes/${currentUser?.email}`)
        .then((res) => setEnrolledClasses(res.data))
        .catch((err) => console.log(err))
      
        if(!currentUser) {
          alert("Please login first")
          return navigate('/login')
      
        }
        axiosSecure.get(`/cart-item/${id}?email=${currentUser?.email}`)
        .then(res => {
          if(res.data.classId === id) {
            return alert("Already selected")
          }else if(enrolledClasses.find(item => item.classes._id === id) ) {
            return alert("Already enrolled")
          }else{
            const data = {
              classId : id,
              userMail : currentUser?.email,
              data: new Date()
            }
            /*axiosSecure.post('/add-to-cart',data)
            .then(res => {
              alert("Added to the cart successfully")
              console.log(res.data)
            })*/
            toast.promise(axiosSecure.post('/add-to-cart',data)
            .then(res => {
              console.log(res.data)
              alert("successfully added to the cart")
            }),
            { 
              pending:"Adding to cart....",
              success:{
                render(){
                  return "Added to cart"
                }
              },
              error:{
                render({data}){
                  // When the promise reject, data will contains the error
                  return `Error : ${data.message}`
                }
              }
              
            });
          }
        })
      }
  return (
    <>
      <div
        className="font-gilroy font-medium text-gray dark:text-white text-lg leading-[27px] w-[90%] mx-auto"
        data-new-gr-c-s-check-loaded="14.1157.0"
        data-gr-ext-installed=""
      >
        {/* breadcrumb or header */}
        <div className=" breadcrumbs bg-gray-700 py-6 mt-20 section-padding bg-cover bg-center bg-no-repeat">
          <div className="container text-center">
            <h1 className='font-bold text-5xl text-white'>Course Details</h1>
          </div>
        </div>
        
        <div className=" nav-tab-wrapper tabs  section-padding mt-8">
          <div className="container">
            <div className="grid grid-cols-12 md:gap-[30px]">
            <div className="lg:col-span-8 col-span-12">
                <div className="single-course-details">
                  <div className="xl:h-[470px] h-[350px] mb-10 course-main-thumb">
                    <img
                      src={course.image}
                      alt=""
                      className=" rounded-xl object-fill w-full h-full block"
                    />
                  </div>
                  <h2 className="text-2xl mb-2">{course?.name}</h2>

                  <div className="author-meta mt-6 sm:flex  lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center">
                    <div className="flex space-x-4 items-center group">
                      <div className="flex-none">
                        <div className="h-12 w-12 rounded">
                          <img
                            src={girImage}
                            alt=""
                            className=" object-cover w-full h-full rounded"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className=" text-secondary  ">
                          Trainer
                          <a href="#" className=" text-black">
                            : {course?.instructorName}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className=" text-secondary  ">
                        Last Update: 
                        <a href="#" className=" text-black ml-1">
                         {new Date(course?.submitted).toLocaleDateString()}
                        </a>
                      </span>
                    </div>
                  </div>

                  <div className="nav-tab-wrapper mt-12">
                    <ul id=" tabs-nav" className=" course-tab mb-8">
                      <li className="hover:text-secondary active underline">
                        <a href="#tab1">Overview</a>
                      </li>
                      <li className="hover:text-secondary active underline">
                        <a href="#tab2">Carriculum</a>
                      </li>
                      <li className="hover:text-secondary active underline">
                        <a href="#tab3">Instructor</a>
                      </li>
                      <li className="hover:text-secondary active underline">
                        <a href="#tab4">Reviews</a>
                      </li>
                    </ul>
                    <div id="tabs-content ">
                      <div id="tab1" className="tab-content">
                        <div>
                          <h3 className=" text-2xl mt-8">Course Description</h3>
                          <p className="mt-4">
                            {course?.description}
                          </p>
                          <div className="bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8">
                            <h4 className=" text-2xl">What You will Learn?</h4>
                            <ul className=" grid sm:grid-cols-2 grid-cols-1 gap-6">
                              <li className=" flex space-x-3">
                                <div className="flex-none  relative top-1 ">
                                  <img src="/correct-mark.png" alt="" />
                                </div>
                                <div className="flex-1">
                                  Learn how perspective works and how to
                                  incorporate your art
                                </div>
                              </li>

                              <li className=" flex space-x-3">
                                <div className="flex-none  relative top-1 ">
                                  <img src="/correct-mark.png" alt="" />
                                </div>
                                <div className="flex-1">
                                  Learn how perspective works and how to
                                  incorporate your art
                                </div>
                              </li>

                              <li className=" flex space-x-3">
                                <div className="flex-none  relative top-1 ">
                                  <img src="/correct-mark.png" alt="" />
                                </div>
                                <div className="flex-1">
                                  Learn how perspective works and how to
                                  incorporate your art
                                </div>
                              </li>

                              <li className=" flex space-x-3">
                                <div className="flex-none  relative top-1 ">
                                  <img src="/correct-mark.png" alt="" />
                                </div>
                                <div className="flex-1">
                                  Learn how perspective works and how to
                                  incorporate your art
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h4 className=" text-2xl">What You will Learn?</h4>
                            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
                              <div className=" bg-white  rounded px-5 py-[18px] flex   shadow-box2 space-x-[10px] items-center">
                                <span className="flex-none">
                                  <img src="/logo.png" alt="" />
                                </span>
                                <span className="flex-1 text-black">
                                  Software
                                </span>
                              </div>
                              <div className=" bg-white  rounded px-5 py-[18px] flex  shadow-box2 space-x-[10px] items-center">
                                <div className="flex-none">
                                  <img src="/logo.png" alt="" />
                                </div>
                                <span className="flex-1 text-black">
                                  Database
                                </span>
                              </div>
                              <div className=" bg-white  rounded px-5 py-[18px] flex  shadow-box2 space-x-[10px] items-center">
                                <div className="flex-none">
                                  <img src="/logo.png" alt="" />
                                </div>
                                <span className="flex-1 text-black">
                                  Networking
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="tab2" className="tab-content">
                        <div>
                          <h3 className=" text-2xl mt-8">Lesson Plan</h3>
                          <p className="mt-4">
                            This tutorial will help you learn quickly and
                            thoroughly. Lorem ipsum, or lipsum as it sometimes
                            known, is dummy text used in laying out print,
                            graphic or web designs. Lorem ipsum dolor sit amet,
                            consectetuer adipiscing elit. Donec odio. Quisque
                            volutpat mattis eros.
                            <br /> <br /> You’ll be exposed to principles and
                            strategies, but, more importantly, you’ll learn how
                            actually apply these abstract concepts by coding
                            three different websites for three very different
                            the audiences. Lorem ipsum is dummy text used in
                            laying out print, graphic or web designs Lorem ipsum
                            blinding shot chinwag knees.
                          </p>
                          <div className="bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8">
                            <h4 className=" text-2xl">This Course is For Beginners </h4>
                          </div>
                          <div>
                            <h4 className=" text-2xl">What You will Learn?</h4>
                            <p className="mt-4">{course?.description}</p>
                          </div>
                        </div>
                      </div>
                    
                    </div>

                  </div>
                  
                </div>
              </div>

              {/* right side */}
              <div className="lg:col-span-4 col-span-12 mt-8 md:mt-0">
                <div className="sidebarWrapper space-y-[30px]">
                  <div className="widget custom-text space-y-5 ">
                    <a className="h-[220px]  rounded relative block" href="#">
                      <img
                         src={course.image}
                        alt=""
                        className=" block w-full h-full object-cover rounded "
                      />
                      <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <img src="/play.png" alt="" />
                      </div>
                    </a>
                    <h3>${course.price}</h3>
                    <button onClick={() => handleSelect(course._id)} title={role === 'admin' || role === 'instructor' ? 'Instructor/Admin Can not be able to select ' ? course.availableSeats <1 : 'No seat avalible' : 'You can select this classes' } disabled={role === 'admin' || role === 'instructor' || course.availableSeats < 1}  className="btn btn-primary w-full text-center bg-secondary py-2 px-6 text-white ">
                      Enroll Now
                    </button>
                    <ul className="list  ">
                      <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <FaUser className="inline-flex"/>
                          <div className=" text-black font-semibold">
                            Instructor
                          </div>
                        </div>
                        <div className="flex-none">{course.instructorName}</div>
                      </li>

                      <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <MdBookOnline/>
                          <div className=" text-black font-semibold">
                            Lectures
                          </div>
                        </div>
                        <div className="flex-none">23</div>
                      </li>

                      <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <BiTime />
                          <div className=" text-black font-semibold">
                            Duration
                          </div>
                        </div>
                        <div className="flex-none">2Hr 36Minutes</div>
                      </li>

                      <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <FaUsers />
                          <div className=" text-black font-semibold">
                            Enrolled
                          </div>
                        </div>
                        <div className="flex-none">{course?.totalEnrolled}</div>
                      </li>

                      <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <FaLevelUpAlt />
                          <div className=" text-black font-semibold">
                            Course level
                          </div>
                        </div>
                        <div className="flex-none">Intermediate</div>
                      </li>

                      <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex-1 space-x-3 flex items-center">
                          <FaLanguage />
                          <div className=" text-black font-semibold">
                            Language
                          </div>
                        </div>
                        <div className="flex-none">English</div>
                      </li>
                    </ul>
                    <ul className="flex space-x-4 items-center pt-3 ">
                      <li className=" text-black font-semibold">Share On:</li>
                      <li>
                        <a href="#" className="flex h-10 w-10">
                          <img src="/logo.png" alt="" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex h-10 w-10">
                          <img src="/logo.png" alt="" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex h-10 w-10">
                          <img src="/logo.png" alt="" />
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex h-10 w-10">
                          <img src="/logo.png" alt="" />
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="wdiget">
                    <h4 className=" widget-title">Related Courses</h4>
                    <ul className="list">
                      <li className=" flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b">
                        <div className="flex-none ">
                          <div className="h-20 w-20  rounded">
                            <img
                              src={bannerImg1}
                              alt=""
                              className=" w-full h-full object-cover rounded"
                            />
                          </div>
                        </div>
                        <div className="flex-1 ">
                          <div className="flex space-x-3 mb-2">
                            <iconify-icon
                              icon="heroicons:star-20-solid"
                              className=" text-tertiary"
                            ></iconify-icon>
                            <iconify-icon
                              icon="heroicons:star-20-solid"
                              className=" text-tertiary"
                            ></iconify-icon>
                            <iconify-icon
                              icon="heroicons:star-20-solid"
                              className=" text-tertiary"
                            ></iconify-icon>
                            <iconify-icon
                              icon="heroicons:star-20-solid"
                              className=" text-tertiary"
                            ></iconify-icon>
                            <iconify-icon
                              icon="heroicons:star-20-solid"
                              className=" text-tertiary"
                            ></iconify-icon>
                          </div>
                          <div className="mb-1 font-semibold text-black">
                            Greatest Passion In...
                          </div>
                          <span className=" text-secondary font-semibold">
                            $38.00
                          </span>
                        </div>
                      </li>
                      <li className=" flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b">
                        <div className="flex-none ">
                          <div className="h-20 w-20  rounded">
                            <img
                               src={bannerImg1}
                              alt=""
                              className=" w-full h-full object-cover rounded"
                            />
                          </div>
                        </div>
                        <div className="flex-1 ">
                          <div className="mb-1 font-semibold text-black">
                            Greatest Passion In...
                          </div>
                          <span className=" text-secondary font-semibold">
                            $38.00
                          </span>
                        </div>
                      </li>
                      <li className=" flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b">
                        <div className="flex-none ">
                          <div className="h-20 w-20  rounded">
                            <img
                               src={bannerImg1}
                              alt=""
                              className=" w-full h-full object-cover rounded"
                            />
                          </div>
                        </div>
                        <div className="flex-1 ">
                          <div className="mb-1 font-semibold text-black">
                            Greatest Passion In...
                          </div>
                          <span className=" text-secondary font-semibold">
                            $38.00
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleClass;

