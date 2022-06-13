import React from 'react'
import MouseHoverAnimation from '../../MouseHoverAnimation.css/MouseHoverAnimation'
// import iconLocation from "./../../../assets/iconLocation.svg"
import ambulance from  "./../../../assets/ambulance.jpg"

const Hero:React.FC = () => {
  return (
    <div
    className='bg-heroPattern ' style={HeroStyle.container}>
        <MouseHoverAnimation />
        <div className='flex flex-col items-center py-40 px-4   gap-4  container mx-auto'>
    <h1 className='font-extrabold text-4xl text-center shadow-2xl border-solid border-2 border-black'>Search Doctor, Make an Appointment</h1>
        <h3  className='text-center font-bold  text-white'>Discover the best doctors, clinic & hospital the sity nearest to you</h3>
        <div  className='flex gap-5 text-center w-full  flex-col sm:flex-row max-w-2xl '>
            <div className='w-full text-black '>
        <input type='text'  placeholder='search Location' className='w-full py-2 px-2 outline-none border-solid border-black border-2 rounded-lg'/>
        </div>
        <div  className='w-full text-black  '>
        <input type='text' placeholder='Search  Doctors by Specialization border-0' className='w-full py-2 px-2 outline-none border-solid border-black border-2 rounded-lg'/>
        </div>
        </div>
        </div>
    </div>
  )
}

interface Style {
    [key: string]: React.CSSProperties
}

const HeroStyle: Style = {
    container:{
        backgroundImage:  `url('${ambulance}')`,
        backgroundPosition: 'center',
        backgroundRepeat:  'no-repeat',
        backgroundSize: 'cover',
        // backgroundColor : 'red',
        // objectFit: 'contain',
        // objectPosition: 'center'

    }
}

export default Hero