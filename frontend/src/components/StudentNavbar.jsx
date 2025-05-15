import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function StudentNavbar() {
    var navigate = useNavigate()
    function handleLogout(){
        localStorage.setItem('user',null)
        localStorage.setItem('token',null)
        navigate('/login')

    }
  return (
    <div className=' w-full  flex items-center justify-center top-0 bg-blue-200 h-fit py-2'>
        <Link className='px-2' to='/dashboard'>Dashboard</Link>
        <Link className='px-2' to='/dashboard/bookings'>Bookings</Link>
        
        <button className='px-2' onClick = {handleLogout}>Logout</button>
    </div>
  )
}

export default StudentNavbar
