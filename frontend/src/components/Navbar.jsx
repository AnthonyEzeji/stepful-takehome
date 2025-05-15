import React from 'react'
import CoachNavbar from './CoachNavbar'
import StudentNavbar from './StudentNavbar'

function Navbar() {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user.role ==="coach"){
      return (
        <CoachNavbar/>
      )
    }else if(user.role ==="student"){
      return (
       <StudentNavbar/>
      )
    }
  
}

export default Navbar
