const express = require('express')
const slotController = require('../controllers/slotController')
const router = express.Router()

router.get("/:coachId",async (req,res)=>{
    try {
       
        const {coachId} = req.params
       let slots = await slotController.getSlotsById(coachId)
       res.send(slots)
    } catch (error) {
        res.send(error)
    }
   

})
router.get("/",async (req,res)=>{
    try {
       let slots = await slotController.getAllSlots()
       res.send(slots)
    } catch (error) {
        res.send(error)
    }
   

})
router.post("/:coachId",async (req,res)=>{
    try {
       
        const {coachId} = req.params
        const {slots} = req.body
        console.log(slots)
        const response =  await slotController.createSlots(coachId,slots)
        console.log(response)
        res.send(response)
       
    } catch (error) {
        res.send({error:error.message})
       
    }
   
})
router.delete("/:coachId",async (req,res)=>{
    try {
       
      
        const {slotId} = req.body
        await slotController.deleteSlot(slotId).then(response=>{
           
            res.send(response)
        })
       
    } catch (error) {
        res.send({error:error.message})
       
    }
   
})
module.exports = router