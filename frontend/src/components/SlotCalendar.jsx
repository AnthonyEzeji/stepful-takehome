import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';

export default function SlotCalendar({ handleSlots }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedHour, setSelectedHour] = useState("8");
    const [selectedMinute, setSelectedMinute] = useState("00");
    const [selectedPeriod, setSelectedPeriod] = useState("AM");
    const [slots, setSlots] = useState([]);
    const [filteredSlots, setFilteredSlots] = useState([]);
    const [newSlots, setNewSlots] = useState([]); 

    let user = JSON.parse(localStorage.getItem('user'));
    var navigate = useNavigate()
    useEffect(() => {
        if(user.role==="student"){
            navigate('/dashboard')
        }
        async function fetchSlots() {
            await axios.get(`https://stepful-takehome-backend.vercel.app/slot/${user.userId}`)
                .then(response => setSlots(response.data))
                .catch(error => console.error("Error fetching slots:", error));
        }
        fetchSlots();
    }, []);

    useEffect(() => {
        if (!selectedDate || slots.length === 0) {
            setFilteredSlots([]);
            return;
        }
        if (selectedDate) {
            setSelectedHour("8"); 
            setSelectedMinute("00");
            setSelectedPeriod("AM");
        }
    
        const selectedDateString = new Date(selectedDate).toDateString(); 
    

        const filtered = slots.filter(slot => {
            const slotStartDate = new Date(slot.startTime).toDateString(); 
            return slotStartDate === selectedDateString;
        });
    
        setFilteredSlots(filtered);
    }, [selectedDate, slots]);
    
 

    const handleAddSlot = () => {
        if (!selectedDate || selectedHour === "" || selectedMinute === "") {
            alert("Please select a date, hour, and minutes!");
            return;
        }
    
        let hour = parseInt(selectedHour);
        if (selectedPeriod === "PM" && hour !== 12) hour += 12;
        if (selectedPeriod === "AM" && hour === 12) hour = 0;
    
        const startTime = new Date(selectedDate);
        const now = new Date();
        if (startTime < now) {
            alert("Invalid slot: The selected time is in the past!");
            return;
        }
        startTime.setHours(hour);
        startTime.setMinutes(parseInt(selectedMinute));
    
        let endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);
        
     
        if (startTime.getDate() !== endTime.getDate()) {
            endTime.setDate(startTime.getDate() + 1);
        }
        const formatDateISO = (date) => date.toISOString(); 


        const conflictingServerSlot = slots.find(slot => {
            const existingStart = formatDateISO(new Date(slot.startTime));
            const existingEnd = formatDateISO(new Date(slot.endTime));
        
            const newSlotStart = formatDateISO(startTime);
            const newSlotEnd = formatDateISO(endTime);
        
            return (
                newSlotStart > existingStart && newSlotStart < existingEnd || 
                newSlotEnd > existingStart && newSlotEnd < existingEnd        
            ) && (
                newSlotStart.split("T")[0] === existingStart.split("T")[0]
            );
        });
        
        const conflictingNewSlot = newSlots.find(slot => {
            const newSlotStart = formatDateISO(startTime);
            const newSlotEnd = formatDateISO(endTime);
        
            const existingStart = formatDateISO(slot.startTime);
            const existingEnd = formatDateISO(slot.endTime);
        
            return (
                newSlotStart > existingStart && newSlotStart < existingEnd || 
                newSlotEnd > existingStart && newSlotEnd < existingEnd
            ) && (
                newSlotStart.split("T")[0] === existingStart.split("T")[0]
            );
        });
        
    
        if (conflictingServerSlot) {
            alert(`Invalid slot: It conflicts with an existing slot on ${new Date(conflictingServerSlot.startTime).toDateString()} from ${new Date(conflictingServerSlot.startTime).toLocaleTimeString()} to ${new Date(conflictingServerSlot.endTime).toLocaleTimeString()}`);
            return;
        }
    
        if (conflictingNewSlot) {
            alert(`Invalid slot: It conflicts with a newly added slot on ${new Date(conflictingNewSlot.startTime).toDateString()} from ${conflictingNewSlot.startTime.toLocaleTimeString()} to ${conflictingNewSlot.endTime.toLocaleTimeString()}`);
            return;
        }
        
    
        setNewSlots([...newSlots, { 
            date: startTime.toDateString(), 
            startTime, 
            endTime 
        }]);
        
    };
    

    const handleSubmitSlots = () => {
        if (newSlots.length === 0) {
            alert("No slots added!");
            return;
        }

        handleSlots(newSlots);
        setNewSlots([]);
        
    };
    const formatDisplayDate = (isoString) => {
        const date = new Date(isoString);
        return date.toDateString(); 
    };
    

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center">Add Multiple Slots</h2>
            
            <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                className="border rounded-lg shadow-md"
                tileClassName={({ date, view }) => 
                    view === "month" && selectedDate && date.toDateString() === selectedDate.toDateString() 
                        ? "bg-blue-500 text-white rounded-full" 
                        : ""
                }
            />

            {selectedDate && (
                <>
                    <div className="text-lg font-semibold text-gray-700 mt-4">
                        Selected Date: {selectedDate.toDateString()}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-700 mt-4">Scheduled Slots</h3>
                    {filteredSlots.length > 0 ? (
    <ul className="mt-2 space-y-2">
        {filteredSlots.map(slot => (
            <li key={slot._id} className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between">
                <p>
                    {new Date(slot.startTime).toDateString()} - {new Date(slot.startTime).toLocaleTimeString()} to {new Date(slot.endTime).toLocaleTimeString()}
                </p>
            </li>
        ))}
    </ul>
) : (
    <p className="text-gray-500 mt-2">No slots scheduled for this date.</p>
)}

                    <h3 className="text-lg font-semibold text-gray-700 mt-4">Add New Slots</h3>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        <div>
                            <label className="text-sm text-gray-600">Hour:</label>
                            <select value={selectedHour} className="block w-full border p-2 rounded-md" onChange={(e) => setSelectedHour(e.target.value)}>
                                {[...Array(12)].map((_, i) => <option key={i} value={i + 1}>{(i + 1).toString().padStart(2, '0')}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Minutes:</label>
                            <select value={selectedMinute} className="block w-full border p-2 rounded-md" onChange={(e) => setSelectedMinute(e.target.value)}>
                                {[...Array(60)].map((_, i) => <option key={i} value={i}>{i.toString().padStart(2, '0')}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">AM/PM:</label>
                            <select value={selectedPeriod} className="block w-full border p-2 rounded-md" onChange={(e) => setSelectedPeriod(e.target.value)}>
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>
                    </div>

                    <button onClick={handleAddSlot} className="bg-blue-500  py-2 px-4 rounded mt-4">Add Slot</button>
                    {newSlots.length > 0 && (
                        <button onClick={handleSubmitSlots} className="bg-green-500  py-2 px-4 rounded mt-2">Submit All Slots</button>
                    )}

                    <ul className="mt-4 space-y-2">
                        {newSlots.map((slot, index) => (
                            <li key={index} className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between">
                                <p>{slot.date} {slot.startTime.toLocaleTimeString()} - {slot.endTime.toLocaleTimeString()}</p>
                                <button className="text-red-500 hover:text-red-700" onClick={() => setNewSlots(newSlots.filter((_, i) => i !== index))}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
