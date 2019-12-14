'use strict'

module.exports = {
    imageFilter : (req, file, cb)=>{
        if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)){
            req.fileValidationError = 'Only image files are allowed!'
            return cb(new Error('Only image files are allowed!'), false)
        }
        cb(null, true)
    }
}