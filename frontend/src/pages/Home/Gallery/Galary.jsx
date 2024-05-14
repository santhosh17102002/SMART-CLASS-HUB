import React from 'react'
import image1 from '../../../assets/gallary/gal1.jpeg'
import image2 from '../../../assets/gallary/gal2.avif'
import image6 from '../../../assets/gallary/gal6.png'
import image3 from '../../../assets/gallary/gal3.jpg'
import image4 from '../../../assets/gallary/gal4.jpeg'
function Galary() {
  return (
    <div className='md:w-[60%] mx-auto my-28'>
      <div className='mb-16'>
        <h1 className='text-5xl font-bold text-center'>Our Gallery</h1>
      </div>
      <div className='md:grid grid-cols-2 justify-center items-center md:gap-4'>
            <div className='flex justify-center md:col-span-1'>
                <img src={image1} className='md:h-[250px] ' />
            </div>
            <div className='flex justify-center md:col-span-1'>
                <img src={image2} className='md:h-[250px] ' />
            </div>
            <div className='flex justify-center md:col-span-2'>
                <img src={image6} className='md:h-[350px] mx-[30px]' />
            </div>
            <div className='flex justify-center md:col-span-1'>
                <img src={image3} className='md:h-[250px] mx-[30px]' />
            </div>
            <div className='flex justify-center md:col-span-1'>
                <img src={image4} className='md:h-[250px] mx-[30px]' />
            </div>
        </div>



    </div>
  )
}

export default Galary
