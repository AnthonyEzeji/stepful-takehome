const feedbackModel = require('../models/Feedback')
const userModel = require('../models/User')
async function createFeedback(coachId,studentId,bookingId,satisfaction, notes) {
    try {
        const student = await userModel.findById(studentId)
        if(!student){
            throw new Error('Student not found')
        }
        const existingFeedback = await feedbackModel.findOne({bookingId:bookingId})
        if(existingFeedback){
            throw new Error("Feedback already exists for this booking")
        }
       const feedback = await feedbackModel.create({coachId,studentId,bookingId,satisfaction,notes,studentFirstName:student.firstName,studentLastName:student.lastName})
       return feedback
    } catch (error) {
        return { success: false, error: error.message };
    }
}
async function getAllFeedback(coachId){
    try {

        const feedbackList = await feedbackModel.find({coachId:coachId})
        if(feedbackList){
            return feedbackList
        }
        throw new Error("No feedback found")
    } catch (error) {
        return {error:error.message}
    }
   

}
async function updateFeedback(coachId,feedbackId,notes,satisfaction){
    try {
        const coach = await userModel.findById(coachId)
        if(!coach|| coach.role!=="coach"){
            throw new Error("Unauthorized")
        }
        const updatedFeedback = await feedbackModel.findOneAndUpdate({_id:feedbackId},{notes:notes,satisfaction:satisfaction})
        if(updatedFeedback){
            return updatedFeedback
        }
        throw new Error("Error updating feedback")
    } catch (error) {
        return {error:error.message}
    }
   

}




module.exports = {getAllFeedback,createFeedback,updateFeedback}