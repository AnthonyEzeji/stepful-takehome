import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function StudentDashboard() {
    const [upcomingSlots, setUpcomingSlots] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [showBooking, setShowBooking] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        async function fetchSlots() {
            await axios.get('https://stepful-takehome-backend.vercel.app/slot')
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
                })
                .catch(error => console.error("Error fetching slots:", error));
        }
        
        async function fetchBookings() {
            await axios.get(`https://stepful-takehome-backend.vercel.app/booking/${user.userId}`)
                .then(res => {
                    setBookings(res.data);
                })
                .catch(error => console.error("Error fetching bookings:", error));
        }

        fetchBookings();
        fetchSlots();
    }, []);

    async function handleBooking(e) {
        let slotId = e.target.id;
        let slot = upcomingSlots.find(upcomingSlot => upcomingSlot._id === slotId);
        let coachId = slot.coachId;
        await axios.post(`https://stepful-takehome-backend.vercel.app/booking/${user.userId}`, { slotId, coachId })
            .then(res => {
                if(!res.data.error){
                    alert("Slot booked")
                    window.location.reload()
                }else{
                    alert(res.data.error)
                }
                
               
            });
    }

    function handleBookingClick(e) {
        const bookingId = e.target.id;
        setSelectedBooking(bookings.find(booking => booking._id === bookingId));
        setShowBooking(true);
    }

    return (
        <div className='w-screen flex flex-col min-h-screen items-start'>
        <Navbar>
      </Navbar>
             <div className="max-w-4xl mx-auto p-8 bg-gray-50 shadow-lg rounded-lg space-y-6">
            
        
           

       
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold text-gray-700 mb-4">Book a Slot</h1>

                {upcomingSlots.length > 0 ? (
                    <ul className="mt-4 space-y-3 max-h-80 overflow-y-auto">
                        {upcomingSlots.map(slot => (
                            <li key={slot._id} className="p-5 bg-gray-100 rounded-lg shadow-sm flex flex-col justify-between items-center">
                                <p className="text-lg font-bold text-gray-800">Coach: {slot.coachFirstName} {slot.coachLastName}</p>
                                <p className="text-gray-600">
                                    📅 <span className="font-semibold">{slot.displayDate}</span>  
                                    ⏰ {slot.displayStartTime} - {slot.displayEndTime}
                                </p>
                                <button 
                                    id={slot._id} 
                                    onClick={(e) => handleBooking(e)}
                                    className="mt-2 px-4 py-2  bg-blue-600 rounded-md shadow hover:bg-blue-700 transition duration-300"
                                >
                                    Book
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 mt-4">No upcoming slots.</p>
                )}
            </div>

        
            {bookings.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-3xl font-semibold text-gray-700 mb-4">Upcoming Bookings</h1>

                    {showBooking && selectedBooking && (
                        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                            <p className="text-xl font-semibold text-gray-800">More Info</p>
                            <p className="text-gray-700">👨‍🏫 Coach: {selectedBooking.coachFirstName} {selectedBooking.coachLastName}</p>
                            <p className="text-gray-700">📞 Phone: {selectedBooking.coachPhone}</p>
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

                    <ul className="mt-4 space-y-3">
                        {bookings.slice(0,4).map(booking => (
                            <li key={booking._id} className="p-5 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center">
                                <p className="text-gray-800">
                                    👨‍🏫 <span className="font-semibold">{booking.coachFirstName} {booking.coachLastName}</span>  
                                    📅 {new Date(booking.startTime).toDateString()}  
                                    ⏰ {new Date(booking.startTime).toLocaleTimeString()} - {new Date(booking.endTime).toLocaleTimeString()}
                                </p>
                                <button 
                                    id={booking._id} 
                                    onClick={(e) => handleBookingClick(e)}
                                    className="px-4 py-2  bg-green-600 rounded-md shadow hover:bg-green-700 transition duration-300"
                                >
                                    Show More
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        </div>
       
    );
}

export default StudentDashboard;
