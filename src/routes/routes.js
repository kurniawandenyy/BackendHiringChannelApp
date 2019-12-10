'use strict'
const express = require('express')
const Route = express.Router()

const engineer = require('../controllers/engineerController')
const company = require('../controllers/companyController')
const auth = require('../controllers/authController')

Route
    //Engineer routes
    .get('/api/v1/engineer', engineer.getEngineers)
    .post('/api/v1/engineer', engineer.addEngineer)
    .put('/api/v1/engineer/:id', engineer.editEngineer)
    .delete('/api/v1/engineer/:id', engineer.deleteEngineer)
    .get('/api/v1/engineer/search', engineer.searchEngineers)
    // .get('/api/v1/engineer/:sort', engineer.sortEngineers)

    //company routes
    .get('/api/v1/company', company.getCompanies)
    .post('/api/v1/company', company.addCompany)
    .put('/api/v1/company/:id', company.editCompany)
    .delete('/api/v1/company/:id', company.deleteCompany)

    //auth
    .post('/api/v1/register', auth.register)

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