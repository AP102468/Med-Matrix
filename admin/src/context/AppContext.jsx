import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    //We are creating these functions here to make API call because in our admin page many times we have to use these function other wise we ahave to reload page everytime to show the data.
    //THose API calling is needed only once , making the call directly on the page

    const currency = "$"

    const months = [" ","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const calculateAge = (dob) => {

        const birthYear = new Date(dob).getFullYear();
        const currentYear = new Date().getFullYear();

        let age = currentYear - birthYear


        return age ;

    }

    const value = {
        calculateAge, slotDateFormat, currency
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider