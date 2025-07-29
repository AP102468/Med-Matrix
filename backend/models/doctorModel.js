import mongoose from "mongoose";

// date property is used to store when the doctor is added
//To set a default value object in slots_booked we must have to mention minimize:false
const doctorSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    image:{type:String, required:true},
    speciality:{type:String, required:true},
    degree:{type:String, required:true},
    experience:{type:String, required:true},
    about:{type:String, required:true},
    available:{type:Boolean, default:true},
    fees:{type:Number, required:true},
    address:{type:Object, required:true},
    date:{type:Number, required:true},
    slots_booked:{type:Object, default:{}}
},{minimize:false})

//Using this Model we can store the doctors data in the database

const doctorModel = mongoose.models.doctor || mongoose.model('doctor',doctorSchema)

export default doctorModel