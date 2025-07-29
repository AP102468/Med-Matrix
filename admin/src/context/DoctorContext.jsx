//Here we define the logic for doctor log in and token
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import {toast} from "react-toastify"

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    //We are creating these functions here to make API call because in our admin page many times we have to use these function other wise we ahave to reload page everytime to show the data.
    //THose API calling is needed only once , making the call directly on the page


    //We are storing doctor authentication token in this state variable
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '' )

    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    const getAppointments = async () => {

        try {
            
            const {data} = await axios.get(backendUrl + '/api/doctor/appointments', {headers:{dToken}})

            if(data.success){
                //we get the latest appointments at the first position of the array
                setAppointments(data.appointments.reverse())
                console.log(data.appointments.reverse())

            } else{
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const completeAppointment = async (appointmentId) => {

        try {
            
            const {data} = await axios.post(backendUrl + '/api/doctor/complete-appointment', {appointmentId}, {headers:{dToken}})

            if(data.success){
                toast.success(data.message)
                getAppointments()
            } else{
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const cancelAppointment = async (appointmentId) => {

        try {
            
            const {data} = await axios.post(backendUrl + '/api/doctor/cancel-appointment', {appointmentId}, {headers:{dToken}})

            if(data.success){
                toast.success(data.message)
                getAppointments()
            } else{
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    //get all the doctors's data in the doctor panel
    const getDashData = async () => {

        try {
            
            const {data} = await axios.get(backendUrl + '/api/doctor/dashboard', {headers: {dToken}})

            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData)
            } else{
                toast.error(data.message)
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)  
        }
    }

    //get all the doctors's profile in the doctor panel

    const getProfileData = async () => {
        try {
          
            const {data} = await axios.get(backendUrl + '/api/doctor/profile', {headers:{dToken}})

            if(data.success){
                setProfileData(data.profileData)
                console.log(data.profileData)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)  
        }
    }

    const value = {
        backendUrl, dToken, setDToken, appointments, setAppointments, getAppointments, completeAppointment, cancelAppointment, dashData, setDashData, getDashData, profileData, setProfileData, getProfileData
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )

}

export default DoctorContextProvider