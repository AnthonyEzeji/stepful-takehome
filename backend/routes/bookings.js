const express = require('express')
const bookingController = require('../controllers/bookingController')
const router = express.Router()


router.post("/:studentId",async (req,res)=>{
    try {
        const {studentId} = req.params
        const {coachId,slotId} = req.body
        console.log(studentId,coachId,slotId)
        const response = await bookingController.createBooking(studentId,coachId,slotId)
        res.send(response)
    } catch (error) {
        res.send({error:error.message})
    }
   

})
router.get("/:id",async (req,res)=>{
    try {
       
        const {id} = req.params
        const response =  await bookingController.getBookings(id)
        res.send(response)
       
    } catch (error) {
        res.send({error:error.message})
       
    }
   
})
router.delete("/:slotId",async (req,res)=>{
    try {
       const {slotId} = req.params
       const {coachId,studentId} = req.body
       const response = await bookingController.deleteBooking(studentId,coachId,slotId)
       res.send(response)

    } catch (error) {
        res.send({error:error.message})
       
    }
   
})
module.exports = router