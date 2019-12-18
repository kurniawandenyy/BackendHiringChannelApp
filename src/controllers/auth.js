'use strict'
require('dotenv/config')
const uuidv4 = require('uuid/v4')
const model = require('../models/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    register : (req, res)=>{
        const id = uuidv4()
        const {name, email, role} = req.body
        const {date_updated, date_created} = Date.now()
        const password = bcrypt.hashSync(req.body.password, 8)
        const data = {id, email, password, role}
        const dataEngineer = {id, name, email, date_created, date_updated}
        const dataCompany = {id, name, email}
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(regex.test(email)){
            model.register(data, dataEngineer, dataCompany)
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
        }else{
            res.json({
                error: true,
                message: 'Invalid Email!'
            })
        }
        
    },
    login : (req, res)=>{
        const email = req.body.email
        const password = req.body.password?req.body.password:''
        if(!email){
            res.json({
                message : 'Email required'
            })
        }else{
            model.getUser(email)
            .then(result=>{
                let validPassword = bcrypt.compareSync(password, result[0].password)
                if(!validPassword){
                    res.json({
                        message:'Invalid Password, Login Failed!!!'
                    })
                }else{
                    jwt.sign({result}, process.env.SECRET_KEY, {expiresIn: '1d'}, (err, token)=>{
                        res.json({
                            message:'Login Success!',
                            data: result[0],
                            token
                        })
                    })
                }
            })
            .catch(err=>{
                res.json({err})
            })
        }    
    }
}