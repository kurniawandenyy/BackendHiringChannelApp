'use restrict'

const uuidv4 = require('uuid/v4')
const model = require('../models/messages')

module.exports = {
    sendMessage : (req, res)=>{
        const id = uuidv4()
        const sender_email = req.headers.email
        const {dest_email, message} = req.body
        const data = {id, sender_email, dest_email, message}
        console.log(sender_email)
        model.sendMessage(data)
        .then(result=>{
            res.status(200).json({
                message: result
            })
        })
        .catch(err=>{
            res.status(400).json({
                err
            })
        })
    }
}