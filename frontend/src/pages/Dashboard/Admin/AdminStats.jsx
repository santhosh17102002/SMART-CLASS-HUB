import React, { useEffect, useState } from 'react';
import { Fade, Slide } from "react-awesome-reveal";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdOutlinePendingActions } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { IoIosPeople } from 'react-icons/io';
import { AiFillDatabase } from "react-icons/ai";
const AdminStats = ({ users }) => {
  const [data , setData] = useState({}); 
  console.log("🚀 ~ file: AdminStats.jsx:6 ~ AdminStats ~ data:", data)
  const axiosSecure = useAxiosSecure();
  useEffect(()=>{
    axiosSecure.get('/admin-stats')
    .then(res => { 
      setData(res.data)
    })
    .catch(err => console.log(err))
  },[])
  return (
    <Slide>
      <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
        <div className="flex items-center bg-white  border rounded-sm overflow-hidden shadow-2xl">
          <div className="p-4 bg-green-400">
            <IoIosPeople className='h-12 w-12 text-white' />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Member</h3>
            <p className="text-3xl">{users.length}</p>
          </div>
        </div>
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-blue-400">
          <AiFillDatabase className='h-12 w-12 text-white' />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm whitespace-nowrap   tracking-wider">Approved Class</h3>
            <p className="text-3xl">{data.approvedClasses}</p>
          </div>
        </div>
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-indigo-400">
            
            <GiTeacher  className='h-12 w-12 text-white' />
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Instructors</h3>
            <p className="text-3xl">{data.instructors}</p>
          </div>
        </div>
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-red-400">
          <MdOutlinePendingActions  className='h-12 w-12 text-white'/>
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Pending Class</h3>
            <p className="text-3xl">{data.pendingClasses}</p>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default AdminStats;
