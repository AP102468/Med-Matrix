//To change the header to user id creating this middle ware
import jwt from 'jsonwebtoken'

//We are adding logic to verify the token sothat if we get any request and in the header if only contain token then only allow the docotr to make the api call otherwise we will terminate the api call in this middle ware

//Doctor authentication middleware
const authDoctor = async (req,res,next) => {
    try {
        
        const {dtoken} = req.headers

        if(!dtoken){
            return res.json({success:false, message:"Not Authorized Login again"})
        }

        //This will verify the the given token using secret key
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)


        //If the after decryption the token is it converts actual docotor._id and returning then we call the next function
        req.docId = token_decode.id

        next()

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export default authDoctor;