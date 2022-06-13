import React from 'react'

const Footer = () => {
  return (
      <div className='sm:text-lg font-thin box-border bg-indigo-500'>
    <div  className='  flex  w-full text-white flex-col sm:flex-row px-4 mx-auto  container py-4 justify-between items-center sm:items-start text-center sm:text-left '>
        <div>
            <h1 className='mb-4    hover:cursor-pointer font-bold'>For Patient</h1>
            <ul className=''>
                <li  className='hover:font-semibold cursor-pointer'>Search  for  Doctors</li>
                <li className='hover:font-semibold cursor-pointer'>Login</li>
                <li className='hover:font-semibold cursor-pointer'>Register</li>
                <li className='hover:font-semibold cursor-pointer'>Booking</li>
                <li className='hover:font-semibold cursor-pointer'>Patient Dashboard</li>
            </ul>
        </div>
        <div>
            <h1 className='mb-4 hover:cursor-pointer font-bold'>For Doctors</h1>
            <ul>
                <li className='hover:font-semibold cursor-pointer'>Appointment</li>
                <li className='hover:font-semibold cursor-pointer'>Chat</li>
                <li className='hover:font-semibold cursor-pointer'>Login</li>
                <li className='hover:font-semibold cursor-pointer'>Register</li>
                <li className='hover:font-semibold cursor-pointer'> Doctor  Dashboard</li>
            </ul>
        </div>
        <div>
            <h1 className='mb-4  hover:cursor-pointer font-bold'>For Hospital</h1>
            <ul>
                <li className='hover:font-semibold cursor-pointer'>Appointments</li>
                <li className='hover:font-semibold cursor-pointer'>Chat</li>
                <li className='hover:font-semibold cursor-pointer'>Login</li>
                <li className='hover:font-semibold cursor-pointer'>Register</li>
                <li className='hover:font-semibold cursor-pointer'> Doctor Dashboard</li>
            </ul>
        </div>
        <div>
            <h1 className='mb-4 hover:cursor-pointer font-bold'>Contact  Us</h1>
            <ul>
                <li className='hover:font-semibold cursor-pointer'>10/8 futa Southgate Akure Ikorodu Lagos</li>
                <li className='hover:font-semibold cursor-pointer'>+234 9037 1836 45</li>
                <li className='hover:font-semibold cursor-pointer'>Ayoeze@gmail.com</li>
            </ul>
        </div>
    </div>
    </div>
  )
}

export default Footer