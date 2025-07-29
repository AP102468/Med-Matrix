import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

  return (
    <div className='flex bg-blue-500 rounded-lg px-6 sm:px-12 md:px-18 lg:px-33 my-24 md:mx-10' >

        {/* ------------Left Side--------------- */}
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
            <div className='text-xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white'>
                <p>Book Your Appointment </p>
                <p className='mt-4 '>With 100+ Trusted Doctors</p>
            </div>
            <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-4 rounded-full mt-8 hover:scale-105 transition-all cursor-pointer'>Create account</button>
        </div>

        {/* ------------Right Side-------------- */}
        <div className='hidden md:block md:w-1/2 lg:w-[420px] relative'>
            <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
        </div>

    </div>
  )
}

export default Banner