import React from 'react'
import BookOurDoctor from './BookOurDoctor/BookOurDoctor'
import ClinicSpecialies from './Clinic&Specialies/Clinic&Specialies'
import Hero from './Hero/Hero'
const Homepage = () => {
  return (
    <>
    <Hero />
    <ClinicSpecialies />
    <BookOurDoctor />
    </>
  )
}

export default Homepage