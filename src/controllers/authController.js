'use strict'
const uuidv4 = require('uuid/v4')
const model = require('../models/auth')
const bcrypt = require('bcryptjs')

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
    }
}