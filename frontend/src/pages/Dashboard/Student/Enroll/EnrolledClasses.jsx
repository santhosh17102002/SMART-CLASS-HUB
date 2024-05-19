import React, { useEffect, useState } from 'react'
import { useUser } from '../../../../hooks/useUser';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { createTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const EnrolledClasses = () => {
  const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const { currentUser } = useUser();
    let itemPerPage = 2;
    const totalPage = Math.ceil(data.length / itemPerPage);
    const axiosSecure = useAxiosSecure();
    const theme = createTheme({
        palette: {
            primary: {
                main: '#ff0000', // Set the primary color
            },
            secondary: {
                main: '#00ff00', // Set the secondary color
            },
        },
    }); 

    useEffect(()=>{
      axiosSecure.get(`enrolled-classes/${currentUser?.email}`).then((res)=>{
        setData(res.data)
      }).catch((err)=>console.log(err));
    },[])
  return (
    <div>
      <h1 className='text-2xl my-6'>EnrolledClasses</h1>
      <div className='grid md:grid-cols-2 gap-6 grid-cols-1 lg:grid-cols-3'>
        {
          data.map((item,index)=>(
            <div key={index} className='bg-white shadow-2xl h-96 mx-3 rounded-3xl flex md:flex-row justify-around items-center overflow-hidden sm:flex-grow sm:h-52 sm:w-7/9'>
              <img src={item.classes.image} className='h-1/2 sm:h-full sm:w-1/2 object-cover'/>
              <div className="flex-1
                  w-full
                  flex flex-col
                  items-baseline
                  justify-around h-1/2
                  pl-6
                  sm:h-full sm:items-baseline sm:w-1/2
                ">
                <div>
                  <h1 className='font-bold'>{item.classes.name}  </h1>
                  <p className='text-gray-400'>{item.classes.instructorName}</p>
                </div>
                <div className='flex gap-9'>
                  <p className='font-bold text-gray-500'>{item.classes.price}/-</p>
                  <Link to={`/dashboard/course-details`}>
                    
                  <button className='bg-secondary font--bold rounded-xl mr-5 text-white px-3 py-1 shadow-md'>View</button>
                  </Link>
                </div>
                          
                </div>
            </div>
            
          ))
        }
      </div>
    </div>
  )
}

export default EnrolledClasses
