const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    studentId: { type: String, required: true }, 
    coachId: { type: String, required: true }, 
    coachFirstName: { type: String, required: true },
    coachLastName: { type: String, required: true },
    studentFirstName: { type: String, required: true },
    studentLastName: { type: String, required: true },
    studentPhone: { type: String, required: true },
    coachPhone: { type: String, required: true },
    slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true, unique: true }, 
    startTime:{type:Date,required:true},
    endTime:{type:Date,required:true},
    createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
