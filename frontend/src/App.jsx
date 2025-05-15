import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BookingCalendar from './components/SlotCalendar'
import { Routes,Route } from 'react-router-dom'
import CoachDashboard from './components/CoachDashboard'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import DashboardPage from './pages/DashboardPage'
import CreateSlot from './pages/CreateSlot'
import Bookings from './pages/Bookings'
import Feedback from './pages/Feedback'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
function App() {
  return (
    <div>
      <Routes>
      <Route path={'/'} element={<LandingPage/>}></Route>
      <Route path={'/login'} element={<LoginPage/>}></Route>
      <Route path={'/register'} element={<RegisterPage/>}></Route>
      <Route path={'/dashboard'} element={<DashboardPage/>}></Route>
      <Route path={'/dashboard/create-slots'} element={<CreateSlot></CreateSlot>}></Route>
      <Route path={'/dashboard/slots'} element={<CreateSlot></CreateSlot>}></Route>
      <Route path={'/dashboard/bookings'} element={<Bookings></Bookings>}></Route>
      <Route path={'/dashboard/feedback'} element={<Feedback></Feedback>}></Route>

    

    </Routes>
      </div>
 
  )
}

export default App
