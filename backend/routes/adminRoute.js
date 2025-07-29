import express from 'express'
import { addDoctor, allDoctors, loginAdmin, appointmentsAdmin, appointmentCancel, adminDashboard} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/doctorController.js'

const adminRouter = express.Router()

//Whenever we call this endpoint then the formdata we must have to send the image using upload.single(fieldname-image). Then only our middleware will process that image and form data

//authAdmin middleware check the admin is authenticate by jwt token or not
// To check : In postman in this path localhost:4000/api/admin/add-doctor add atoken : jwt token at header section which is generated form http://localhost:4000/api/admin/add-doctor here


adminRouter.post('/add-doctor',authAdmin ,upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors',authAdmin ,allDoctors)
adminRouter.post('/change-availability', authAdmin, changeAvailability)

//Here we are creating api endpoint to get all the appointment details in admin's appointment panel
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)

//Here we define the end point to cancel appointment using admin panel
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)

//Here we define the end point to admin dashboard using admin panel
adminRouter.get('/dashboard', authAdmin, adminDashboard)


export default adminRouter