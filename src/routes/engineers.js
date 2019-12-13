'use strict'
const express = require('express')
const Route = express.Router()

const authCheck = require('../helpers/authCheck')
const engineer = require('../controllers/engineerController')

Route
    //Engineer routes
    .get('/', engineer.getEngineers)
    .post('/', authCheck.engineerCheck, engineer.addEngineer)
    .put('/:id', authCheck.engineerCheck, engineer.editEngineer)
    .delete('/:id', authCheck.engineerCheck, engineer.deleteEngineer)

module.exports=Route

// module.exports = (app)=>{
//     //route engineer
//     app.route('/api/v1/engineer').get (engineer.show)
//     app.route('/api/v1/engineer').post (engineer.insert)
//     app.route('/api/v1/engineer/(:id)').put (engineer.edit)
//     app.route('/api/v1/engineer/(:id)').delete (engineer.delete)
//     app.route('/api/v1/engineer/search').get (engineer.search)
//     app.route('/api/v1/engineer/:sort').get (engineer.sort)

//     //route company
//     app.route('/api/v1/company').get (company.show)
//     app.route('/api/v1/company').post (company.insert)
//     app.route('/api/v1/company/(:id)').put (company.edit)
//     app.route('/api/v1/company/(:id)').delete (company.delete)
// }