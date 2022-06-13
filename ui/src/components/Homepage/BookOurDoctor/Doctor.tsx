import React from 'react'


interface compType {
    id: number,
    first_name: string,
    Gender: string,
    charges_per_hour: string,
    expereince: string,
    location: string,
    phone_Number:  string,
    profilepics:  string,
    rating: number,
    specialization:  string,
    time_available:  string
}
const Doctor:React.FC<compType> = (props) => {
  return (
    <div className='bg-white specialities flex flex-col  p-2  gap-5  w-4/5 md:w-fit mx-auto' key={props.id}>
        <div className='mx-auto rounded-full'><img src={props.profilepics} className = "w-48 rounded-full h-48"/></div>
        <h2 className=''>{props.first_name}</h2>
        <p className=''>{props.specialization}</p>
        <p className=''>{props.phone_Number}</p>
        <p className=''>{props.location}</p>
        <p className=''>{props.time_available}</p>
        <p className=''>{props.charges_per_hour} (Per hour charges)</p>

        <div className='flex gap-2'>
            <button className=' border-sky-800 text-sky-800 border-2 border-solid p-2 hover:bg-sky-800 hover:text-white'>View Profile</button>
            <button  className='bg-sky-800 text-white font-semibold p-2 hover:text-lg transition-all'>Book  Now</button>
        </div>
    </div>
  )
}

export default Doctor