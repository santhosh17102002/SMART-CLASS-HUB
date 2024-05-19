import React from 'react'
import kukui from "../../../assets/dashboard/kukui.webp"
import { useUser } from '../../../hooks/useUser';
const InstructorCP = () => {
    const {currentUser,isLoading} = useUser()
    const role = currentUser?.role;
  return (
    <div className='mt-10'>

      <div className='h-screen '>
        <h1 className='text-4xl font-bold text-center'>Hi,<span className='font-bold capitalize text-secondary'>{currentUser?.name}</span> Welcome to Instructor Dashboard</h1>
        <img src={kukui} className=' items-center mx-auto mt-10 rounded-2xl h-4/5 w-4/5'/>
      </div>
    </div>
  )
}

export default InstructorCP
