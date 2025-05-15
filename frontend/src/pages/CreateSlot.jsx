import React from 'react';
import SlotCalendar from '../components/SlotCalendar';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function CreateSlot() {
  var navigate = useNavigate()
    async function handleSlots(slots) {
        
        await axios.post(`http://localhost:5010/slot/${JSON.parse(localStorage.getItem('user')).userId}`, { slots })
            .then(response => {
                if (response.data.message) {
                    alert(response.data.message);
                }
              
            });
            navigate("/dashboard")
    }

    return (
      <div className='w-screen min-h-screen'>
       <Navbar>
      </Navbar>
         <div className="max-w-4xl mx-auto p-8 bg-gray-50 shadow-lg rounded-lg space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center">Create Time Slots</h1>
            <p className="text-gray-600 text-center">Select your available slots using the calendar below.</p>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <SlotCalendar handleSlots={handleSlots} />
            </div>
        </div>
      </div>
       
    );
}

export default CreateSlot;
