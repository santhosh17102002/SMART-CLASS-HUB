import React, { useContext } from 'react'
import { useForm } from "react-hook-form";
import { AiOutlineLock, AiOutlineMail, AiOutlinePhone, AiOutlinePicture, AiOutlineUser } from "react-icons/ai";
import { toast } from 'react-toastify';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../components/Social/GoogleLogin';
import { AuthContext } from '../../utilities/providers/AuthProvider';
import axios from 'axios';
const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate()
  const {signUp,updateUser,setError} = useContext(AuthContext);
  const password = watch('password','')
  
  const onSubmit = (data) => {
    setError('')
    signUp(data.email,data.password) .then((result) => {
      const user = result.user;
      if(user){
        return updateUser(data.name,data.photoUrl).then(()=>{
          const userImp = {
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            gender: data.gender,
            address: data.address,
            role: 'user',
            phone: data.phone,
          }
          if (user.email && user.displayName) {
            return axios
                .post('https://smart-class-hub.onrender.com/new-user', userImp)
                .then(() => {
                  
                  setError('')
                    navigate('/');
                    return 'Registration successful!';
                })
                .catch((err) => {
                    throw new Error(err);
                });
        }
        })
      }
    }).catch((err) => {
      setError(err.code);
      throw new Error(err);
  }),
  {
    pending: 'Please wait...',
    success: 'Registration successful!',
    error: 'Registration failed!',
}
    //console.log(data.password);
    //console.log(data.confirmPassword);
  }

  return (
    <div className='flex justify-center items-center pt-14 pb-14 bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-3xl font-bold text-center mb-6'>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex items-center gap-5 '>
            <div className='mb-4'>
              <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
                <AiOutlineUser className='inline-block mr-2 mb-1 text-lg' />
                Name
              </label>
              <input type='text' placeholder='Enter your name' className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' {...register("name", { required: true })} />
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>
                <AiOutlineMail className='inline-block mr-2 mb-1 text-lg' />
                Email
              </label>
              <input type='email' placeholder='Enter your Email address' className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' {...register("email", { required: true })} />
            </div>
            
          </div>



          <div className='flex items-center gap-5 '>
            <div className='mb-4'>
              <label htmlFor='password' className='block text-gray-700 font-bold mb-2'>
                <AiOutlineLock className='inline-block mr-2 mb-1 text-lg' />
                Password
              </label>
              <input type='password' placeholder='Enter your password' className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' {...register("password", { required: true })} />
            </div>
            <div className='mb-4'>
              <label htmlFor='confirmPassword' className='block text-gray-700 font-bold mb-2'>
                <AiOutlineLock className='inline-block mr-2 mb-1 text-lg' />
                Confirm Password
              </label>
              <input type='password' placeholder='Confirm Password' className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' {...register("confirmPassword", { required: true ,validate : (value) => value === password || "Password doesn't match"})} />
            </div>
          </div>




          <div className='flex items-center gap-5 '>
            <div className='mb-4'>
              <label htmlFor='phoneNumber' className='block text-gray-700 font-bold mb-2'>
                <AiOutlinePhone className='inline-block mr-2 mb-1 text-lg' />
                Phone
              </label>
              <input type='tel' placeholder='Enter phone number' className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' {...register("phone", { required: true })} />
            </div>
            <div className='mb-4'>
              <label htmlFor='photoUrl' className='block text-gray-700 font-bold mb-2'>
                <AiOutlinePicture className='inline-block mr-2 mb-1 text-lg' />
                Photo URL 
              </label>
              <input type='text' placeholder='Place photo URL' className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300' {...register("photoUrl")} />
            </div>
            
          </div>




          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">
               <AiOutlineUser className="inline-block mr-2 mb-1 text-lg" />
                Gender
                </label>
                <select
                {...register('gender', { required: true })}
                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                </select>
          </div>



          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
              <HiOutlineLocationMarker className="inline-block mr-2 mb-1 text-lg" />
              Address
            </label>
            <textarea
              {...register('address', { required: true })}
                className="w-full border resize-none border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
                rows="3"
                placeholder="Enter your address"
            ></textarea>
          </div>


          

          <div className='mx-auto text-center'>
            <button type='submit' className='bg-secondary hover:bg-red-500 text-white py-2 px-4 rounded-md'>Register</button>
            {
              errors.password && (<div className='text-red-500 text-sm w-full mt-1'>
                <p>Password doesn't match</p>
              </div>)
            }
          </div>



        </form>
        <p className='text-center mt-4 '>
          Already have an account ? <Link to='/login' className='hover:underline text-secondary ml-1'>Login</Link>
        </p>
        <GoogleLogin/>
      </div>
    </div>
  )
}

export default Register
