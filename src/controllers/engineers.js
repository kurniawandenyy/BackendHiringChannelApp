'use strict'
require('dotenv/config')
const uuidv4 = require('uuid/v4')
const model = require('../models/engineer')
const multer = require('multer')
const path = require('path')
const helpers = require('../helpers/helpers')
const miscHelper = require('../helpers/misc')

const storage = multer.diskStorage({
    destination: './src/img/engineer',
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
}).single('photo')

module.exports = {
    getEngineers:(req, res)=>{
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const offset = (page-1)*limit
        const sort = req.query.sort ? req.query.sort : 'name'
        const order = req.query.order || 'asc'
        const name = req.query.name
        const skill = req.query.skill
        let condition = ''
        let url = req.originalUrl
        const pageDetail = {

        }

        if(!name){
            condition = "where skill like '%"+skill+"%' order by "+sort+" "+order
        }
        if(!skill){
            condition = "where name like '%"+name+"%' order by "+sort+" "+order
        }
        if(name && skill){
            condition = "where name like '%"+name+"% or skill like '%"+skill+"%' order by "+sort+" "+order
        }
        if(!name && !skill){
            condition = "order by "+sort+" "+order
        }

        let nextPage = process.env.BASE_URL+url.replace(`page=${page}`, 'page='+parseInt(page+1))
        let prevPage = process.env.BASE_URL+url.replace(`page=${page}`, 'page='+parseInt(page-1))
 
        model.getEngineers(limit, offset, condition)
        .then(result=>{
            let pageTotal = result.dataTotal%limit===0?result.dataTotal/limit:Math.floor((result.dataTotal/limit)+1)
            if(page>pageTotal || page===0){
                res.status(404).json({
                    error: true,
                    message: '404 Page Not Found!'
                })
            }
            if(page===1&&pageTotal!==1){
                res.status(200).json({
                    error: false,
                    page,
                    nextPage,
                    limit,
                    totalData: result.dataTotal,
                    totalPage: pageTotal,
                    result
                })
            }else if(page===pageTotal&&pageTotal!==1){
                res.status(200).json({
                    error: false,
                    page,
                    prevPage,
                    limit,
                    totalData: result.dataTotal,
                    totalPage: pageTotal,
                    result
                })
            }else if(pageTotal===1){
                res.status(200).json({
                    error: false,
                    page,
                    limit,
                    totalData: result.dataTotal,
                    totalPage: pageTotal,
                    result
                })
            }else{
                // return miscHelper.response(res, 200, false, 'Success', result)
                res.status(200).json({
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
    },
    addEngineer : (req, res)=>{
        upload(req, res, (err)=>{
            if(req.fileValidationError){
                res.status(400).json({
                    error : true,
                    message: 'Only image files are allowed!'
                })
            }else if(err){
                res.status(400).json({
                    message: err
                })
            }else{
                const {name, description, skill, location, date_of_birth, phone, email, expected_salary, showcase} = req.body
                const id = uuidv4()
                // const showcase = req.file ? req.file.path : req.file
                const photo = req.file ? process.env.BASE_URL+req.file.path : req.file
                const {date_created, date_updated} = new Date()
                const data = {id,name, description, skill, location, date_of_birth, showcase, date_created, date_updated, phone, email, expected_salary, photo}

                model.addEngineer(data)
                .then(result=>{
                    res.status(200).json({
                        error: false,
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
    },
    editEngineer : (req, res)=>{
        upload(req, res, (err)=>{
            if(err){
                res.status(400).json({
                    message: err
                })
            }else{
                const {name, description, skill, location, date_of_birth, phone, expected_salary, email, showcase} = req.body
                const photo = req.file ? req.file.path : req.file
                const date_updated = new Date()
                const id = req.params.id
                const data = {name, photo, description, skill, location, date_of_birth, showcase, date_updated, phone, expected_salary, email}

                model.editEngineer(data, id)
                .then(result=>{
                    res.status(200).json({
                        error: false,
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
    },
    deleteEngineer : (req, res)=>{
        const id = req.params.id

        model.deleteEngineer(id)
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
}