'use strict'
const express = require('express')
const Route = express.Router()

const auth = require('../controllers/authController')

Route
//auth
    .post('/register', auth.register)
    .post('/login', auth.login)

module.exports=Route