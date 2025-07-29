import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

                {/*--------------Left section---------------*/}
                <div>
                    <img className='w-44 mb-3' src={assets.logo} alt="" />
                    <p className='w-full md:w-2/3 text-gray-800 leading-6'>MedMatrix is a smart healthcare platform designed to streamline patient data management, enable real-time diagnostics, and improve doctor-patient communication. MedMatrix simplifies clinical workflows, making healthcare more efficient and accessible. It's the next step in digital health transformation for hospitals and clinics.</p>
                </div>

                {/*--------------Center section---------------*/}
                <div>
                    <p className='text-xl font-medium mb-5 mt-3'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                {/*--------------Right section---------------*/}
                <div>
                    <p className='text-xl font-medium mb-5 mt-3'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+91-212-456-7899</li>
                        <li>medmatrixsupport@gmail.com</li>
                    </ul>
                </div>

        </div>

        {/* --------------Copyright text----------------- */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center '>Copyright © 2025 MedMatrix - All Right Reserved.</p>
        </div>

    </div>
  )
}

export default Footer