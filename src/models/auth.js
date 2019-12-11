const conn = require('../configs/connect')

module.exports = {
    register : (data)=>{
        return new Promise((resolve, reject)=>{
            conn.query('INSERT INTO users set ?', data, (err)=>{
                if(!err){
                    let message = 'Register success'
                    resolve(message)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    getUser : (email)=>{
        return new Promise((resolve, reject)=>{
            conn.query('SELECT * From users where email = ?', email, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    }
}