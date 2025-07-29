import jwt from 'jsonwebtoken'

//We are adding logic to verify the token sothat if we get any request and in the header if only contain token then only allow the user to make the api call otherwise we will terminate the api call in this middle ware

//admin authentication middleware
const authAdmin = async (req,resizeBy,next) => {
    try {
        
        const{atoken} = req.headers

        if(!atoken){
            return res.json({success:false, message:"Not Authorized Login again"})
        }

        //This will verify the the given token using secret key
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)

        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false, message:"Not Authorized Login again"})   
        }

        //If the after decryption the token is matching with both the email and password then we call the next function

        next()

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export default authAdmin;