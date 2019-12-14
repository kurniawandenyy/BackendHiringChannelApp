const conn = require('../configs/connect')

module.exports = {
    sendMessage : (data)=>{
        return new Promise((resolve, reject)=>{
            conn.query('INSERT INTO messages set ?', data, (err)=>{
                if(!err){
                    let mess = 'Message sent'
                    resolve(mess)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    getMessagesInbox : (email)=>{
        return new Promise((resolve, reject)=>{
            conn.query(`SELECT sender_email, message From messages where dest_email = '${email}'`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    getMessagesSent : (email)=>{
        return new Promise((resolve, reject)=>{
            conn.query(`SELECT dest_email, message From messages where sender_email = '${email}'`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    }
}