import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {

  return (
    <div>

      <div className='text-center text-2xl pt-10 text-gray-600'>
        <p>CONTACT <span className='text-gray-800 font-semibold'>US</span> </p>
      </div>

      <div className='my-15 flex flex-col justify-center md:flex-row gap-12 mb-36 text-md'>

        <img className='w-full md:max-w-[420px]' src={assets.contact_image} alt="" />
        
        <div className='flex flex-col justify-center items-start gap-8'>
          <p className='font-semibold text-lg text-gray-800'>OUR OFFICE</p>
          <p className='text-gray-600'>54709 Willms Station <br /> Suite 350, Kolkata, India</p>
          <p className='text-gray-600'>Tel: (415) 555‑0132 <br /> Email: greatstackdev@gmail.com </p>
          <p className='font-semibold text-lg text-gray-800'> Careers at MED MATRIX </p>
          <p className='text-gray-600'>  Learn more about our teams and job openings. </p>
          <button className='border border-black px-8 py-4 text-sm cursor-pointer hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>

      </div>

    </div>
  )
}

export default Contact