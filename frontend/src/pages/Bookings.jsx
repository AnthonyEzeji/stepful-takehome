import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FeedbackForm from '../components/FeedbackForm';
import EditFeedbackForm from '../components/EditFeedbackForm';
import Navbar from '../components/Navbar';

function Bookings() {
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showBooking, setShowBooking] = useState(false);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [showEditFeedbackForm, setShowEditFeedbackForm] = useState(false);
    const [feedbackList, setFeedbackList] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        async function fetchBookings() {
            await axios.get(`http://localhost:5010/booking/${user.userId}`)
                .then(res => {
                    console.log(res.data)
                    const formattedBookings = res.data.map(booking => ({
                        ...booking,
                        displayDate: new Date(booking.startTime).toDateString(),
                        displayStartTime: new Date(booking.startTime).toLocaleTimeString(),
                        displayEndTime: new Date(booking.endTime).toLocaleTimeString()
                    }));

                    setUpcomingBookings(formattedBookings);
                });
        }
        async function fetchFeedback() {
            if(user.role==="coach"){
                await axios.get(`http://localhost:5010/feedback/${user.userId}`).then(res => {
                    setFeedbackList(res.data);
                });
            }
           
        }
        fetchFeedback()
        fetchBookings()
        
    
        return () => {
            
        }
    }, []);
    async function handleBookingDelete(e){

        const bookingId = e.target.id
        const booking = upcomingBookings.find(booking=>booking._id ===bookingId)

        await axios.delete(`http://localhost:5010/booking/${booking.slotId}`,{data:{coachId:booking.coachId,studentId:booking.studentId}}).then(res=>{
            alert('Booking deleted')
            window.location.reload()
        })
    }
    async function handleAddFeedback(e){

        const bookingId = e.target.id
        const booking = upcomingBookings.find(booking=>booking._id ===bookingId)
        setSelectedBooking(booking)
        setShowFeedbackForm(true)
    }
    async function handleEditFeedback(e){

        const bookingId = e.target.id
        const booking = upcomingBookings.find(booking=>booking._id ===bookingId)
        setSelectedBooking(booking)
        setShowEditFeedbackForm(true)
    }
  return (
    <div className="w-screen min-h-screen flex flex-col justify-start items-center bg-gray-50">
    <Navbar />
  
    
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
      <h1 className="text-3xl font-semibold text-gray-700 text-center mb-4">Manage Bookings</h1>
      
      {upcomingBookings.length > 0 ? (
        <ul className="mt-4 space-y-3 max-h-120 overflow-y-auto">
          {upcomingBookings.map(booking => {
            let feedback = feedbackList.find(feedback => feedback.bookingId === booking._id);
            
            return (
              <li key={booking._id} className="p-5 bg-gray-100 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-center">
                <div className="text-gray-700 w-full">
                  <p className="text-lg font-bold text-gray-800">🎓 Student: {booking.studentFirstName} {booking.studentLastName}</p>
                  <p>📞 {booking.studentPhone}</p>
                  
                  <p className="text-lg font-bold text-gray-800">🎓 Coach: {booking.coachFirstName} {booking.coachLastName}</p>
                  <p>📞 {booking.coachPhone}</p>
                  
                  <p>📅 {booking.displayDate}</p>
                  <p>⏰ {booking.displayStartTime} - {booking.displayEndTime}</p>
                </div>
  
                <div className="mt-4 md:mt-0 flex flex-col space-y-2">
                  {feedback && user.role === "coach" && (
                    <button id={booking._id} onClick={handleEditFeedback} className="px-4 py-2 bg-green-500  rounded-md shadow hover:bg-green-600 transition">Edit Feedback</button>
                  )}
                  
                  {!feedback && user.role === "coach" && (
                    <button id={booking._id} onClick={handleAddFeedback} className="px-4 py-2 bg-blue-500  rounded-md shadow hover:bg-blue-600 transition">Add Feedback</button>
                  )}
                  
                  <button id={booking._id} onClick={handleBookingDelete} className="px-4 py-2 bg-red-500  rounded-md shadow hover:bg-red-600 transition">Delete Booking</button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-500 text-center mt-4">No upcoming bookings.</p>
      )}
    </div>
  
    
    {showFeedbackForm && <FeedbackForm booking={selectedBooking} setShowFeedbackForm={setShowFeedbackForm} />}
    {showEditFeedbackForm && <EditFeedbackForm booking={selectedBooking} feedback={feedbackList.find(feedback => feedback.bookingId === selectedBooking._id)} setShowEditFeedbackForm={setShowEditFeedbackForm} />}
  </div>
  
  )
}

export default Bookings
