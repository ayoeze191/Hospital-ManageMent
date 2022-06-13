import React from 'react'
import Appointment from './DashBoardComponent/Appointment/Appointment'

const DashBoard = () => {
  return (
    <div className='flex-1'>
        <div className='text-center text-green-700 font-bold'>All Appointment</div>
        <div>
            <div className='patient-dashboard-header grid grid-cols-4'>
                <h2 className='py-3 text-center cursor-pointer border-b border-b-blue-600 text-blue-600 '>Appoinment</h2>
                <h2 className='py-3 text-center cursor-pointer'>Prescription</h2>
                <h2 className='py-3 text-center cursor-pointer'>Medical Records</h2>
                <h2 className='py-3 text-center cursor-pointer'>Billing</h2>
            </div>
            {/* Different Components Depeonding on what header is clicked on*/}
            <Appointment />
        </div>
    </div>
  )
}

export default DashBoard