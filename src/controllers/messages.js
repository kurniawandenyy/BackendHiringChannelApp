'use restrict'

const uuidv4 = require('uuid/v4')
const model = require('../models/messages')

module.exports = {
    getMessagesInbox : (req, res)=>{
        const email = req.headers.email
        model.getMessagesInbox(email)
        .then(result=>{
            res.status(200).json({
                error: false,
                data: result
            })
        })
        .catch(err=>{
            res.status(400).json({
                error: true,
                message: err
            })
        })
    },
    getMessagesSent : (req, res)=>{
        const email = req.headers.email
        model.getMessagesSent(email)
        .then(result=>{
            res.status(200).json({
                error: false,
                data: result
            })
        })
        .catch(err=>{
            res.status(400).json({
                error: true,
                message: err
            })
        })
    },
    sendMessage : (req, res)=>{
        const id = uuidv4()
        const sender_email = req.headers.email
        const {dest_email, message} = req.body
        const data = {id, sender_email, dest_email, message}

        model.sendMessage(data)
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