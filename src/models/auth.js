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
    getPassword : (username)=>{
        return new Promise((resolve, reject)=>{
            conn.query('SELECT password FROM users where username = ?', username, (err, result)=>{
                let data = result[0].password
                if(!err){
                    resolve(data)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    getUser : (username)=>{
        return new Promise((resolve, reject)=>{
            conn.query('SELECT * From users where username = ?', username, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    }
}