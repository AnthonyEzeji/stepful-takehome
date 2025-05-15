const bookingModel = require('../models/Booking');
const slotModel = require('../models/Slot');
const userModel  = require('../models/User')
async function createBooking(studentId, coachId, slotId) {
    try {
       
        const coach = await userModel.findById(coachId)
        const student = await userModel.findById(studentId)
        if(!coach){
            throw new Error("Coach not found")
        }
        if(!student){
            throw new Error("Student not found")
        }
   
        const slot = await slotModel.findOne({ _id: slotId, coachId });
        if (!slot) {
            throw new Error("Slot does not exist.");
        }
        if (slot.isBooked) {
            throw new Error("Slot is already booked.");
        }

      
        const studentConflictingBooking = await bookingModel.findOne({
            studentId,
            $or: [
                { startTime: { $lt: slot.endTime, $gte: slot.startTime } },
                { endTime: { $gt: slot.startTime, $lte: slot.endTime } }
            ]
        });
  
        if (studentConflictingBooking) {
            throw new Error("Student already has a booking that overlaps with this time slot.");
        }


        const newBooking = new bookingModel({ studentFirstName:student.firstName,studentLastName:student.lastName,coachFirstName:coach.firstName,coachLastName:coach.lastName,coachPhone:coach.phone,studentPhone:student.phone, studentId, coachId, startTime:slot.startTime,endTime:slot.endTime, slotId });
        await newBooking.save();
   
        await slotModel.findByIdAndUpdate(slotId, { isBooked: true });
        return newBooking;
    } catch (error) {
        console.log(error)
        return {error:error.message}
    }
}

async function deleteBooking(studentId, coachId, slotId) {
    try {
     
      
        const booking = await bookingModel.findOne({ studentId, coachId, slotId });
    
        if (!booking) {
            throw new Error("Booking does not exist.");
        }
        await bookingModel.deleteOne({ studentId, coachId, slotId });

   
        await slotModel.findByIdAndUpdate(slotId, { isBooked: false });

        return await slotModel.findById(slotId); 
    } catch (error) {
        return {error:error.message};
    }
}

async function getBookings(id){
    try {
        const user = await userModel.findById(id)
        let bookings = []
        if(!user){
            throw new Error("Invalid ID")
        }
        if(user.role === "coach"){
             bookings = await bookingModel.find({coachId:id})
        }
        if(user.role === "student"){
             bookings = await bookingModel.find({studentId:id})
        }
        return bookings
        

    } catch (error) {
        return {error:error.message}
    }
   
}




module.exports = {createBooking,deleteBooking,getBookings}