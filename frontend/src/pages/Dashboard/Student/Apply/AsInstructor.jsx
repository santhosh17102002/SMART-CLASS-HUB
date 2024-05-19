import React, { useEffect, useState } from 'react';
import { FiUser, FiMail, FiBriefcase, FiSend } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../../../hooks/useUser';
import useAxiosFetch from '../../../../hooks/useAxiosFetch';
import { ScaleLoader } from 'react-spinners';
const AsInstructor = () => {
    const { currentUser } = useUser();
    const [submittedData, setSubmittedData] = useState({});
    const [loading, setLoading] = useState(true); // [1
    const axiosFetch = useAxiosFetch();
    const onSubmit = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const experience = e.target.experience.value;

        const data = {
            name,
            email,
            experience,
        };
        axiosFetch.post('/as-instructor', data).then((res) => {
            console.log(res.data);
        });
    };

    useEffect(() => {
        axiosFetch.get(`/applied-instructors/${currentUser?.email}`).then((res) => {
            console.log(res.data);
            setSubmittedData(res.data);
            setLoading(false);
        });
    }, []);
    const inputVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: { opacity: 1, scale: 1 },
    };
    if (loading) { // [2
        return <div className='h-full w-full flex justify-center items-center'><ScaleLoader color="#FF1949" /></div>;
    }

  return (
    <div className='my-20'>
      <h1 className='font-bold text-center mx-auto mt-3 text-4xl text-secondary'>Apply as Instructor</h1>
      <div>
        {
          !submittedData?.name && (
            <div className=' min-h-screen flex justify-center items-center w-[100%] mx-auto'>
            <form onSubmit={onSubmit}>
                            <div className="flex w-full">
                                <div
                                    variants={inputVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ duration: 0.5 }}
                                    className="mb-4 w-full"
                                >
                                    <label className="text-gray-700" htmlFor="name">
                                        Name
                                    </label>
                                    <div className="flex items-center mt-1">
                                        <FiUser className="text-gray-500" />
                                        <input
                                            defaultValue={currentUser?.name}
                                            disabled
                                            readOnly
                                            className="ml-2 w-[100%] border-b border-gray-300 focus:border-secondary outline-none"
                                            type="text"
                                            id="name"
                                            name="name"
                                        />
                                    </div>
                                </div>
                                <div
                                    variants={inputVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="mb-4 w-full"
                                >
                                    <label className="text-gray-700 ml-4" htmlFor="email">
                                        Email
                                    </label>
                                    <div className="flex items-center mt-1 ml-4">
                                        <FiMail className="text-gray-500" />
                                        <input
                                            defaultValue={currentUser?.email}
                                            disabled
                                            readOnly
                                            className="ml-2 w-[100%] border-b text-wrap border-gray-300 focus:border-secondary outline-none"
                                            type="email"
                                            id="email"
                                            name="email"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div
                                variants={inputVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="mb-4 w-full"
                            >
                                <label className="text-gray-700" htmlFor="experience">
                                    Experience
                                </label>
                                <div className="flex items-center mt-1">
                                    <FiBriefcase className="text-gray-500" />
                                    <textarea
                                        placeholder="Tell us about your experience..."
                                        className="ml-2 rounded-lg px-2 placeholder:text-sm py-1 w-[800px] border border-gray-300 focus:border-secondary outline-none resize-none"
                                        id="experience"
                                        name="experience"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="text-center flex justify-center ">
                                <button
                                    variants={buttonVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="flex items-center px-4 py-2 bg-secondary text-white rounded-md focus:outline-none"
                                >
                                    <FiSend className="mr-2" />
                                    Submit
                                </button>
                            </div>
                        </form>
            </div>
            
          )
        }
      </div>
    </div>
  )
}

export default AsInstructor
