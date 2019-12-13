'use strict'
const express = require('express')
const Route = express.Router()

const authCheck = require('../helpers/authCheck')
const message = require('../controllers/messageController')

Route
    //messages
    .post('/', authCheck.check, message.sendMessage)

module.exports=Route