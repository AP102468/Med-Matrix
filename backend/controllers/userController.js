//Here we define all the functionalities of user: login, register, get profile, update profile, book appointment, display book appointment, cancel appointment, add payment gateway

import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'

//API to register user
const registerUser = async (req,res) => {

    try {
        
        const {name,email,password} = req.body

        if(!name || !password || !email){
            return res.json({success:false, message:"Missing details"})
        }

        //validating email format
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Enter a valid email"})
        }

        //validating strong password
        if (password.length < 6){
            return res.json({success:false, message:"enter a strong password"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password : hashedPassword
        }

        const newUser = new userModel(userData)

        //new user will save in the Data base
        const user = await newUser.save()

        //Generating token using userid and secret key
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

        res.json({success:true,token })


    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }


}

//API for User login

const loginUser = async (req,res) => {

    try {
        
        const {email,password} = req.body
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:'User does not exist'})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true,token})

        }else{
            res.json({success:false, message:'Invalid Credential'})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API to get USER's profile data . Making Controller function to get the user's profile data

const getProfile = async (req,res) => {

    try {

        //We will get the user's Id and provide the user's data and provide to the front end
        //User will send the token and by using the token we will get the userid. The we add this id to the request body so that we can access in this function

        const userId = req.user.id; 


        const userData = await userModel.findById(userId).select('-password')

        res.json({success:true, userData})


    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API to update user profile

const updateProfile = async (req,res) => {

    try {
        
        const userId = req.user.id; 
        const { name, phone, address, dob, gender } = req.body;

        const imageFile = req.file

        if(!name || !phone || !dob || !gender){
            return res.json({success:false, message: "Data missing"})
        }

        await userModel.findByIdAndUpdate(userId, {name,phone,address:JSON.parse(address),dob,gender})

        if(imageFile){

            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, {image:imageURL})

        }

        res.json({success:true, message:"Profile Updated"})


    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}


//API to book appointment
const bookAppointment = async (req,res) => {

    try {
        
        const userId = req.user.id;
        const { docId, slotDate, slotTime} = req.body

        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available){
            return res.json({success:false, message:'Doctor not available'})
        }

        let slots_booked = docData.slots_booked

        //checking for slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false, message:'slot not available'})
            } else{
                slots_booked[slotDate].push(slotTime)
            }
        } else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        //save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success:true,message:'Appointment Booked'})



    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}

//API to get user appointments for frontend my appointments page
const listAppointment = async (req,res) => {

    try {
        
        const userId = req.user.id;

        //We can find the userId for the particular user from the appointment database
        const appointments = await appointmentModel.find({userId});

        res.json({success:true, appointments})


    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}

//API to cancel Appointment
const cancelAppointment = async (req,res) => {

    try {
        
        const userId = req.user.id
        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        //verify appointment user : one userId from Api of appointment data and another is from middleware
        if(appointmentData.userId !== userId){
            return res.json({success:false, message:"Unauthorized action"})
        }

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

//API to pay online
const makePayment = async(req,res) => {
    try {
        
        const userId = req.user.id
        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData.userId !== userId){
            return res.json({success: false, message: 'Unauthorized action'})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, {payment:true})

        res.json({success:true, message: 'payment successfull'})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}



export {registerUser, loginUser, getProfile, updateProfile,bookAppointment,listAppointment, cancelAppointment, makePayment}

