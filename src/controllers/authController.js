'use strict'
const uuidv4 = require('uuid/v4')
const model = require('../models/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    register : (req, res)=>{
        const id = uuidv4()
        const {username, role} = req.body
        const password = bcrypt.hashSync(req.body.password, 8)
        const data = {id, username, password, role}

        model.register(data)
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
    login : (req, res)=>{
        const {username, role} = req.body
        const password = bcrypt.hashSync(req.body.password)
        // const data = {username, password, role}
        
        model.getPassword(username)
        .then(result=>{
            let validPassword = bcrypt.compareSync(req.body.password, result)
            if(!validPassword){
                res.json({
                    message:'gagal'
                })
            }else{
                res.json({
                    message:'sukses'
                })
                // jwt.sign({user}, 'secretKey', {expiresIn: '30s'}, (err, token)=>{
                //     res.json({
                //         token
                //     })
                // })
            }
        })
        .catch(err=>{
            res.status(400).json({
                message:err
            })
        })
        
    }
}