import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'

//In this page we add doctors profile and available button

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(()=>{
    if (aToken){
      getAllDoctors()
    }
  },[aToken])

  return (
    <div className='m-6 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>

      <div className='w-full flex flex-wrap gap-5 pt-5 gap-y-6'>
        {
          doctors.map((item,index) => (
            <div className='border border-indigo-200 rounded-xl max-w-60 overflow-hidden cursor-pointer group' key={index}>
              <img className='bg-indigo-50 group-hover:bg-blue-500 transition-all duration-500' src={item.image} alt="" />

              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-2 text-sm'>
                  {/* If item.available is true then the checkbox is checked other wise it unchecked */}
                  <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} /> 
                  <p>Available</p>
                </div>

              </div>

            </div>
          ))
        }
      </div>

    </div>
  )
}

export default DoctorsList