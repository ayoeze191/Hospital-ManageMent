import React, { Component, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../hooks'
import { Get_All_Appoinments } from '../../../../Store/Action/Appointment'
const Appointment = () => {
  const dispatch = useAppDispatch()
  const appointments = useAppSelector(state => state.appointment.appointments) 
  useEffect(() => {
    dispatch(Get_All_Appoinments())
  }, [])
  console.log(appointments)
  return (
    <div>
        <div className='patient-Appoinments-Header'>
            <h2>Doctor</h2>
            <h2>Appt Date</h2>
            <h2>Booking Date</h2>
            <h2>Amount</h2>
            <h2>Follow  Up</h2>
            <div>Status</div>
        </div>
        {/* Appointment details component Goes Here */}

    </div>
  )
}

export default Appointment