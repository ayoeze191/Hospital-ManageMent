import React from 'react'
import { Link } from 'react-router-dom'
const Registration = () => {

  return (
    <div  className='bg-white flex flex-col max-w-lg  mx-auto my-10 w-[85%] gap-5 p-4'>
        <div className='mb-4'>Registration  Form</div>
        <form className='flex gap-4'>
            <div className='flex gap-1 items-center'><input  type={'radio'}  value="Patient" name='Type'/>Patient</div>
            <div className='flex gap-1 items-center'><input  type={'radio'}  value="Doctor" name='Type'/>Doctor</div>
           <div className='flex gap-1 items-center'> <input  type={'radio'}  value="Hospital" name='Type'/>Hospital</div>
            <div className='flex gap-1 items-center'><input  type={'radio'}  value="Medical" name='Type'/>Medical</div>
        </form>

        <form  className='flex flex-col w-full  mt-5 gap-5'>
            <div className='w-full border'><input type={'email'} placeholder = "email"  name='email' required = {true} className = 'border-0 outline-none p-2 w-full'/></div>
            <div className='w-full border'><input type={'text'} placeholder = "First Name"  name='First_Name' required = {true}  className = 'border-0 outline-none p-2 w-full' /></div>
            <div className='w-full border'><input type={'text'} placeholder = "Last Name" name='Last_Name'  required = {true}  className = 'border-0 outline-none p-2  w-full'/></div>
            <div className='w-full border'><input type={'password'} placeholder = "Password" name='Password1' required = {true}  className = 'border-0 outline-none p-2 w-full'/></div>
            <div className='w-full border'><input type={'password'} placeholder = "ConFirm  Password" name='Password2' required = {true}  className = 'border-0 outline-none p-2 w-full'/></div>
            <div  className='w-full  text-right'>Already have an  account?<Link to = {'/Login'} className='text-indigo-800  '>Login</Link></div>
            <div className='w-full border  bg-indigo-700'><input type={'submit'} value='Signup' className='w-full bg-indigo-700 text-white  p-2'/></div>
        </form>

    </div>
  )
}

export default Registration