import React from 'react'

const ProfileSettings = () => {
  return (
    <div className='flex  flex-col gap-5 flex-1'>
        <div  className='text-red-500 mb-10 bg-white'>Profile</div>
        <div className='bg-white p-5'>
        <form>
            <div className='mb-5'><input type='file'  name = 'userimage'/>Allowed JPG GIR or PNG.  max size is 2mb</div>
            <div className='flex gap-4 mb-5'>
                <div className='flex flex-col gap-4 flex-1'>
                    <div className='flex flex-col '>first name:<input type={'text'} name = 'first_name' className='border'/></div>
                    <div className='flex flex-col'>Date  of Birth:<input type={'date'} name = 'Date_of_Birth' className='border'/></div>
                    <div className='flex flex-col'>Address:<input type={'text'} name = 'Address' className='border'/></div>
                    
                </div>
                <div className='flex flex-col gap-4  flex-1'>
                <div className='flex flex-col'>Last_name: <input type={'text'} name = 'Last_name' className='border'/></div>
                <div className='flex flex-col'>Blood Group: <input type={'text'} name = 'BloodGroup' className='border'/></div>
                <div className='flex flex-col'>Mobile: <input type={'number'} name = 'mobile' className='border'/></div>
                </div>
            </div>
            <button className='bg-indigo-700 px-3  py-2 text-white font-semibold'>Save Changes</button>
        </form>
        </div>
    </div>
  ) 
}

export default ProfileSettings