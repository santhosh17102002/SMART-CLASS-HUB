import React from 'react'
import { useUser } from '../../../hooks/useUser';
import welcomeImg from '../../../assets/dashboard/kakashi.png'
import { Link } from 'react-router-dom';

const StudentCP = () => {
    const {currentUser,isLoading} = useUser()
    const role = currentUser?.role;
  return (
    <div className='h-screen flex justify-center items-center p-2'>
      <div>
        <div className='flex justify-center items-center mx-auto '>
            <img onContextMenu={e=> e.preventDefault()} src={welcomeImg} className='sm:h-[200px] md:h-[500px] ' placeholder='blur'/>
        </div>
        <h1 className=' ml-5 text-4xl capitalize font-bold'>Hi, <span className='text-secondary items-stretch'>{currentUser?.name}! </span> Welcome to your dashboard</h1>
        <p className='text-center text-base py-2'>Explore all the classes. Convert the 1% chance of success to 100% success. Enjoy our Magical moments.</p>
        <div className="text-center">
                    <h1 className='font-bold'>You jump any page you want from here . </h1>
                    <div className="flex items-center justify-center my-4 gap-3 flex-wrap">
                        <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                            <Link  to='/dashboard/enrolled-class'>My Enroll</Link>
                        </div>
                        <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                            <Link  to='/dashboard/my-selected'>My Selected</Link>
                        </div>
                        <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                            <Link  to='/dashboard/my-payments'>Payment History</Link>
                        </div>
                        <div className="border border-secondary rounded-lg hover:bg-secondary hover:text-white duration-200 px-2 py-1">
                            <Link  to='/dashboard/apply-instructor'>Join as a Instructor</Link>
                        </div>
                    </div>
                </div>
      </div>
    </div>
  )
}

export default StudentCP
