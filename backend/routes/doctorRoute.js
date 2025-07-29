import express from 'express'
import { doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorDashboard,  doctorProfile, updateDoctorProfile } from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)

//create API route or endpoint for login doctor
doctorRouter.post('/login',loginDoctor)
//create API route or endpoint to show all the all appointments of a particular doctor
doctorRouter.get('/appointments', authDoctor , appointmentsDoctor)

//create API route or endpoint for appointment completion by a doctor
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete)
//create API route or endpoint for appointment cancelation by a doctor
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel)

//create API route or endpoint for showing all data in dashboard
doctorRouter.get('/dashboard', authDoctor, doctorDashboard)

//create API route or endpoint for showing doctor profile in dashboard
doctorRouter.get('/profile', authDoctor, doctorProfile)

//create API route or endpoint for updating doctor profile in dashboard
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile)

export default doctorRouter

