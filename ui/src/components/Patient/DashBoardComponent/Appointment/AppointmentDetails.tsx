import React from 'react'

interface proptype {
  accepted: boolean,
  completed: boolean,
  date: Date,
  image: string,
  start: Date,
  end: Date,
  first_name: string,
  location: string,
  phone_number: string,
}  

const AppointmentDetails:React.FC<proptype> = (props) => {
  return (
    <div className='flex justify-between'>
      <div className='flex'>
        <div><img src={props.image} /></div>
        
        <div className='flex flex-col  gap-2'>
          <p>Dr {props.first_name}</p>
          <p>{props.date as any}</p>
          <p>{props.location}</p>
          <p>{props.phone_number}</p>
        </div>
      </div>

      <div>
        <div>Pending</div>
      </div>
    </div>
  )
}

export default AppointmentDetails