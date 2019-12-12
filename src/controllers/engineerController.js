'use strict'

const uuidv4 = require('uuid/v4')
const model = require('../models/engineer')
const multer = require('multer')
const path = require('path')
const helpers = require('../helpers/helpers')

const storage = multer.diskStorage({
    destination: './public/uploads/showcase',
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
}).single('showcase')

module.exports = {
    getEngineers:(req, res)=>{
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const offset = page*limit-limit
        const sort = req.query.sort ? req.query.sort : 'name'

        // if(!sort){
            model.getEngineers(limit, offset, page, sort)
            .then(result=>{
                res.status(200).json({
                    error: false,
                    Result: result
                })
            })
            .catch(err=>{
                res.status(400).json({
                    error:true,
                    message: err
                })
            })
        // }else{
        //     model.sortEngineers(sort)
        //     .then(result=>{
        //         res.status(200).json({
        //             error:false,
        //             data: result
        //         })
        //     })
        //     .catch(err=>{
        //         res.status(400).json({
        //             error:true,
        //             message:err
        //         })
        //     })
        // }
    },
    // sortEngineers: (req, res)=>{
    //     const sort=req.params.sort
        
    // },
    addEngineer : (req, res)=>{
        upload(req, res, (err)=>{
            if(err){
                res.status(400).json({
                    message: err
                })
            }else{
                const {name, description, skill, location, date_of_birth,no_hp,email} = req.body
                const id = uuidv4()
                const showcase = req.file.filename
                const {date_created, date_updated} = new Date()
                const data = {id,name, description, skill, location, date_of_birth, showcase, date_created, date_updated, no_hp, email}

                model.addEngineer(data)
                .then(result=>{
                    res.status(200).json({
                        error: false,
                        message: result
                    })
                })
                .catch(err=>{
                    res,status(400).json({
                        error:true,
                        message:err
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
                const {name, description, skill, location, date_of_birth, no_hp, email} = req.body
                const showcase = req.file.filename
                const date_updated = new Date()
                const id = req.params.id
                const data = {name, description, skill, location, date_of_birth, showcase, date_updated, no_hp, email}

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
    },
    searchEngineers : (req, res)=>{
        const name = req.query.name ? req.query.name : ''
        const skill = req.query.skill ? req.query.skill: ''

        model.searchEngineer(name, skill)
        .then(result=>{
            res.status(200).json({
                error:false,
                data: result
            })
        })
        .catch(err=>{
            res.status(400).json({
                error:true,
                message:err
            })
        })
    }
}