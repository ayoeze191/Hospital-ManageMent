import React, { useEffect } from 'react'
import { RootState } from '../../../Store/Store'
import { useSelector } from 'react-redux'
import Doctor from './Doctor'
import { get_all_doctors } from '../../../Store/Action/Actions'
import { useAppSelector, useAppDispatch} from '../../../hooks'
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
const BookOurDoctor:React.FC = () => {
const doctors = useAppSelector((state) => state.doctors)

const dispatch = useAppDispatch()
useEffect(() => {
    dispatch(get_all_doctors())
}, [])

const body = []

console.log(doctors)


  return (
    <div className='flex items:center md:items-center  flex-col md:flex-row w-full  mx-auto  gap-5 container px-5 sm:px-0  mt-20'>
        <div  className='md:w-[30%]  w-full flex flex-col flex-1 lg:flex-[initial]'>
            <h1  className='text-4xl font-semibold mx-auto font-sans text-center'>Book Our Doctor</h1>
            <p className='mb-5 mx-auto text-lg font-semibold capitalize text-zinc-600 max-w-2xl text-center'>Lorem Ipsum is simply Dummy Text</p>
            <p className='mb-5 mx-auto text-lg font-semibold max-w-2xl text-center'>
                it is a long established fact that a reader will be distracted by the readablecontent of a page when looking at its layout. 
                The point of using Lorem Ipsum
            </p>
            <p className='mb-20 mx-auto text-lg font-semibold max-w-2xl text-center'>
                web page editor's now use lorem ipsum as their default model text,  and a search for 'lorem isum will uncover manay websites still in their infancy. Various Versions have evovled over the years, sometimes'
            </p>
            <button className='bg-indigo-700 py-4  text-white font-bold px-4 font-sans mx-auto'>Read Mode..</button>
        </div>

        <div className='Homedoctors md:w-[50%] flex-[0.95] '>
        <Swiper
        onInit={(swiper) => {
          swiper.activeIndex = 3
        }}
        centeredSlides = {true}
        // loop = {true}
        // speed={600}
        // autoplay = {true}
        navigation = {true}
        slidesPerView = {'auto'}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 2,
          },
          800: {
            slidesPerView: 2,
            // spaceBetween: ,
          },
          1100: {
            slidesPerView: 3,
            spaceBetween: 2,
          },
        }}
        >
          {doctors.doctors.map((a:any, index:number) => <SwiperSlide key={index}>
           <Doctor {...a}  {...a.doctor} key = {index}/>
          </SwiperSlide>)  }
        </Swiper>
        </div>
    </div>
  )
}

export default BookOurDoctor