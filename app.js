require('dotenv/config')
//import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const routeNav = require('./src/index')
const logger = require('morgan')
const cors = require('cors')

const port = process.env.PORT || 3001


//use dependencies
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(logger('dev'))  
app.use(cors())
// app.use((req, res, next)=>{
//     res.header("Access-Control-Allow-Origin","*")
//     res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
//     next()
// })

app.use(express.static('./public'))
app.use('/api/v1', routeNav)

app.listen(port, function(){
    console.log(`Server is running on port ${port}!`)
})

module.exports=app