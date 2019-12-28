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
exports.getCompany = (req, res) => {
    const id = req.params.id

    model.getCompany(id)
    .then(result=>{
        res.status(200).json({
            error: false,
            result
        })
    })
    .catch(err=>{
        res.status(400).json({
            error:true,
            err
        })
    })
}

exports.getCompanies = (req, res)=>{
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const offset = (page-1)*limit
    const sort = req.query.sort ? req.query.sort : 'name'
    const order = req.query.order || 'asc'
    const name = req.query.name
    let condition = ''
    let url = req.originalUrl
    
    if(name){
        condition = "where name like '%"+name+"%' order by "+sort+" "+order
    }
    if(!name){
        condition = "order by "+sort+" "+order
    }

    let nextPage = process.env.BASE_URL+url.replace(`page=${page}`, 'page='+parseInt(page+1))
    let prevPage = process.env.BASE_URL+url.replace(`page=${page}`, 'page='+parseInt(page-1))
    console.log(condition)
    model.getCompanies(limit, offset, condition)
    .then(result=>{
        let pageTotal = result.dataTotal%limit===0?result.dataTotal/limit:Math.floor((result.dataTotal/limit)+1)
        if(page>pageTotal || page===0){
            return res.status(200).json({
                error: true,
                message: '404 Page Not Found!',
                page,
                limit,
                totalData: result.dataTotal,
                totalPage: pageTotal,
                result
            })
        }else if(page===1&&pageTotal!==1){
            return res.status(200).json({
                error: false,
                page,
                nextPage,
                limit,
                totalData: result.dataTotal,
                totalPage: pageTotal,
                result
            })
        }else if(page===pageTotal&&pageTotal!==1){
            return res.status(200).json({
                error: false,
                page,
                prevPage,
                limit,
                totalData: result.dataTotal,
                totalPage: pageTotal,
                result
            })
        }else if(pageTotal===1){
            return res.status(200).json({
                error: false,
                page,
                limit,
                totalData: result.dataTotal,
                totalPage: pageTotal,
                result
            })
        }else{
            // return miscHelper.response(res, 200, false, 'Success', result)
            return res.status(200).json({
                error: false,
                page,
                nextPage,
                prevPage,
                limit,
                totalData: result.dataTotal,
                totalPage: pageTotal,
                result
            })
        }
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