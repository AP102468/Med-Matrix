import express from 'express'
import { getProfile, loginUser, registerUser, updateProfile, bookAppointment, listAppointment, cancelAppointment, makePayment } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

//When we call the API we will provide the token in header and we will able to get the userprofile detail
userRouter.get('/get-profile',authUser, getProfile)

//Here we are using two middle-ware first one is for passing form data [image] and second one is for authenticate user
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)

//Here we are implementing Booking appointment
userRouter.post('/book-appointment', authUser, bookAppointment)

//Here we are Getting list of appointments to the my appointment page
userRouter.get('/appointments',authUser , listAppointment)

//cancel Appointment
userRouter.post('/cancel-appointment', authUser, cancelAppointment)
//make Payment
userRouter.post('/make-payment', authUser, makePayment)













export default userRouter