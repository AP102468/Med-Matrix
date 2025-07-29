import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";


export const AppContext = createContext()

const AppContextProvider = (props) => {

    // If we change the currencySymbol all the pages it will updated
    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL 
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [userData, setUserData] = useState(false)


    //Making Api call to get doctors
    const getDoctorsData = async () => {

        try {
            
            const {data} = await axios.get(backendUrl + '/api/doctor/list')
            if(data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    //User profile will loaded when user will logged in
    const loadUserProfileData = async () => {

        try {
            
            const {data} = await axios.get(backendUrl + '/api/user/get-profile', {headers: {token}})
            if(data.success){
                setUserData(data.userData)
            } else{
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    //We can access these value in any component
    const value = {
        doctors, getDoctorsData,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData, setUserData,
        loadUserProfileData
    }

    useEffect(()=>{
        getDoctorsData()
    },[])

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        } else{
            setUserData(false)
        }
    },[token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
           
}

export default AppContextProvider