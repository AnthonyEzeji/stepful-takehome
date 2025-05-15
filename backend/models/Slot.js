const mongoose = require('mongoose')
const SlotSchema = new mongoose.Schema({
    coachId: { type: String, required: true }, 
    coachFirstName:{type:String,required:true},
    coachLastName:{type:String,required:true},
    startTime: { type: Date, required: true },
    endTime:{ type: Date, required: true },
    isBooked: { type: Boolean, default: false },
});

const Slot = mongoose.model("Slot", SlotSchema);
module.exports = Slot;
