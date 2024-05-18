

import React, { useEffect, useState } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import { Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useUser } from '../../hooks/useUser';

function Classes() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { currentUser } = useUser();
  const role = currentUser?.role;
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [classes, setClasses] = useState([]);

  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosFetch.get('/classes').then(res => setClasses(res.data)).catch(err => console.log(err));
  }, []);

  const handleHover = (index) => {
    setHoveredCard(index);
  };

  const handleSelect = (id) => {
    if (!currentUser) {
      return toast.error("Please Login first");
    }

    axiosSecure.get(`/enrolled-classes/${currentUser?.email}`)
      .then(res => setEnrolledClasses(res.data))
      .catch(err => console.log(err));

    axiosSecure.get(`/cart-item/${id}?email=${currentUser.email}`)
      .then(res => {
        if (res.data.classId === id) {
          return toast.error("Already added to cart");
        } else if (enrolledClasses.find(item => item.classes._id === id)) {
          return toast.error("Already Enrolled");
        } else {
          const data = {
            classId: id,
            userMail: currentUser.email,
            date: new Date()
          };

          toast.promise(
            axiosSecure.post('/add-to-cart', data),
            {
              pending: "Adding to cart....",
              success: {
                render() {
                  return "Added to cart";
                }
              },
              error: {
                render({ data }) {
                  return `Error: ${data.message}`;
                }
              }
            }
          );
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <div className='mt-20 pt-3 mb-8'>
        <h1 className='text-4xl font-bold text-center text-secondary'>Classes</h1>
      </div>

      <div className='my-grid w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20'>
        {classes.map((cls, index) => (
          <div key={index}
            className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-64 mx-auto 
              ${cls.availableSeats < 1 ? 'bg-red-300' : 'bg-white'} dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover(null)}
          >
            <div className='relative h-48'>
              <div className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 
                ${hoveredCard === index ? "opacity-60" : ""}`} />
              <img src={cls.image} className='object-cover w-full h-full' alt="Class" />
              <Transition
                show={hoveredCard === index}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className='absolute inset-0 flex items-center justify-center'>
                  <button onClick={() => handleSelect(cls._id)}
                    title={role === 'admin' || role === 'instructor' ? 'Instructor/Admin cannot select' : cls.availableSeats < 1 ? 'No seats available' : "You can select this class"}
                    disabled={role === "admin" || role === "instructor" || cls.availableSeats < 1}
                    className='px-4 py-4 text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700'>
                    Add to Cart
                  </button>
                </div>
              </Transition>
            </div>
            <div>
              <div className='px-6 py-2'>
                <h3 className='font-semibold mb-1'>{cls.name}</h3>
                <p className='text-gray-500 text-xs mb-1'>Instructor: {cls.instructorName}</p>
                <div className='flex items-center justify-between mt-4'>
                  <span className='text-gray-600 text-xs'>Available Seats: {cls.availableSeats}</span>
                  <span className='text-green-500 font-semibold'>{cls.price}</span>
                </div>
                <Link to={`/class/${cls._id}`}>
                  <button className='px-4 py-2 mt-4 w-full mx-auto text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700'>
                    View
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Classes;
 