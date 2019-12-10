'use strict'

const uuidv4 = require('uuid/v4')
const model = require('../models/engineer')

module.exports = {
    getEngineers:(req, res)=>{
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const offset = page*limit-limit
        const sort = req.query.sort

        if(!sort){
            model.getEngineers(limit, offset, page)
            .then(result=>{
            res.status(200).json({
                error: false,
                data: result
            })
            })
            .catch(err=>{
                res.status(400).json({
                    error:true,
                    message: err
                })
            })
        }else{
            model.sortEngineers(sort)
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
    },
    // sortEngineers: (req, res)=>{
    //     const sort=req.params.sort
        
    // },
    addEngineer : (req, res)=>{
        const {name, description, skill, location, date_of_birth, showcase} = req.body
        const id = uuidv4()
        const {date_created, date_updated} = new Date()
        const data = {id,name, description, skill, location, date_of_birth, showcase, date_created, date_updated}

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
    },
    editEngineer : (req, res)=>{
        const {name, description, skill, location, date_of_birth, showcase} = req.body
        const date_updated = new Date()
        const id = req.params.id
        const data = {name, description, skill, location, date_of_birth, showcase, date_updated}

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