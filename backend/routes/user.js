const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()

router.post("/register",async (req,res)=>{
    try {
        const user = req.body
        await userController.registerUser(user).then(response=>{
            res.send(response)
        })
    } catch (error) {
        
    res.send({error:error.message})
    }
   

})
router.post("/login",async (req,res)=>{
    try {
       const  {email,password} = req.body
        await userController.loginUser(email,password).then(response=>{
            res.send(response)
        })
    } catch (error) {
        res.send({error:error.message})
    }
   

})
module.exports = router