import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CoachNavbar from './CoachNavbar';
import Navbar from './Navbar';

function CoachDashboard() {
    const coach = JSON.parse(localStorage.getItem("user"));
    const [upcomingSlots, setUpcomingSlots] = useState([]);
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showBooking, setShowBooking] = useState(false);

    useEffect(() => {
        async function fetchSlots() {
            await axios.get(`http://localhost:5010/slot/${coach.userId}`)
                .then(res => {
                    const now = new Date();

                    const formattedSlots = res.data.map(slot => ({
                        ...slot,
                        displayDate: new Date(slot.startTime).toDateString(),
                        displayStartTime: new Date(slot.startTime).toLocaleTimeString(),
                        displayEndTime: new Date(slot.endTime).toLocaleTimeString()
                    }));

                    const upcoming = formattedSlots.filter(slot => new Date(slot.startTime) > now && slot.isBooked === false);

                    setUpcomingSlots(upcoming);
                });
        }

        async function fetchBookings() {
            await axios.get(`http://localhost:5010/booking/${coach.userId}`)
                .then(res => {
                    const formattedBookings = res.data.map(booking => ({
                        ...booking,
                        displayDate: new Date(booking.startTime).toDateString(),
                        displayStartTime: new Date(booking.startTime).toLocaleTimeString(),
                        displayEndTime: new Date(booking.endTime).toLocaleTimeString()
                    }));

                    setUpcomingBookings(formattedBookings);
                });
        }

        fetchSlots();
        fetchBookings();
    }, []);
    function handleBookingClick(e){
        const bookingId = e.target.id
        const booking = upcomingBookings.find(booking=>booking._id === bookingId)
        setSelectedBooking(booking)
        setShowBooking(true)
    }

    return (
        <div className='w-screen min-h-screen'>
          <Navbar>
      </Navbar>
               <div className="max-w-4xl mx-auto p-8 bg-gray-50 shadow-lg rounded-lg space-y-6">
          
           
            

       
          <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-3xl font-semibold text-gray-700 mb-4">My Slots</h1>

              {upcomingSlots.length > 0 ? (
                  <ul className="mt-4 space-y-3 max-h-80 overflow-y-auto">
                      {upcomingSlots.map(slot => (
                          <li key={slot._id} className="p-5 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center">
                              <p className="text-lg font-bold text-gray-800">{slot.displayDate}</p>
                              <p className="text-gray-600">⏰ {slot.displayStartTime} - {slot.displayEndTime}</p>
                          </li>
                      ))}
                  </ul>
              ) : (
                  <p className="text-gray-500 mt-4">No upcoming slots.</p>
              )}
              <div className="text-center">
              <Link to="/dashboard/create-slots" className="text-2xl font-bold text-blue-600 hover:underline">
                  Create Time Slots
              </Link>
          </div>
          </div>

       
          <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-3xl font-semibold text-gray-700 mb-4">Upcoming Bookings</h1>
              {showBooking && selectedBooking && (
                      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                          <p className="text-xl font-semibold text-gray-800">More Info</p>
                          <p className="text-gray-700">👨‍🏫 Student: {selectedBooking.studentFirstName} {selectedBooking.studentLastName}</p>
                          <p className="text-gray-700">📞 Phone: {selectedBooking.studentPhone}</p>
                          <p className="text-gray-700">📅 Day: {new Date(selectedBooking.startTime).toDateString()}</p>
                          <p className="text-gray-700">⏰ Time: {new Date(selectedBooking.startTime).toLocaleTimeString()} - {new Date(selectedBooking.endTime).toLocaleTimeString()}</p>
                          <button 
                              onClick={() => setShowBooking(false)} 
                              className="mt-2 px-4 py-2  bg-red-500 rounded-md shadow hover:bg-red-600 transition duration-300"
                          >
                              Close
                          </button>
                      </div>
                  )}

              {upcomingBookings.length > 0 ? (
                  <ul className="mt-4 space-y-3 max-h-80 overflow-y-auto">
                      {upcomingBookings.map(booking => (
                          <li key={booking._id} className="p-5 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center">
                              <div>
                                  <p className="text-lg font-bold text-gray-800">🎓 {booking.studentFirstName} {booking.studentLastName}</p>
                                  <p className="text-gray-600">📅 {booking.displayDate}</p>
                                  <p className="text-gray-600">⏰ {booking.displayStartTime} - {booking.displayEndTime}</p>
                              </div>
                              <button
                              id={booking._id}
                              onClick={(e)=>handleBookingClick(e)} 
                                  className="px-4 py-2  bg-green-600 rounded-md shadow hover:bg-green-700 transition duration-300"
                              >
                                  More Info
                              </button>
                          </li>
                      ))}
                  </ul>
              ) : (
                  <p className="text-gray-500 mt-4">No upcoming bookings.</p>
              )}
              
              
          </div>
      </div>
  
        </div>
       
    );
}

export default CoachDashboard;
