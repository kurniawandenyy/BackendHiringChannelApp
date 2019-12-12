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
    }
}