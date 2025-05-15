const mongoose = require('mongoose')
const FeedbackSchema = new mongoose.Schema({
    coachId: { type: String, required: true }, 
    studentId: { type: String, required: true }, 
    studentFirstName: { type: String, required: true },
    studentLastName: { type: String, required: true }, 
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    satisfaction: { type: Number, min: 1, max: 5, required: true },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = Feedback;
