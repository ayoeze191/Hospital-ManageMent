import React from 'react'
import { Link } from 'react-router-dom'

const PatientSideBar = () => {
  return (
    <div  className='flex sm:flex-col gap-5 bg-white px-10 py-10'>
        <div className='flex flex-col gap-2'>
        <div className='text-center'>Pawan Kumar</div>
        <div className='text-center text-sm'>Lagos</div>
        </div>
        <div className='flex  sm:flex-col gap-5 '>
    <Link className='text-center h-full flex items-center sm:items-start sm:text-left' to={'/Patient/patient_Dashboard'}>
        Dashboard
    </Link>
    <Link className='text-center h-full flex items-center sm:items-start sm:text-left' to={'/Patient/patient_card'}>
        Health Card
    </Link>
    <Link className='text-center h-full flex items-center sm:items-start sm:text-left' to={'/Patient/patient_Profile_Settings'}>
        Profile Settings
    </Link>
    <div className='text-center h-full flex items-center sm:items-start sm:text-left'>
        Change Password
    </div>
    <div className='text-center h-full flex items-center sm:items-start sm:text-left'>
        Logout
    </div>
    </div>
    </div>

  )
}

export default PatientSideBar