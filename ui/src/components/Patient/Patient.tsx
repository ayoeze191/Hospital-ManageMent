import React from 'react'
import PatientHeader from './PatientHeader'
import PatientSideBar from './PatientSideBar'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import DashBoard from './DashBoard'
import ProfileSettings from './ProfileSettings'
import HealthCard from './HealthCard'
import { Navigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch} from '../../hooks'
const Patient = () => {
  const iselegible = useAppSelector(state => state.auth)
  return (
    <div className='flex flex-col gap-5 mb-5'>
      {/* <Router> */}
      <PatientHeader />
      {!iselegible.isAuthenticated&&<Navigate to='/Login' />}
      {iselegible.isdoctor&&<Navigate to='/Login' />}
      <div className='justify-between container mx-auto gap-7 px-4 flex flex-col sm:flex-row'>
      <PatientSideBar  />
      <Routes>
      <Route element  =  {<DashBoard  />} path  = "/patient_Dashboard"/>
      <Route element = {<ProfileSettings />} path = '/patient_Profile_Settings' />
      <Route element = {<HealthCard />} path = '/patient_card' />
      </Routes>
      </div>
      {/* </Router> */}
    </div>
  )
}

export default Patient