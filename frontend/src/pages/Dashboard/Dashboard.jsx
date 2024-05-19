import React from 'react'
import { useUser } from '../../hooks/useUser'
import {PacmanLoader} from "react-spinners"
import DashboardNavigate from '../../routes/DashboardNavigate'
const Dashboard = () => {
    const {currentUser,isLoading} = useUser()
    const role = currentUser?.role;
    if(isLoading){
        return <div className='flex justify-center items-center h-screen'><PacmanLoader color="#1F26B2" size={50}/></div>
    }
  return (
    <DashboardNavigate/>
  )
}

export default Dashboard
