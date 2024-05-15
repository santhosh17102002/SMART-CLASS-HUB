import React, { useState } from 'react'
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../components/Social/GoogleLogin';
import useAuth from '../../hooks/useAuth';
function Login() {
  const [showpassword,setShowPassword] = useState(false);
  const location = useLocation();
  const {login,error,setError,loader,setLoader} = useAuth()
  const navigate = useNavigate();
  const handleSubmit = e => {
    setError('');
    e.preventDefault();

    const data = new FormData(e.target);
    const formData = Object.fromEntries(data);
    //console.log(formData)
    login(formData.email,formData.password).then(()=>{
      alert("Login Successful")
      navigate(location.state?.from || '/dashboard')
    }).catch((err)=>{
      setError(err.code);
      setLoader(false);
    })
  }
  return (
    <div className=' mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
      <h1 className='mx-auto text-2xl font-bold text-secondary sm:text-3xl text-center'>Login</h1>
      <p className='mx-auto mt-4 max-w-md text-center text-gray-500'>Explore our comprehensive library of courses</p>
      <div className='shadow-gray-500 shadow-md mx-auto max-w-lg mb-0 mt-6 rounded-lg p-4 shodaow-lg sm:p-6 lg:p-8'>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <p className='text-center text-red-400 text-lg font-medium'>Sign in to your account</p>
          <div>
            <label htmlFor='email' className='sr-only'>Email</label>
            <div className='relative'>
              <input type='email' name='email' placeholder='Enter email' className='w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'/>
              <span className='absolute inset-y-0 end-0 grid place-content-center  px-5'><MdOutlineAlternateEmail className='h-4 w-4 text-gray-400'/></span>
            </div>
            
          </div>
          <div>
            {/*password*/}
            <label htmlFor='password' className='sr-only'>Password</label>
            <div className='relative'>
              <input type={showpassword ? 'text':'password'} name='password' placeholder='Enter password' className='w-full border outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'/>
              <span onClick={()=> setShowPassword(!showpassword)} className='absolute inset-y-0 end-0 grid place-content-center  px-5'>{showpassword === true ?<FaRegEye className='h-4 w-4 text-gray-400'/>: <FaRegEyeSlash className='h-4 w-4 text-gray-400'/>}</span>
            </div>
          </div>
          <button type='submit' className='block w-full rounded-lg bg-secondary px-5 py-3 text-sm font-medium text-white' >Sign In</button>
          <p className='text-center text-sm text-gray-500'>No account ? <Link className='underline'>Sign Up</Link></p>
        </form>
        <GoogleLogin/>

      </div>
    </div>
  )
}

export default Login
