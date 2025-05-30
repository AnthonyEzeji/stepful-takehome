const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const userRoutes  = require('./routes/user')
const slotRoutes  = require('./routes/slots')
const bookingRoutes  = require('./routes/bookings')
const feedbackRoutes  = require('./routes/feedback')
dotenv.config()

mongoose.connect(process.env.DB)
const app = express()
app.use(express.json(),cors("*"))
app.use("/user",userRoutes)
app.use("/feedback",feedbackRoutes)
app.use("/slot",slotRoutes)
app.use("/booking",bookingRoutes)
app.listen(process.env.PORT,()=>console.log(`Server running on port ${process.env.PORT}`))