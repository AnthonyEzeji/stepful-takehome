const slotModel = require('../models/Slot')
const userModel = require('../models/User')
async function createSlots(coachId, slotsArray) {
    try {
        const coach = await userModel.findById(coachId)
        if(!coach || coach.role !=='coach'){
            throw new Error('Invalid ID')
        }
        if (!Array.isArray(slotsArray) || slotsArray.length === 0) {
            throw new Error("Invalid input: Provide an array of slots.");
        }

        const newSlots = [];

        for (const slot of slotsArray) {
            const { startTime, endTime } = slot;

            const slotStart = new Date(startTime);
            const slotEnd = new Date(endTime);

   
            const conflictingSlot = await slotModel.findOne({
                coachId,
                startTime: { $lt: slotEnd, $gt: slotStart }
            });

            if (conflictingSlot) {
                throw new Error(`Conflicting slot exists at ${conflictingSlot.startTime}`);
            }

         
            const existingSlot = await slotModel.findOne({ coachId, startTime: slotStart });
            if (existingSlot) {
                throw new Error(`Slot already exists at ${existingSlot.startTime}`);
            }

 
            const newSlot = new slotModel({ coachId, startTime: slotStart, endTime: slotEnd , coachFirstName:coach.firstName,coachLastName:coach.lastName});
            await newSlot.save();
            newSlots.push(newSlot);
        }

        return { success: true, createdSlots: newSlots };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function deleteSlot(slotId){
    try {

        let slot  = await slotModel.findById(slotId)
        if(!slot){
            throw new Error('Slot does not exist')
        }
        slot = await slotModel.findByIdAndDelete(slotId)
        return slot
    
    } catch (error) {
       return {error:error.message}
    }
}
async function getSlotsById(id){
    try {
        const slots = await slotModel.find({coachId:id})
        return slots
    
    } catch (error) {
        return {error:error.message}
    }
    
}
async function getAllSlots(){
    try {
       const slots = await slotModel.find()
       return slots
    
    } catch (error) {
        return {error:error.message}
    }
    
}
module.exports = {getAllSlots,getSlotsById,deleteSlot,createSlots}