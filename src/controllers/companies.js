'use strict'

const uuidv4 = require('uuid/v4')
const multer = require('multer')
const path = require('path')
const helpers = require('../helpers/helpers')
const model = require('../models/company')
const miscHelper = require('../helpers/misc')

//set storage engine multer
const storage = multer.diskStorage({
    destination: './public/uploads/companies',
    filename: (req, file, cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

//init upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1*1024*1024
    },
    fileFilter: helpers.imageFilter
}).single('logo')

exports.getCompanies = (req, res)=>{
    model.getCompanies()
    .then(result=>{
        return miscHelper.response(res, 200, false, 'success', result)
        // res.status(200).json({
        //     error: false,
        //     data: result
        // })
    })
    .catch(err=>{
        res.status(400).json({
            error:true,
            message: err
        })
    })
}

exports.addCompany = (req, res)=>{
    upload(req, res, (err)=>{
        if(err){
            res.status(400).json({
                error:true,
                message: err
            })
        }else{
            const {name, email, location, description} = req.body
            const id = uuidv4()
            const logo = req.file ? req.file.filename : req.file
            const data = {id, name, email, logo, location, description}
            model.addCompany(data)
            .then(result=>{
                res.status(201).json({
                    error:false,
                    message: result
                })
            })
            .catch(err=>{
                res.status(400).json({
                    error: true,
                    message: err
                })
            })
        }
    })
}

exports.editCompany=(req, res)=>{
    upload( req, res, (err)=>{
        if(err){
            res.status(400).json({
                error:true,
                message: err
            })
        }else{
            const {name, email, location, description} = req.body
            const logo = req.file ? req.file.filename : req.file
            const data = {name, email, logo, location, description}
            const id = req.params.id
            model.editCompany(data, id)
            .then(result=>{
                res.status(201).json({
                    error:false,
                    message: result
                })
            })
            .catch(err=>{
                res.status(400).json({
                    error:true,
                    message: err
                })
            })
        }
    })
}

exports.deleteCompany = (req, res)=>{
    const id = req.params.id
    model.deleteCompany(id)
    .then(result=>{
        res.status(200).json({
            error:false,
            message: result
        })
    })
    .catch(err=>{
        res.status(400).json({
            error:true,
            message: err
        })
    })
}