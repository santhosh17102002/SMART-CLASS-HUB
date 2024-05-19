import React, { useEffect, useState } from 'react'
import { useUser } from '../../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import axios from 'axios';
import { PacmanLoader } from 'react-spinners';
import moment from 'moment'
import { MdDeleteSweep } from 'react-icons/md';
import { FaRupeeSign } from "react-icons/fa";
import Swal from 'sweetalert2';

const SelectedClass = () => {
    const {currentUser} = useUser()
    const role = currentUser?.role;
    const [loading,setLoading] = useState(true);
    const [classes,setClasses] = useState([]);
    const [paginatedData,setpaginateData] = useState([])
    const [page,setPage] = useState(1)
    const itemsPerPage = 5;
    const totalPage = Math.ceil(classes.length/itemsPerPage);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();


    const handleDelete = (id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-cart-item/${id}`).then((res)=>{
                    if(res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        })
                        const newClasses = classes.filter((item) => item._id !== id);
                        setClasses(newClasses);
                    }
                    
                })
                .catch((err)=>console.log(err))
              ;
            }
          });
    }
    const totalPrice = classes.reduce((acc,item)=> acc + parseInt(item.price),0);
    const totalTax = totalPage * 0.01;
    const price = totalPrice + totalTax;
    
    const handlePay = (id) =>{
        //console.log(id)
        const item = classes.find((item) => item._id === id);
        const price = item.price;
        //console.log(price)
        navigate('/dashboard/user/payment',{state:{price:price,itemId:id}})
    }
    useEffect(()=>{
        axiosSecure.get(`/cart/${currentUser?.email}`)
        .then((res)=>{
            setClasses(res.data)
            setLoading(false)
        })
        .catch((err) =>{
            console.log(err)
            setLoading(false)
        }) 
    },[])

    if(loading){
        return <div className='flex justify-center items-center h-screen'><PacmanLoader color="#1F26B2" size={50}/></div>
    }
  return (
    <div>
        <div className='my-6 text-center'>
            <h1 className='text-4xl mx-auto text-center font-bold'>My <span className='text-secondary'>Selected</span>Classes</h1>
        </div>
        <div className='h-screen py-8'>
            <div className='container mx-auto px-4'>
                <h2 className='font-bold '>My Cart : </h2>
                <div className='flex flex-col md:flex-row gap-4'>
                    {/*left box */}
                    <div className='md:w-3/4'>
                        <div className='bg-white rounded-lg shadow-2xl p-6 mb-4'>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th className='text-left font-semibold'>S.no</th>
                                        <th className='text-left font-semibold'>Class</th>
                                        <th className='text-left font-semibold'>Price</th>
                                        <th className='text-left font-semibold'>Date</th>
                                        <th className='text-left font-semibold'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    classes.length === 0 ? <tr><td colSpan='5' className='text-center text-2xl font-bold'>No Classes Found</td></tr>: 
                                    classes.map((item,idx)=>{
                                        const letidx = (page-1)*itemsPerPage+idx+1;
                                        return <tr key={item._id}>
                                            <td className='py-4'>{letidx}</td>
                                            <td className='py-4'>
                                                <div className='flex items-center'>
                                                    <img src={item.image} className='h-16 w-16 mr-4'/>
                                                    <span>{item.name}</span>
                                                </div>
                                            </td>
                                            <td className='py-4'>{item.price}</td>
                                            <td>
                                                <p className='text-green-700 text-sm'>
                                                    {
                                                        moment(item.submitted).format("MMMM Do YYYY")
                                                    }
                                                </p>
                                            </td>
                                            <td className='flex py-4 pt-8 gap-2'>
                                                            <button
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                className='px-3 py-1 cursor-pointer hover:bg-red-800 bg-red-500 rounded-3xl text-white font-bold'
                                                                onClick={() => handleDelete(item._id)}
                                                            >
                                                                <MdDeleteSweep />
                                                            </button>
                                                            <button
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                className='px-3 py-1 cursor-pointer hover:bg-green-800 bg-green-500 rounded-3xl text-white font-bold flex items-center'
                                                                onClick={() => handlePay(item._id)}
                                                            >
                                                                <FaRupeeSign className="mr-2" />
                                                                Pay
                                                            </button>
                                            </td>

                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>








                    {/*right box */}
                    <div className="md:w-1/5 fixed right-3">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>{totalPrice}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Taxes</span>
                                    <span>
                                    {totalTax.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Extra Fees</span>
                                    <span>0</span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-semibold">{price.toFixed(2)}</span>
                                </div>
                                <button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => navigate('/dashboard/user/payment', { state: { price: price, itemId: null } })}
                                    disabled={price <= 0}
                                    className="bg-secondary text-white py-2 px-4 rounded-lg mt-4 w-full"
                                >
                                    Checkout
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    

  )
}

export default SelectedClass
