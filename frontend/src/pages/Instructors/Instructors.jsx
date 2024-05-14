import React, { useEffect, useState } from 'react'

import img from '../../../src/assets/home/nodp.jpg'
import useAxiosFetch from '../../hooks/useAxiosFetch';
function Instructors() {
  
    const [Instructors,setIntructors]= useState([]);
    const axiosFetch = useAxiosFetch();
    useEffect(()=>{
        axiosFetch.get('/instructors').then((data)=> {
            setIntructors(data.data);
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    //console.log(Instructors)
  return (
    
    <div className='md:w-[80%] mx-auto my-36'>
      <div>
        <h1 className='text-5xl font-bold text-center dark:text-white'>Our <span className='text-secondary'>Amazing </span>Instructors</h1>
        <div className='w-[35%] text-center mx-auto my-4'>
            <p className='text-gray-500'>Explore our Best Instructors here. This is based on how many students enrolled</p>
        </div>
      </div>
      {
        Instructors ? <>
        <div className='grid mb-28 md:grid-cols-2 lg:grid-cols-3 w-[90%] gap-4 mx-auto mt-20'>
            {
                Instructors?.map((instructor,i)=>(
                    <div key={i} className='flex dark:text-white hover:-translate-y-2 duration-200 cursor-pointer flex-col shadow-md py-8 px-8 md:px-8 rounded-md'>
                        <div className='flex-col flex gap-6 md:gap-8 '>
                            <img className='rounded-full border-4 border-gray-300 h-24 w-24 mx-auto'src={instructor.photoUrl || `${img}`}/>
                        </div>
                        <div className='flex flex-col text-center'>
                            <p className='font-medium text-lg dark:text-white text-gray-800 '>
                                {instructor.name}
                            </p>
                            <p className='text-gray-500 whitespace-nowrap '>
                                Instructors
                            </p>
                            <p className='text-gray-500 mb-4'>Address : {instructor.address}</p>
                            <p className='text-gray-500 mb-4 '>Email : {instructor.email}</p>
                            <p className='text-gray-500 mb-4 '>Phone : {instructor.phone}</p>
                        
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

export default Instructors
