import multer from 'multer'

//We can create route using this upload middleware

//Get this chunk of code from npm Multer
const storage = multer.diskStorage({
    filename: function(req,file,callback){
        callback(null,file.originalname)
    }
})

const upload = multer({storage})

export default upload