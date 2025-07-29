//Here we are creating Db model for appointment booking => When user make an appointment the data will store in this database

//Whenever a user book an appointment we have to send the docId, slotDate and slotTime. userID will send through middleware and other data will generate in backend using authentication token

import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    docId: {type: String, required: true},
    slotDate: {type: String, required: true},
    slotTime: {type: String, required: true},
    userData: {type: Object, required: true},
    docData: {type: Object, required: true},
    amount: {type: Number, required: true},
    date: {type: Number, required: true},
    cancelled: {type: Boolean, default: false},
    payment: {type: Boolean, default: false},
    isCompleted: {type: Boolean, default: false},
})

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema)

export default appointmentModel