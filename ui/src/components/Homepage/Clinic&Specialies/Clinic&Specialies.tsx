import React, { useState } from 'react'
import {GiBrain, GiJoint,  GiHeartOrgan, GiKidneys} from "react-icons/gi"
import {FaTeeth} from "react-icons/fa"
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y, Autoplay, Zoom, EffectCoverflow} from "swiper";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper-bundle.css'
import 'swiper/swiper.min.css'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay])

interface SpecilizationProps {
  image: React.FC,
  name: string
}
 
const Specialization:React.FC<SpecilizationProps> = (props) => {
  return (
    <div className='w-fit h-fit  flex flex-col items-center gap-4 mx-auto'>
        <div className='rounded-full  shadow-slate-400 shadow-[0px 1px 1px 3px] bg-white py-10 px-10 flex items-center justify-center specialities'><props.image fontSize = {'5rem'} color =  {'darkblue'}/></div>
        <h1  className='font-semibold '>{props.name}</h1>
    </div>
  )
}



// navigator.geolocation
interface myobject {
  name: string;
  image: React.FC
}
type lisTypes = myobject[]
const ClinicSpecialies:React.FC = () => {
  const lis:lisTypes = [
      {name: 'Dentist', image: FaTeeth},
      {name: 'Orthopedic', image: GiHeartOrgan},
      {name: 'Neurology', image: GiBrain},
      {name: 'Orthopedic', image: GiJoint},
      {name: 'Cardiologist', image: GiKidneys},
  ]
  return (
    <div className='Professions flex flex-col w-full  mt-20  px-10'>
        <h2 className='text-4xl font-semibold mb-5 mx-auto font-sans text-center'>Clinic  and Specialities</h2>
        <h2 className='mb-20 mx-auto text-lg font-semibold capitalize text-zinc-600 max-w-2xl text-center'>Lorem ipsum dolor  sit amet, consectetur adipiscingeit, sed do elusmod tempor  incididunt up labore  et dolore  mongna aliqua.</h2>
        <Swiper
        onInit={(swiper) => {
          swiper.activeIndex = 3
          swiper.params.slideActiveClass = "activ";
        }}
        // centeredSlides = {true}
        // loop = {true}
        autoplay = {true}
        slidesPerView = {'auto'}
        pagination={{ clickable: true }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1000: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        >
          {lis.map((a, index) => <SwiperSlide key={index}>
            <Specialization {...a}/>
          </SwiperSlide>)  }
        </Swiper>
    </div>
  )
}

export default ClinicSpecialies

