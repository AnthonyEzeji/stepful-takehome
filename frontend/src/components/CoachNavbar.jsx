import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function CoachNavbar() {
    var navigate = useNavigate()
    function handleLogout(){
        localStorage.setItem('user',null)
        localStorage.setItem('token',null)
        navigate('/login')

    }
    
  return (
    <div className=' w-screen sticky bg-blue-400 h-fit py-1 flex justify-center items-center'>
       <Link className='mx-2' to='/dashboard'>Dashboard</Link>
        <Link className='mx-2' to='/dashboard/create-slots'>Slots</Link>
        <Link className='mx-2' to='/dashboard/bookings'>Bookings</Link>
      <Link className='mx-2' to="/dashboard/feedback">Feedback</Link>
      <button onClick = {handleLogout}>Logout</button>
    </div>
  )
}

export default CoachNavbar
