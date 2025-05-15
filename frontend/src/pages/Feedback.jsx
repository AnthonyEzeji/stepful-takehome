import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import EditFeedbackForm from '../components/EditFeedbackForm'
function Feedback() {
    const coach = JSON.parse(localStorage.getItem('user'));
    const [feedbackList, setFeedbackList] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState();
    const [selectedBooking, setSelectedBooking] = useState();
    const [showEditFeedbackForm, setShowEditFeedbackForm] = useState(false);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        async function fetchFeedback() {
            await axios.get(`https://stepful-takehome-backend.vercel.app/feedback/${coach.userId}`).then(res => {
                setFeedbackList(res.data);
            });
        }

        async function fetchBookings() {
            await axios.get(`https://stepful-takehome-backend.vercel.app/booking/${coach.userId}`).then(res => {
                setBookings(res.data);
            });
        }

        fetchBookings();
        fetchFeedback();
    }, []);

    async function handleFeedbackDelete(e) {
        const feedbackId = e.target.id;
        await axios.delete(`https://stepful-takehome-backend.vercel.app/feedback/${feedbackId}`).then(res => {
            console.log(res.data);
            setFeedbackList(prevFeedback => prevFeedback.filter(feedback => feedback._id !== feedbackId));
        });
    }
    function handleEditFeedback(e){
        let feedbackId = e.target.id
        let feedback = feedbackList.find(feedback=>feedback._id === feedbackId)
        let booking = bookings.find(booking=>booking._id === feedback.bookingId)
        setSelectedFeedback(feedback)
        setSelectedBooking(booking)
        setShowEditFeedbackForm(true)
    }

    return (
        <div className="w-screen min-h-screen bg-gray-50">
            <Navbar>
      </Navbar>

            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Feedback</h1>

                {feedbackList.length > 0 ? (
                    <ul className="space-y-4">
                        {feedbackList&&feedbackList.map(feedback => {
                            let booking = bookings.find(booking => booking._id === feedback.bookingId);
                            if(booking){
                                return (
                                    <li key={feedback._id} className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                                        <div className="text-gray-700 space-y-2">
                                            <p className="font-semibold text-lg">Booking: {new Date(booking.startTime).toDateString()} ⏰ {new Date(booking.startTime).toLocaleTimeString()} - {new Date(booking.endTime).toLocaleTimeString()}</p>
                                            <p className="text-gray-600">🎓 Student: {feedback.studentFirstName} {feedback.studentLastName}</p>
                                            <p className="text-gray-600">⭐ Satisfaction: {feedback.satisfaction}/5</p>
                                            <p className="text-gray-600">📝 Notes: {feedback.notes}</p>
                                        </div>
                                        <button
                                            id={feedback._id}
                                            onClick={(e)=>handleEditFeedback(e)}
                                            className="px-4 py-2 bg-red-500  font-semibold rounded-md shadow hover:bg-red-600 transition duration-300"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            id={feedback._id}
                                            onClick={handleFeedbackDelete}
                                            className="px-4 py-2 bg-red-500  font-semibold rounded-md shadow hover:bg-red-600 transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </li>
                                );
                            }
                            
                        })}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-lg">No feedback available.</p>
                )}
            </div>
            {showEditFeedbackForm&&<EditFeedbackForm booking={selectedBooking} feedback={selectedFeedback} setShowEditFeedbackForm={setShowEditFeedbackForm}/>}
        </div>
    );
}

export default Feedback;
