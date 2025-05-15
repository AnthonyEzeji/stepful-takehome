import React, { useEffect, useState } from 'react'
import CoachDashboard from '../components/CoachDashboard';
import StudentDashboard from '../components/StudentDashboard';

function DashboardPage() {
    const [role, setRole] = useState(null);
    useEffect(() => {
        if(localStorage.getItem('user') ){
        const user = JSON.parse(localStorage.getItem('user'))
        console.log(user)
            if(user.role === "student"|| user.role ==="coach"){
                setRole(user.role)
            }
        }
    }, []);
    {if(role === "student"){
        return (
           <StudentDashboard/>
          )
    }else if(role=== "coach"){
        return (
        <CoachDashboard></CoachDashboard>)
    }}
  
}

export default DashboardPage
