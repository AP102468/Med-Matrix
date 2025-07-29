import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    //Setting admin token
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    //We are creating these functions here to make API call because in our admin page many times we have to use these function other wise we ahave to reload page everytime to show the data.
    //THose API calling is needed only once , making the call directly on the page

    const getAllDoctors = async () => {

        // we are not sending any data to the body thats why we are passing {}

        try {
            
            const {data} = await axios.post(backendUrl + '/api/admin/all-doctors' ,{}, {headers:{aToken}})
            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors)
            } else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    const changeAvailability = async (docId) => {

        //Now we are setting the doctor is available or not

        try {
            
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', {docId}, {headers:{aToken}})
            
            if(data.success){
                toast.success(data.message)
                //Now it will update the data for us
                getAllDoctors()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments = async () => {

        //Here we are making the Api call to get the all Appointments data from appointmentDB
        try {
            
            const {data} = await axios.get(backendUrl + '/api/admin/appointments', {headers:{aToken}})

            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments)
            } else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {

        try {
            
            const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment', {appointmentId}, {headers: {aToken}})

            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            } else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    const getDashData = async () => {

        try {
            
            const {data} = await axios.get(backendUrl + '/api/admin/dashboard', {headers: {aToken}})

            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData)
            } else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)

        }
    }




    const value = {
        aToken,setAToken,backendUrl,doctors,getAllDoctors,changeAvailability, appointments, setAppointments, getAllAppointments, cancelAppointment, dashData, getDashData
    }



    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider