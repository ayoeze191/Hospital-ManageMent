
import React, {useState, useRef} from 'react'
import { Link } from 'react-router-dom'
import { UserLogin } from "./../../Store/Action/AuthActions" 
import {useAppDispatch, useAppSelector} from "./../../hooks"
import  { Navigate } from "react-router-dom"

interface  inputType {
  email: string,
  password: string,
}

const Login:React.FC = () => {

  const isauthenticated = useAppSelector(state => state.auth.isAuthenticated)
  const isdococtor = useAppSelector(state => state.auth.isdoctor)
  const  dispatch  =  useAppDispatch()
  const [FormInput, setFormInput] = useState<inputType>({
    email: '',
    password: ''
  })

  const inputChangeHandler =(e:any):void => {
      const values = e.target.value
      let newFormInput:any;
      newFormInput = FormInput
      newFormInput[e.target.name] = values  
      setFormInput(newFormInput)
      
  }

  const submitHandler = (e:React.FormEvent)  => {
    e.preventDefault()
    
    dispatch(UserLogin(FormInput))
  }

  // let body = 
  


  return (

    <div className='p-4 bg-white max-w-lg  mx-auto my-10 text-lg  w-[85%]'>
      {(isauthenticated && !isdococtor)&& <Navigate to={'/Patient/patient_Dashboard'} />}
      
      <>Login  Form</>
      <form  className='flex flex-col w-full  mt-5 gap-5' onSubmit={(e)=>submitHandler(e)}>
        <div className='w-full border '>
          <input type={'email'} name = "email" placeholder='email' className='border-0 outline-none p-2 w-full' onChange={(e) => inputChangeHandler(e)} />
        </div>
        <div className='w-full border '>
          <input type={'password'} name = "password" placeholder='Password' className='border-0 outline-none  p-2 w-full' onChange={(e) => inputChangeHandler(e)}/>
        </div>

        <div className='w-full border  bg-indigo-700'>
          <input type={'submit'} value = "Login" className='w-full bg-indigo-700 text-white  p-2'/>
        </div>
      </form>
      <div className='text-base cursor-pointer'>Don't Have An Account? <Link to = {'/Registration'} className='text-indigo-800  '>Register</Link></div>
    </div>
  )
}

export default Login