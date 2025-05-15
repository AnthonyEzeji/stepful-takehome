import React, { useState } from 'react';
import axios from 'axios';

function FeedbackForm({ booking, setShowEditFeedbackForm,feedback }) {
    const [satisfaction, setSatisfaction] = useState(feedback.satisfaction);
    const [notes, setNotes] = useState(feedback.notes);

    function handleNotesChange(e) {
        setNotes(e.target.value);
    }

    function handleRateChange(e) {
        setSatisfaction(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await axios.patch(`https://stepful-takehome-backend.vercel.app/feedback/${booking.coachId}/${feedback._id}`, {
            satisfaction,
            notes
        }).then(res => {
            console.log(res.data);
        });

        setShowFeedbackForm(false);
        window.location.reload()
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <form className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h1 className="text-xl font-semibold text-gray-700 mb-4">Feedback for Booking</h1>
                <p className="text-gray-600">
                    📅 {new Date(booking.startTime).toLocaleDateString()} ⏰ {new Date(booking.startTime).toLocaleTimeString()} - {new Date(booking.endTime).toLocaleTimeString()}
                </p>
                <p className="text-gray-700 font-medium">👨‍🎓 Student: {booking.studentFirstName} {booking.studentLastName}</p>

           
                <div className="mt-4">
                    <h2 className="text-lg font-semibold text-gray-700">Rate Satisfaction (1-5)</h2>
                    <div className="flex space-x-2 mt-2">
                        {[1, 2, 3, 4, 5].map(num => (
                            <label key={num} className="flex items-center space-x-2">
                                <input 
                                    type="radio" 
                                    name="rate" 
                                    value={num} 
                                    onChange={handleRateChange} 
                                    className="form-radio text-blue-500"
                                />
                                <span className="text-gray-700">{num}</span>
                            </label>
                        ))}
                    </div>
                </div>

          
                <div className="mt-4">
                    <h2 className="text-lg font-semibold text-gray-700">Add Notes</h2>
                    <textarea 
                        value={notes} 
                        onChange={handleNotesChange}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write your feedback..."
                    />
                </div>

             
                <div className="mt-6 flex justify-between">
                    <button 
                        type="submit" 
                        onClick={handleSubmit} 
                        className="px-4 py-2 bg-blue-600  rounded-md shadow hover:bg-blue-700 transition duration-300"
                    >
                        Submit
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setShowEditFeedbackForm(false)} 
                        className="px-4 py-2 bg-red-500  rounded-md shadow hover:bg-red-600 transition duration-300"
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FeedbackForm;
