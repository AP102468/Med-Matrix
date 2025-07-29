//Here we create different controller function for admin

import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'

//API for adding doctors by admin

const addDoctor = async (req,res) => {

    try {
        const {name, email, password, speciality, degree, experience, about, fees, address} = req.body
        const imageFile = req.file

        // console.log({name, email, password, speciality, degree, experience, about, fees, address},imageFile) => check the API in postman

        // Checking for all data to add doctor that every field is filled or not
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false,message:"Missing details"})
        }

        //Validating Email format
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        //Validating Strong password
        if(password.length < 8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imageUrl = imageUpload.secure_url
        
        //data format which store into the data base
        const doctorData = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true, message:"Doctor Added"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }


}

//API for admin login
const loginAdmin = async (req,res) => {
    try {
        
        const {email, password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true, token})

        }else{
            res.json({success:false, message:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//Creating Api for all doctor list for admin panel

const allDoctors = async (req,res) => {
    try {
        
        // -password It will remove the password property from doctor response
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors}) 

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API to get all the appointments list
const appointmentsAdmin = async (req,res) => {

    try {
        
        //This statement will provide all the appointments from all the doctors and user and save in the appointments variable
        const appointments = await appointmentModel.find({})
        res.json({success: true, appointments})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//API for appointment cancelation
const appointmentCancel = async (req,res) => {

    try {
        
        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)


        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})

        //releasing doctor slot

        const {docId, slotDate, slotTime} = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        //If the slottime is matching with the slottime that we canceled then remove the slot time from the data
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success:true, message:'Appointment Cancelled'})


    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API to get dashboard data for admin panel
const adminDashboard = async (req,res) => {
    try {
        
        //Accessing all doctors
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,6)
        }

        res.json({success:true,dashData})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}


export {addDoctor,loginAdmin,allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard}