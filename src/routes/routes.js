'use strict'
const express = require('express')
const Route = express.Router()

const engineer = require('../controllers/engineerController')
const company = require('../controllers/companyController')
const auth = require('../controllers/authController')
const authCheck = require('../helpers/authCheck')

Route
    //Engineer routes
    .get('/engineer', authCheck.engineerCheck, engineer.getEngineers)
    .post('/engineer', authCheck.engineerCheck, engineer.addEngineer)
    .put('/engineer/:id', authCheck.engineerCheck, engineer.editEngineer)
    .delete('/engineer/:id', authCheck.engineerCheck, engineer.deleteEngineer)
    .get('/engineer/search', engineer.searchEngineers)
    // .get('/api/v1/engineer/:sort', engineer.sortEngineers)

    //company routes
    .get('/company', authCheck.companyCheck, company.getCompanies)
    .post('/company', authCheck.companyCheck, company.addCompany)
    .put('/company/:id', authCheck.companyCheck, company.editCompany)
    .delete('/company/:id', authCheck.companyCheck, company.deleteCompany)

    //auth
    .post('/register', auth.register)
    .post('/login', auth.login)

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