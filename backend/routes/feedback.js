const express = require('express')
const feedbackController = require('../controllers/feedbackController')
const router = express.Router()


router.post("/:coachId",async (req,res)=>{
    try {

        const {coachId} = req.params
        const {satisfaction,notes,studentId,bookingId} = req.body
        const response = await feedbackController.createFeedback(coachId,studentId,bookingId,satisfaction,notes)
        res.send(response)
    } catch (error) {
        res.send({error:error.message})
    }
   

})
router.get("/:coachId",async (req,res)=>{
    try {
       
        const {coachId} = req.params
        const response =  await feedbackController.getAllFeedback(coachId)
        res.send(response)
       
    } catch (error) {
        res.send({error:error.message})
       
    }
   
})
router.patch("/:coachId/:feedbackId",async (req,res)=>{
    try {
       
        const {coachId,feedbackId} = req.params
        const {notes,satisfaction} = req.body
        const response =  await feedbackController.updateFeedback(coachId,feedbackId,notes,satisfaction)
        res.send(response)
       
    } catch (error) {
        res.send({error:error.message})
       
    }
   
})

module.exports = router