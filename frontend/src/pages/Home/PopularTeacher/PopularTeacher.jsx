import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import img from '../../../assets/home/nodp.jpg'

import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
const PopularTeacher = () => {
    const [Instructors,setIntructors]= useState([]);
    const axiosFetch = useAxiosFetch();
    useEffect(()=>{
        axiosFetch.get('/popular-instructors').then((data)=> {
            setIntructors(data.data);
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    //console.log(Instructors)
  return (
    
    <div className='md:w-[80%] mx-auto my-36'>
      <div>
        <h1 className='text-5xl font-bold text-center dark:text-white'>Our <span className='text-secondary'>Best</span>Instructors</h1>
        <div className='w-[35%] text-center mx-auto my-4'>
            <p className='text-gray-500'>Explore our Best Instructors here. This is based on how many students enrolled</p>
        </div>
      </div>
      {
        Instructors ? <>
        <div className='grid mb-28 md:grid-cols-2 lg:grid-cols-4 w-[90%] gap-4 mx-auto'>
            {
                Instructors?.slice(0,8).map((instructor,i)=>(
                    <div key={i} className='flex dark:text-white  hover:ring-[2px] hover:ring-secondary hover:-translate-y-2 duration-200 cursor-pointer flex-col shadow-md py-8 px-10 md:px-8 rounded-md'>
                        <div className='flex-col flex gap-6 md:gap-8 '>
                            <img className='rounded-full border-4 border-gray-300 h-24 w-24 mx-auto'src={instructor?.instructor?.photoUrl || `${img}`}/>
                        </div>
                        <div className='flex flex-col text-center'>
                            <p className='font-medium text-lg dark:text-white text-gray-800 '>
                                {instructor?.instructor?.name}
                            </p>
                            <p className='text-gray-500 whitespace-nowrap '>
                                Instructors
                            </p>
                            <p className='text-gray-500 mb-4 whitespace-nowrap'>Total Students : {instructor?.totalEnrolled}</p>
                        
                        </div>
                        <div className="flex flex-row items-center justify-center gap-4 text-gray-800 my-auto text-2xl mx-auto md:mx-0">
                  <a className="hover:cursor-pointer text-secondary duration-300">
                    <FaLinkedin />
                  </a>
                  <a className="hover:cursor-pointer text-secondary duration-300">
                    <FaFacebook />
                  </a>
                  <a className="hover:cursor-pointer text-secondary duration-300">
                    <FaInstagram />
                  </a>
                </div>
                    </div>
                    
                ))
            }
        </div>
        </> : <><p className='md:h-8xl'>No instructor available</p></>
      }
    </div>
    
  )
}

export default PopularTeacher
