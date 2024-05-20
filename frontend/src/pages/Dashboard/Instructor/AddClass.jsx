import React, { useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useUser } from '../../../hooks/useUser';
import { ScaleLoader } from 'react-spinners';
import { Navigate, useNavigate } from 'react-router-dom';
const KEY = import.meta.env.VITE_IMGDB_TOKEN
const AddClass = () => {
    const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`
    const axiosSecure = useAxiosSecure();
    const {currentUser,isLoading} = useUser();
    const navigate = useNavigate();
    const [image,setImage] = useState(null);
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        //console.log(formData)
        const newData = Object.fromEntries(formData)
        //console.log(newData)
        formData.append('file',image);

        fetch(API_URL,{
            method:"POST",
            body:formData
        }).then((res)=>res.json()).then(data=>{
            console.log(data)
            if(data.success === true){
                //console.log(data.data.display_url)
                newData.image = data.data.display_url;
                newData.instructorName = currentUser?.name;
                newData.instructorEmail = currentUser?.email;
                newData.status = 'pending';
                newData.submitted = new Date(); 
                newData.totalEnrolled = 0;
                axiosSecure.post('/new-class' , newData)
                .then(res => {
                    console.log(res.data);
                })
            }
            alert("successfully added the class")
            navigate('/dashboard/my-pending')
            
        })
    }
    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        setImage(file)
    }
    if (isLoading) { // [2
        return <div className='h-full w-full flex justify-center items-center'><ScaleLoader color="#FF1949" /></div>;
    }
  return (
    <div>
        <div className='my-10'>
            <h1 className='text-secondary text-center text-3xl font-bold'>Add Your Course</h1>
        </div>
        <form onSubmit={handleFormSubmit} className='my-10 mx-auto p-6 bg-white rounded shadow-2xl'>
            <div className='grid grid-cols-2 w-full gap-3 items-center'>
                <div className='mb-6'>
                    <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>Course Name</label>
                    <input type='text' required placeholder='Your Course Name' name='name' id='name' className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500'/>
                </div>

                <div className='mb-6'>
                    <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>Course Thumbnail</label>
                    <input onChange={handleImageChange} type='file' required name='image' className="block mt-[5px] w-full border border-secondary shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500    file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4 "/>
                </div>
            </div>
            <div>
                <h1 className='text-[12px] my-2 ml-2 text-secondary'>You cannot change name and email further</h1>
                <div className="grid gap-3 grid-cols-2">
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="instructorName">
                                Instructor name
                            </label>
                            <input
                                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                                type="text"
                                value={currentUser?.name}
                                readOnly
                                disabled
                                placeholder='Instructor Name'
                                name='instructorName'
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="instructorEmail">
                                Instructor Email
                            </label>
                            <input
                                title='You can not update your email'
                                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                                type="email"
                                value={currentUser?.email}
                                disabled
                                readOnly
                                name='instructorEmail'
                            />
                        </div>
                    </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="availableSeats">
                            Available seats
                        </label>
                        <input
                            className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                            type="number"
                            required
                            placeholder='How many seats are available?'
                            name='availableSeats'
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                            type="number"
                            required
                            placeholder='How much does it cost?'
                            name='price'
                        />
                    </div>
            </div>
            <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
                        Youtube Link
                    </label>
                    <p className='text-[12px] my-2 mt-2 text-secondary'>Only youtube videos are support</p>
                    <input
                        required
                        className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                        type="text"
                        placeholder='Your course intro video link'
                        name='videoLink'
                    />
            </div>
            <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
                        Description About your course 
                    </label>
                    <textarea placeholder='Description about your course' name="description" className='resize-none border w-full p-2 rounded-lg  border-secondary outline-none' rows="4"></textarea>
            </div>
            <div className="text-center w-full">
                    <button
                        className="bg-secondary w-full hover:bg-red-400 duration-200 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Add Courses
                    </button>
            </div>
        </form>
    </div>
  )
}

export default AddClass
