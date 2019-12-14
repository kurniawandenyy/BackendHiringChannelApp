'use strict'
const express = require('express')
const Route = express.Router()

const authCheck = require('../helpers/authCheck')
const message = require('../controllers/messages')

Route
    //messages
    .get('/inbox', authCheck.check, message.getMessagesInbox)
    .get('/sent', authCheck.check, message.getMessagesSent)
    .post('/', authCheck.check, message.sendMessage)

module.exports=Route