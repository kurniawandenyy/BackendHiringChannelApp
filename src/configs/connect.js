const mysql = require('mysql')
require('dotenv/config')

const connect = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

connect.connect( err => {
    if(err){
        console.log(`Connection Error : \n ${err}`)
    }else{
        console.log('Connection Success')
    }
})

module.exports=connect